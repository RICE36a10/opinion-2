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
const userPersistConfig = {
  key: "user",
  storage,
};

const feedbackPersistConfig = {
  key: "feedback",
  storage,
};
const persistedUser = persistReducer(userPersistConfig, userReducer);
const persistedFeedback = persistReducer(
  feedbackPersistConfig,
  feedbackReducer
);
export const store = configureStore({
  reducer: {
    User: persistedUser,
    Filter: filterReducer,
    Feedback: persistedFeedback,
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
