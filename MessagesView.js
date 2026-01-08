import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const MessagesView = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Not supported on iOS');
      return;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission denied');
      return;
    }

    SmsAndroid.list(
      JSON.stringify({ box: 'inbox', maxCount: 20 }),
      (fail) => {
        Alert.alert('Failed to load messages', fail);
      },
      (count, smsList) => {
        const arr = JSON.parse(smsList);
        setMessages(arr);
      }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.number}>{item.address}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.date}>Date: {new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Load Messages" onPress={loadMessages} />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.item}
      />
    </View>
  );
};

export default MessagesView;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    color: 'black',
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black', 
  },
  date: {
    color: 'black', 
  },
  body: {
    color: 'black', 
  },
});
