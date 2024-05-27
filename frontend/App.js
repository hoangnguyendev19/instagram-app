import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './screens/SignupScreen';
import ChangePassScreen from './screens/ChangePassScreen';
import StoryScreen from './screens/StoryScreen';
import { PaperProvider } from 'react-native-paper';
import EditProfileScreen from './screens/EditProfileScreen';
import FollowScreen from './screens/FollowScreen';
import PostScreen from './screens/PostScreen';
import { Provider } from 'react-redux';
import store from './store/store';
import ResetPassScreen from './screens/ResetPassScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePassScreen} />
            <Stack.Screen name="Story" component={StoryScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Follow" component={FollowScreen} />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
