import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { store } from './src/redux/store.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CallLogs from './CallLog';
import ContactList from './ContactList';
import MessagesView from './MessagesView';

    

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>  
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <Tab.Screen
          name="Calls"
          component={CallLogs}
        />
        <Tab.Screen
          name="Contacts"
          component={ContactList}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesView}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
