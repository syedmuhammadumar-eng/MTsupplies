import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
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
import mtSupplies, { State } from "./redux/mtSupplies";
import credentialReducer, { CredentialState } from "./redux/credentialReducer";


// Combine reducers with explicit typing for partial state
const rootReducer = combineReducers({
  mtSupplies: mtSupplies as Reducer<State, AnyAction>,
  credentialReducer: credentialReducer as Reducer<CredentialState, AnyAction>,
});

// Define the persist configuration
const persistConfig: PersistConfig<RootState> = {
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