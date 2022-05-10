import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// type User = {
//     userId: string;
//     email: string;
//     password: string;
//     username: string;
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
//     accessToken?: string;
//     refreshToken: string;
//     validatedAccount: Boolean;
//     userRoles: { User: number; Editor?: number; Admin?: number };
// };

// type userState = {
//     userData: User | null;
//     pending: Boolean | null;
//     authenticated: Boolean;
//     status: string;
//     message?: string | null;
//     error?: boolean;
// };

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

// interface ActionType {
//     payload: object;
// }
// interface ActionTypePayload extends ActionType {
//     message: string;
//     user: User;
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
// }

const initialState: any = {
    pending: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    error: false,
};

export const accessAdminZone = createAsyncThunk(
    '/admin/accessAdminZone',
    async (data: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data}`,
                },
                credentials: 'include',
                method: 'GET',
            });
            const res: any = await response.json();

            if (!response?.ok) {
                const error =
                    (res && res.message && res.message) || response.statusText;
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

export const adminSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get Admin Dashboard
        builder.addCase(accessAdminZone.pending, (state) => {
            state.pending = true;
            state.status = 'loading';
            state.error = false;
        });
        builder.addCase(
            accessAdminZone.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.pending = false;
                state.status = 'succeeded';
                state.message = action.payload.message;
            }
        );
        builder.addCase(accessAdminZone.rejected, (state, action) => {
            state.pending = null;
            state.status = 'failed';
            state.error = true;
            state.message = action.error.message;
        });
    },
});

export const adminDataFromSlice = (state: RootState) => state.admin;

export default adminSlice.reducer;
