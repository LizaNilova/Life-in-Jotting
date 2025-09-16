import userSlice from './reducers/userSlice';
import authSlice from './reducers/authSlice';
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import pageSlice from './reducers/pageSlice';

const rootReducer = combineReducers({
    authSlice,
    userSlice,
    pageSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']