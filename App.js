import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screen/MainScreen';
import Login from './src/screen/Login';
import { Provider as LoginProvider } from './src/context/LoginContext';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
    );
}
export default function App() {
    return (
        <LoginProvider>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </LoginProvider>
    );
}