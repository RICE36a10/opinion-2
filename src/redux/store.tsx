import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import filterReducer from "./slices/filterSlice";
import feedbackReducer from "./slices/feedbackSlice";
import modalReducer from "./slices/modalSlice";
import commentReducer from "./slices/commentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
const persistConfig = {
  key: "root",
  storage,
};
const persistedUser = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    User: persistedUser,
    Filter: filterReducer,
    Feedback: feedbackReducer,
    Modal: modalReducer,
    Comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
