import { SET_CONTACTS, SET_CALL_LOGS } from '../actions/index';

const initialState = {
  contacts: [],
  callLogs: [{type: "No call logs yet"}],
  messages: [],
};



function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    case SET_CALL_LOGS:
      return { ...state, callLogs: action.payload };
    default:
      return state;
  }
}

export default userReducer;
