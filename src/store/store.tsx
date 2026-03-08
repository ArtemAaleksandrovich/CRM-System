import {configureStore, createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        setAuth(state, action) {
            state.isAuthenticated = action.payload;
        }
    },
})


const store = configureStore({
    reducer: { auth: authSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const authActions = authSlice.actions;
export default store;