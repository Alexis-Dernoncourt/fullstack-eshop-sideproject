import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import baseUrl from '../utils/axiosConfig';

type User = {
    userId: string;
    email: string;
    password: string;
    username: string;
    adress?: {
        firstName: string;
        lastName: string;
        postalCode: string;
        street: string;
        adressComplement: string;
        streetNumber: string;
        appartment: false;
        etage: false | string;
    };
    accessToken?: string;
    refreshToken: string;
    validatedAccount: Boolean;
    userRoles: { User: number; Editor?: number; Admin?: number };
};

type userState = {
    userData: User | null;
    pending: Boolean | null;
    authenticated: Boolean;
    status: string;
    message?: string | null;
    error?: boolean;
};

// type ResponseType = {
//     message?: string;
//     user?: User;
//     txt?: string;
//     accessToken?: string;
//     userId?: string;
//     email?: string;
//     adress?: {
//         firstName: string;
//         lastName: string;
//         postalCode: string;
//         street: string;
//         adressComplement: string;
//         streetNumber: string;
//         appartment: false;
//         etage: false | string;
//     };
// };

interface ActionType {
    payload: object;
}
interface ActionTypePayload extends ActionType {
    message: string;
    user: User;
    adress?: {
        firstName: string;
        lastName: string;
        postalCode: string;
        street: string;
        adressComplement: string;
        streetNumber: string;
        appartment: false;
        etage: false | string;
    };
}

const initialState: userState = {
    userData: null,
    pending: null,
    authenticated: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    error: false,
};

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (data: { email: string; password: string }) => {
        try {
            const response = await baseUrl.post(
                `/auth/signup`,
                { data },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response && response.data) return response.data;
        } catch (err: any) {
            console.log(err);
            console.error(err.message);
            return Promise.reject(err.response.data.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (data: { email: string; password: string }) => {
        try {
            const response = await baseUrl(`/auth/login`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                method: 'POST',
                data,
            });
            if (response && response.data) return response.data;
        } catch (err: any) {
            console.log(err);
            console.error(err.message);
            return Promise.reject(err.response.data.message);
        }
    }
);

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    try {
        const response = await baseUrl(`/auth/logout`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            method: 'POST',
        });
        if (response && response.data) return response.data;
    } catch (err: any) {
        console.log(err);
        console.error(err.message);
        return Promise.reject(err.response.data.message || 'Erreur...');
    }
});

export const updateAdress = createAsyncThunk(
    '/user/updateAdress',
    async (data: {
        firstName: string;
        lastName: string;
        postalCode: string;
        city: string;
        streetNumber: string;
        street: string;
        adressComplement: string;
        appartment: boolean;
        etage: number;
        token: string;
    }) => {
        try {
            const { token, ...formData } = data;

            const response = await baseUrl(`/auth/update-adress`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
                method: 'POST',
                data: formData,
            });
            if (response && response.data) return response.data;
        } catch (err: any) {
            console.log(err);
            console.error(err.message);
            return Promise.reject(err.response.data.message);
        }
    }
);

export const updatePassword = createAsyncThunk(
    '/user/updatePassword',
    async (data: {
        password: string;
        passwordUpdate: string;
        userId: string;
        token: string;
    }) => {
        try {
            const formData = {
                password: data.password,
                passwordUpdate: data.passwordUpdate,
            };
            const response = await baseUrl(
                `/auth/modify-password/${data.userId}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.token}`,
                    },
                    withCredentials: true,
                    method: 'POST',
                    data: formData,
                }
            );
            if (response && response.data) return response.data;
        } catch (err: any) {
            console.log(err);
            console.error(err.message);
            return Promise.reject(err.response.data.message);
        }
    }
);

export const confirmUserEmail = createAsyncThunk(
    '/user/confirm-email',
    async (data: { userId: string; username: string }) => {
        try {
            const response = await baseUrl(
                `/auth/confirm-email/${data.userId}/${data.username}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    method: 'GET',
                }
            );
            if (response && response.data) return response.data;
        } catch (err: any) {
            console.log(err);
            console.error(err.message);
            return Promise.reject(err.response.data.message);
        }
    }
);

export const getRefreshToken = createAsyncThunk('/auth/refresh', async () => {
    try {
        const response = await baseUrl(`/auth/refresh`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            method: 'GET',
        });
        if (response && response.data) return response.data;
    } catch (err: any) {
        console.log(err);
        console.error(err.message);
        return Promise.reject(err.response.data.message);
    }
});

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // REGISTER
        builder.addCase(registerUser.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            registerUser.fulfilled,
            (state, action: PayloadAction<{ message: string }>) => {
                state.pending = false;
                state.status = 'succeeded';
                state.message = action.payload.message;
                state.authenticated = false;
            }
        );
        builder.addCase(registerUser.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });

        // LOGIN
        builder.addCase(loginUser.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            loginUser.fulfilled,
            (state, action: PayloadAction<ActionTypePayload>) => {
                state.pending = false;
                state.status = 'succeeded';
                state.message = action.payload.message;
                state.userData = action.payload.user;
                state.authenticated = true;
            }
        );
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log(action);
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });

        // LOGOUT
        builder.addCase(logoutUser.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            logoutUser.fulfilled,
            (state, action: PayloadAction<ActionTypePayload>) => {
                state.pending = false;
                state.status = 'succeeded';
                state.message =
                    action.payload?.message || 'Vous vous êtes déconnecté.';
                state.userData = initialState.userData;
                state.authenticated = false;
            }
        );
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });

        // CONFIRM EMAIL
        builder.addCase(confirmUserEmail.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            confirmUserEmail.fulfilled,
            (state, action: PayloadAction<ActionTypePayload>) => {
                state.pending = false;
                state.status = 'succeeded';
                state.message = action.payload.message;
                const validatedAccount = {
                    ...state.userData!,
                    validatedAccount: true,
                };
                state.userData = validatedAccount;
                state.authenticated = true;
            }
        );
        builder.addCase(confirmUserEmail.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });

        // Update Password
        builder.addCase(updatePassword.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            updatePassword.fulfilled,
            (state, action: PayloadAction<ActionTypePayload>) => {
                state.pending = false;
                state.status = 'succeeded';
                console.log(action.payload);

                state.message = action.payload.message;
            }
        );
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });

        // Update Adress
        builder.addCase(updateAdress.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            updateAdress.fulfilled,
            (state, action: PayloadAction<ActionTypePayload>) => {
                state.userData!.adress = action.payload.adress;
                state.pending = false;
                state.status = 'succeeded';
                state.message = action.payload.message;
            }
        );
        builder.addCase(updateAdress.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });

        // Get Refresh Token
        builder.addCase(getRefreshToken.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            getRefreshToken.fulfilled,
            (state: userState, action: PayloadAction<any>) => {
                state.pending = false;
                state.userData = {
                    ...state.userData!,
                    accessToken: action.payload.accessToken,
                };
                state.status = 'succeeded';
            }
        );
        builder.addCase(getRefreshToken.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });
    },
});

export const selectUser = (state: RootState) => state.user.userData;
export const getUserMessage = (state: RootState) => state.user.message;

export default userSlice.reducer;
