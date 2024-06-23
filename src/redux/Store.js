import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice.js";
import eventReducer from "./slice/eventsSlice.js";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
const reducer = combineReducers({
   // reducers
   user: userReducer,
   events: eventReducer,
});

const persisteConfig = {
   key: "root",
   storage,
   version: 1,
};

const persistedReducer = persistReducer(persisteConfig, reducer);

export const store = configureStore({
   reducer: persistedReducer,

   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
         serializableCheck: false,
      });
   },
});

export const persistor = persistStore(store);
