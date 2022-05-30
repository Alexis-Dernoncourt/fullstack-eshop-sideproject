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

import { apiSlice } from './api/apiSlice';
import authReducer from './auth/authSlice';

// export const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true,
// });

const persistConfig = {
    key: 'authAppCart',
    version: 1,
    storage: storage,
    blacklist: [apiSlice.reducerPath, 'auth'],
};

const reducers = combineReducers({
    shoppingAppCart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
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
