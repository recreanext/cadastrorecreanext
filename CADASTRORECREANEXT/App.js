import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import GuestFormScreen from './src/screens/GuestFormScreen';
import ChildFormScreen from './src/screens/ChildFormScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminPanelScreen from './src/screens/AdminPanelScreen';
import ProgramManagementScreen from './src/screens/ProgramManagementScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GuestForm" component={GuestFormScreen} />
        <Stack.Screen name="ChildForm" component={ChildFormScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
        <Stack.Screen name="ProgramManagement" component={ProgramManagementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
