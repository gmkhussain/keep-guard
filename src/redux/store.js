import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import userReducer from './reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['contacts'],
  blacklist: [],
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
