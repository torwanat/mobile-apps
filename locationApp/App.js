import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar } from 'react-native';
import Main from './components/Main';
import List from './components/List';
import MapComponent from './components/MapComponent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="s1" component={Main} options={{
          title: "Welcome to GeoApp",
          headerShown: false
        }} />
        <Stack.Screen name="s2" component={List} options={{
          title: "Save position",
          headerStyle: {
            backgroundColor: '#00796B',
          },
          headerTintColor: '#212121',
        }} />
        <Stack.Screen name="s3" component={MapComponent} options={{
          title: "Locations on map",
          headerStyle: {
            backgroundColor: '#B2DFDB',
          },
          headerTintColor: '#212121',
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
