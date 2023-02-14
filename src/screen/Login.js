import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import NetInfo from '../components/NetInfo';
import { Context } from "../context/LoginContext";
import Spacer from '../components/Spacer';
import RNFetchBlob from 'rn-fetch-blob';
import { useNetInfo } from "@react-native-community/netinfo";

let documentDir = RNFetchBlob.fs.dirs.DocumentDir;

const Login = ({ navigation }) => {
  
  const netInfo = useNetInfo();
  const [email, setName] = useState('');
  const [items, setItems] = useState([]);
  const { state: { records, apierrorMessage, loading }, signin, setOfflineData, getOfflineData } = useContext(Context);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
 
  const navigateToMain = () => {
    navigation.navigate('Main')
  }

/**
 * This function downloads the data for offline usage
 * @param {*} data 
 */
  const downloadData = (data) => {
    data.map((item) => {
      const { url, type } = item;
      const urlArray = url.split('/');
      const fileName = urlArray[urlArray.length - 1];
      let downloadToPath = `${documentDir}/download/${fileName}`;
      RNFetchBlob
        .config({ fileCache: true, path: downloadToPath })
        .fetch('GET', url, {})
        .then((res) => {
          const newItem = { type, path: res.data };
          setItems(previous => [...previous, newItem]);
        })
        .catch(error => console.log('Error', error.message));
    });
    navigateToMain()
  }

/**
 * This Code is to setOfflineData is local storage
 */
  useEffect(() => {
    items.length && setOfflineData(items);
  }, [items]);

  /**
   * This event check is password is right then if we have internet connection
   * if no records then make an API call and then navigate to Main page
   * if no internet then fetch offline data from async storage
   */

  const onSubmit = () => {
    if (password == '00000') {
      if (netInfo?.isConnected) {
        if (records != null && Object.keys(records).length != 0) navigateToMain()
        else {
          signin(downloadData);
        }
        if (records!= null && Object.keys(records).length == 0 && apierrorMessage) setErrorMessage('Something went wrong');
      }
      else {
        getOfflineData(navigateToMain)
      }
    }
    else setErrorMessage('Incorrect Password !')
  };


  return (
    <SafeAreaView style={styles.container}>
      <NetInfo />
      <Spacer>
        <Text h3 h3Style={styles.textStyle}>Login Form</Text>
      </Spacer>
      <Spacer />
      <Input
        label="Name"
        value={email}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title='Login'
          onPress={() => onSubmit()}
        />
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 200,
    justifyContent: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  buttonStyle: {
    heigth: 50
  }
});

export default Login;