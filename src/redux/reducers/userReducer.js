import { SET_CONTACTS } from '../actions/index';

const initialState = {
  contacts: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    // ... all your existing cases
    default:
      return state;
  }
}

export default userReducer;
