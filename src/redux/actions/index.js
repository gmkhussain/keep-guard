import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Contacts from 'react-native-contacts';

export const SET_CONTACTS = 'SET_CONTACTS';

// redux-thunk style: returns a function that receives dispatch
export const fetchContacts = () => async (dispatch) => {
  try {
    // Android permissions
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied');
        return;
      }
    }

    // Fetch contacts
    const allContacts = await Contacts.getAll();

    // Dispatch to store
    dispatch({
      type: SET_CONTACTS,
      payload: allContacts,
    });
  } catch (e) {
    Alert.alert('Error', e.message);
  }
};
