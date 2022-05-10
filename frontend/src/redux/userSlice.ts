import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

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

type ResponseType = {
    message?: string;
    user?: User;
    txt?: string;
    accessToken?: string;
    userId?: string;
    email?: string;
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
};

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
            const response = await fetch(
                `http://localhost:3000/api/auth/signup`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                }
            );
            const res = (await response.json()) as ResponseType;
            if (!response?.ok) {
                const error = (res && res.message) || response.status;
                return Promise.reject(error);
            } else {
                return res;
            }
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (data: { email: string; password: string }) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/auth/login`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(data),
                }
            );
            const res = (await response.json()) as ResponseType;

            if (!response?.ok) {
                const error =
                    res.message || 'Il y a eu une erreur, veuillez réessayer.';
                console.log(res);
                return Promise.reject(error);
            } else {
                return res;
            }
        } catch (err: any) {
            console.log(err);
            return err;
        }
    }
);

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/logout`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
        });
        const res = (await response.json()) as ResponseType;
        if (!response?.ok) {
            const error = (res && res.message) || response.status;
            return Promise.reject(error);
        } else {
            return res;
        }
    } catch (error: any) {
        console.log(error);
        return error;
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

            const response = await fetch(
                `http://localhost:3000/api/auth/update-adress`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(formData),
                }
            );
            const res = (await response.json()) as ResponseType;

            if (!response?.ok) {
                const error = (res && res.message) || response.status;
                return Promise.reject(error);
            } else {
                return res;
            }
        } catch (error: any) {
            console.log(error);
            return error;
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
            const response = await fetch(
                `http://localhost:3000/api/auth/modify-password/${data.userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.token}`,
                    },
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(formData),
                }
            );
            const res = (await response.json()) as ResponseType;
            if (!response?.ok) {
                const error = (res && res.message) || response.status;
                return Promise.reject(error);
            } else {
                return res;
            }
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }
);

export const confirmUserEmail = createAsyncThunk(
    '/user/confirm-email',
    async (data: { userId: string; username: string }) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/auth/confirm-email/${data.userId}/${data.username}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    method: 'GET',
                }
            );
            const res = (await response.json()) as ResponseType;
            if (!response?.ok) {
                const error = (res && res.message) || response.status;
                return Promise.reject(error);
            } else {
                return res;
            }
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }
);

export const getRefreshToken = createAsyncThunk('/auth/refresh', async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/refresh`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'GET',
        });
        const res: { accessToken?: string; message?: string } =
            await response.json();
        if (!response.ok) {
            const error = (res && res.message) || response.status;
            return Promise.reject(error);
        } else {
            return res;
        }
    } catch (error) {
        console.log('Error RefreshToken=>', error);
        return error;
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
            (state, action: PayloadAction<userState>) => {
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
                state.message = action.payload.message;
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
