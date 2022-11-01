
import {StatusBar} from 'expo-status-bar';
import React from 'react';

import 'react-native-gesture-handler';
import {StyleSheet,Text,View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Home from './screens/Home';
import Inscription from './screens/Inscription';
import Identification from './screens/Identification';
import GraphInput from "./screens/GraphInput";
import PointInput from "./screens/PointInput";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
const Stack = createStackNavigator();

const globalScreenOptions = {
    headerStyle: {backgroundColor: "#FFA500"},
    headerTitleStyle: {color: "white"},
    headerTintColor: "black",
    headerBackTitle: "white",


}

export default function App () {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Identification"  screenOptions={globalScreenOptions}>
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="Inscription" component={Inscription} />
          <Stack.Screen name="GraphInput" component={GraphInput} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PointInput" component={PointInput}/>
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
