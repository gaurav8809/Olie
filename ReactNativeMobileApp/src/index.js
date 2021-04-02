import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {AppNavigator} from './Navigation';
import AppReducer from './Redux/Reducers';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
};

const PERSIST_REDUCER = persistReducer(PERSIST_CONFIG, AppReducer);
const STORE = createStore(PERSIST_REDUCER, applyMiddleware(Thunk));
let PERSIST_STORE = persistStore(STORE);

export default class StoreConfig extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={STORE}>
          <PersistGate loading={null} persistor={PERSIST_STORE}>
            <AppNavigator />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
