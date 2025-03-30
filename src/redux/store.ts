import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import challengesReducer from "./slices/challengesSlice";
import questionsReducer from "./slices/questionsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
  questions: questionsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "challenges", "questions"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
