import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import adminReducer from './adminSlice';
import { apiSlice } from './apiSlice';

const persistConfig = {
    key: 'authApp',
    version: 1,
    storage: storage,
    blacklist: [apiSlice.reducerPath],
};

const reducers = combineReducers({
    shoppingAppCart: cartReducer,
    user: userReducer,
    admin: adminReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export let persistor = persistStore(store);
