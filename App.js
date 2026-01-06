import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text, FlatList, StyleSheet, Alert } from 'react-native';
import * as Contacts from 'react-native-contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    if (!Contacts || !Contacts.checkPermission) {
      Alert.alert('Error', 'Contacts module not available.');
      return;
    }

    try {
      const permission = await Contacts.checkPermission();
      if (permission === 'undefined') {
        const p = await Contacts.requestPermission();
        if (p !== 'authorized') return;
      } else if (permission !== 'authorized') {
        Alert.alert('Permission denied', 'Cannot access contacts.');
        return;
      }

      const contactsList = await Contacts.getAll();
      setContacts(contactsList);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to fetch contacts.');
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactCard}>
      <Text style={{ fontWeight: 'bold' }}>{item.givenName} {item.familyName}</Text>
      {item.phoneNumbers.map((p, i) => (
        <Text key={i}>{p.label}: {p.number}</Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>Keep Guard</Text>
      <Button title="Get Contacts" onPress={getContacts} />
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => item.recordID ?? index.toString()}
        renderItem={renderContact}
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  contactCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
