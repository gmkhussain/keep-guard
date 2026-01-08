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

export default function App() {
  const [contacts, setContacts] = useState([]);

  const testContacts = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied');
        return;
      }
    }

    try {
      const allContacts = await Contacts.getAll();
      setContacts(allContacts.slice(0, 10)); // first 10 contacts
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

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
      <Button title="Get Contacts" onPress={testContacts} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              // 🔑 required for scrolling
    marginTop: 60,
    padding: 16,
  },
  list: {
    marginTop: 16,
  },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
});
