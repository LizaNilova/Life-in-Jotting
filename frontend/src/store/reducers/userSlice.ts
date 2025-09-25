import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import $api from "../../utils/api.ts"
import { userState } from '../../types/types.ts'

const initialState: userState = {
    user: null,
    isLoading: false,
    status: null
}

export const userProfile = createAsyncThunk('user/profile', async () => {
    try {
        const { data } = await $api.get(`/users/profile`)
        return data
    } catch (error: any) {
        console.log(error)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserData(state: userState) {
            state.user = null
            state.isLoading = false
            state.status = "User was loged out"
        }
    },
    extraReducers: (builder) => {
        //User Profile 
        builder.addCase(userProfile.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.status = action.payload.message
        })
        builder.addCase(userProfile.rejected, (state, action: any) => {
            state.isLoading = false
            state.status = action.payload.message
        })
    }
})

export default userSlice.reducer
export const { resetUserData } = userSlice.actions