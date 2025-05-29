import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar } from 'react-native';
import Main from './components/Main';
import Gallery from './components/Gallery';
import BigPhoto from './components/BigPhoto';
import CameraScreen from './components/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="s1" component={Main} options={{
          title: "Welcome to CameraApp",
          headerShown: false
        }} />
        <Stack.Screen name="s2" component={Gallery} options={{
          title: "Photos from gallery",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: '#D32F2F'
          }
        }} />
        <Stack.Screen name="s3" component={BigPhoto} options={{
          title: "Selected photo",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: '#D32F2F'
          }
        }} />
        <Stack.Screen name="s4" component={CameraScreen} options={{
          title: "Camera",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: '#D32F2F'
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
