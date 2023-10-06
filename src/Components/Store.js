import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

  const authpersistedReducer = persistReducer(persistConfig, authReducer)

  export const store =  configureStore({
    reducer: {
    auth: authpersistedReducer
    }
  })
export let persistor = persistStore(store)