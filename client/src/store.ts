import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist/es/types";
import mtSupplies from "./redux/mtSupplies";
import credentialReducer from "./redux/credentialReducer";

const rootReducer = combineReducers({
  mtSupplies: mtSupplies,
  credentialReducer: credentialReducer,
});

// Define the persist configuration
const persistConfig: PersistConfig<any> = {
  key: "root",
  version: 1,
  storage,
};

// Persist the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Persistor for Redux Persist
export const persistor = persistStore(store);
