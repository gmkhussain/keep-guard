import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CallLogs from './CallLog';
import ContactList from './ContactList';
import MessagesView from './MessagesView';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({});
