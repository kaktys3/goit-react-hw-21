import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import telReducer from './contacOperation.js'

// Резервний варіант: якщо імпорт повертає undefined, беремо стандартний storage
const storageEngine = storage?.default || storage || {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const telPersistConfig = {
  key: 'tell',
  storage: storageEngine,
}

const persistedTelReducer = persistReducer(telPersistConfig, telReducer)

export const store = configureStore({
  reducer: {
    tell: persistedTelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)