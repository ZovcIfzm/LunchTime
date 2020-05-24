import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

import { createStore } from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  counter : 0,
  calorie_count : 1600,
  saturated_fats: "24%",
  unsaturated_fats: "57%",
  protein: "12%",
  fiber: "8%",
  iron: "5%",
  vitamin_a: "40%",
  vitamin_b: "24%",
  vitamin_c: "27%",

}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'INCREASE_COUNTER':
      return{counter:state.counter+1}
  }
  return state
}

const store = createStore(reducer);

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      
      <Provider store = {store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
