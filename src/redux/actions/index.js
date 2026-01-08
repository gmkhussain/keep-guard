import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import CallLogs from 'react-native-call-log';

export const SET_CONTACTS = 'SET_CONTACTS';
export const SET_CALL_LOGS = 'SET_CALL_LOGS';


export const fetchContacts = () => async (dispatch) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied');
        return;
      }
    }
    const allContacts = await Contacts.getAll();
    dispatch({ type: SET_CONTACTS, payload: allContacts });
    
  } catch (e) {
    Alert.alert('Error', e.message);
  }
};




export const fetchCallLogs = () => async (dispatch) => {
  if (Platform.OS !== 'android') {
    Alert.alert('Not supported on iOS');
    return;
  }

  // Request call log permission
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    {
      title: 'Call Log Permission',
      message: 'This app needs access to your call logs.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );

  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    Alert.alert('Permission denied', 'Cannot access call logs.');
    return;
  }

  try {
    const logs = await CallLogs.loadAll();

    dispatch({
      type: SET_CALL_LOGS,
      payload: logs.slice(0, 10),
    });
  } catch (error) {
    Alert.alert('Error fetching call logs', error.message);
  }
};
