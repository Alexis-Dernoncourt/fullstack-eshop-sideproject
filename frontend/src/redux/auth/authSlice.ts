import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../../typescript/types';

interface userState {
    user: User | null;
    token: string | null;
}

const initialState: userState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action);
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
