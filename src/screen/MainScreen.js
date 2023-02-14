import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ImageScreen from '../screen/ImageScreen';
import VideoScreen from '../screen/VideoScreen';
import { Context } from "../context/LoginContext";
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const netInfo = useNetInfo();
  const { state: { records, offlineRecords } } = useContext(Context);
  const timer = useRef(null);

  /**
   * This code sets the logic for looping images in every 5 sec
   */
  useEffect(() => {
    timer.current = setInterval(() => {
      setSeconds(second => (second === 2 ? 0 : second + 1));
    }, 5000);
    return () => clearInterval(timer.current);
  }, []);

  /**
   * This resumes the loop after complete video is displayed
   */
  const videoEnd = () => {
    timer.current = setInterval(() => {
      setSeconds(second => (second === 2 ? 0 : second + 1));
    }, 5000);
  }


  onlineData = () => {
    if (records) {
      return (
        records && records[seconds] && records[seconds].type == 'image' ? <ImageScreen url={records[seconds].url} />
          :
          <VideoScreen seconds currentTimer={timer.current} url={records[seconds].url} onClick={videoEnd} />
      )
    }
  }

  offLineData = () => {
    if (offlineRecords) {
      return (
        offlineRecords && offlineRecords[seconds] && offlineRecords[seconds].type == 'image' ? <ImageScreen url={offlineRecords[seconds].path} />
          :
          <VideoScreen seconds currentTimer={timer.current} url={offlineRecords[seconds].path} onClick={videoEnd} />
      )
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {netInfo?.isConnected ? onlineData() : offLineData()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1.2, height: null, justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderColor: 'red',
    borderWidth: 1
  }
});
export default App;
