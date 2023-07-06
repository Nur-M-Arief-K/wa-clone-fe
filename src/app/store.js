import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

import userSlice from "../features/user-slice";
import chatSlice from "../features/chat-slice";

const saveUserOnlyFilter = createFilter("user", ["user"]);

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter]
};

const rootReducer = combineReducers({
    user: userSlice,
    chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: true,
});

export const persistor = persistStore(store);