import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import favoritesReducer from './configure/favouriteSlice';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};



const Store = configureStore({
  reducer: {
    favorites:favoritesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],  
      },
    }),
});



export default Store

const styles = StyleSheet.create({});
