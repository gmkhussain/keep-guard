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
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallLogs } from './src/redux/actions/index.js';



const CallLogsView = () => {
  // const [logs, setLogs] = useState([]);
  
    const dispatch = useDispatch();
    const callLogs = useSelector((state) => state.userReducer.callLogs);
      
  const loadCallLogs = () => {
    dispatch(fetchCallLogs());
  }

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
        data={callLogs}
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
