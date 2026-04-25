import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Role} from "../../../types/auth/types.ts";

interface InitialState {
    isAuthenticated: boolean;
    roles: Role[];
}

const initialState: InitialState = {
    isAuthenticated: false,
    roles: [],
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: InitialState): void => {
            state.isAuthenticated = true;
        },
        logout: (state: InitialState): void => {
            state.isAuthenticated = false;
            state.roles = [];
        },
        setAuth(state: InitialState, action: PayloadAction<boolean>): void {
            state.isAuthenticated = action.payload;
        },
        setRoles(state: InitialState, action: PayloadAction<Role[]>): void {
            state.roles = action.payload;
        }
    },
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
