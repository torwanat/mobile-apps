import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import DetailsScreen from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="s1" component={LoginScreen} options={{
          title: 'Login page',
          headerShown: false
        }} />
        <Stack.Screen name="s2" component={MainScreen} options={{
          title: 'Admin page',
          headerStyle: {
            backgroundColor: '#B2DFDB',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="s3" component={DetailsScreen} options={{
          title: 'Details page',
          headerStyle: {
            backgroundColor: '#B2DFDB',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


