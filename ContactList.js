import React, { useState } from 'react';
import {
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './src/redux/actions/index.js';

const ContactList = () => {

    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.userReducer.contacts);
      
  const loadContacts = () => {
    console.log('loadContacts');
    dispatch(fetchContacts());
  }

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.name}>
        {item.givenName} {item.familyName}
      </Text>
      {item.phoneNumbers?.[0] && (
        <Text style={styles.phone}>
          {item.phoneNumbers[0].number}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={loadContacts} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator
      />
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  list: {
    marginTop: 16,
  },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    color: 'black',
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
});
