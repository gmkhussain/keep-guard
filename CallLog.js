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
import CallLogs from 'react-native-call-log'; // <<<<< THIS IS THE FIX


const CallLogsView = () => {
  const [logs, setLogs] = useState([]);

  const loadCallLogs = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Not supported on iOS');
      return;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission denied');
      return;
    }

    try {
      const data = await CallLogs.loadAll();
      setLogs(data.slice(0, 10)); // first 10 logs
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.number}>{item.phoneNumber}</Text>
      <Text style={styles.type}>Type: {item.type}</Text>
      <Text style={styles.duration}>Duration: {item.duration}s</Text>
      <Text style={styles.date}>        
        Date: {new Date(item.timestamp * 1000).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Load Call Logs" onPress={loadCallLogs} />

      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

export default CallLogsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    color: 'black',
  },
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
  type: {
    color: 'black',
  },
  duration: {
    color: 'black',
  },
});
