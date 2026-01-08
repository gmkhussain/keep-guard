import React from 'react';
import { View, StyleSheet } from 'react-native';
import CallLogs from './CallLog';
import ContactList from './ContactList';

export default function App() {
  return (
    <View style={styles.container}>
      <CallLogs />
      <ContactList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 16,
  },
});
