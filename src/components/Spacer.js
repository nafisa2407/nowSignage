import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Text,Input, Button } from 'react-native-elements';
const Spacer = ({children}) => {
    return (
        <View style={styles.spacer}>
          {children}
        </View>
      );   
};

const styles = StyleSheet.create({
    spacer: {
        margin: 16
    }
});

export default Spacer;