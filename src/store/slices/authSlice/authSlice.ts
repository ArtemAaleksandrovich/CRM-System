import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
    isAuthenticated: boolean;
}

const initialState: InitialState = {
    isAuthenticated: false,
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
        },
        setAuth(state: InitialState, action: PayloadAction<boolean>): void {
            state.isAuthenticated = action.payload;
        }
    },
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
