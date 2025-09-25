import { forgotPasswordParams, resetPasswordParams } from './../../types/types';
import { confirmEmailParams, loginParams } from '../../types/types.ts';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { authState, registerParams } from "../../types/types.ts";
import authRouter from "../../routers/authRouter.ts";
import { resetUserData } from './userSlice.ts';

const initialState: authState = {
    isLoading: false,
    status: null,
    eventId: null
}

export const signup = createAsyncThunk('auth/sign-up', async ({ username, password, passwordConfirmation, email }: registerParams) => {
    try {
        const { data } = await axios.post(authRouter.registerPath(), {
            username,
            password,
            passwordConfirmation,
            email
        }, { withCredentials: true })
        console.log(data)
        return data
    } catch (error: any) {
        console.log("Error in sign-up function: ", error.message)
    }
})

export const signin = createAsyncThunk('auth/sign-in', async ({ username, password }: loginParams) => {
    try {

        const { data } = await axios.post(authRouter.loginPath(), {
            username,
            password
        }, { withCredentials: true })

        console.log(1)
        console.log(data.message)

        return data
    } catch (error: any) {
        console.log(error)
    }
})

export const confirmRegistration = createAsyncThunk(
    'auth/confirmRegistration',
    async ({ code, id }: confirmEmailParams) => {
        try {
            const { data } = await axios.post(authRouter.confirmUserPath(id), { code }, { withCredentials: true })
            return (data)
        } catch (error: any) {
            console.log(error.message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const { data } = await axios.get(authRouter.logoutPath(), { withCredentials: true })
            console.log(data)
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const forgotPassword = createAsyncThunk('auth/forgot-password', async ({ email }: forgotPasswordParams) => {
    const { data } = await axios.post(authRouter.forgotPasswordPath(), { email })
    console.log(data)
    return data
})

export const resetPassword = createAsyncThunk('auth/reset-password', async ({ newPass, repeatPass, token }: resetPasswordParams) => {
    if (token) {
        const { data } = await axios.post(authRouter.resetPasswordPath(token), { newPass, repeatPass }, { withCredentials: true })
        console.log(data)
        return data
    } else {
        return { message: "Token is undefind" }
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
            state.eventId = action.payload.eventId
        })
        builder.addCase(signup.rejected, (state, action: any) => {
            state.status = action.payload.message
            state.isLoading = false
            state.eventId = null
        })

        //confirm email after register
        builder.addCase(confirmRegistration.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(confirmRegistration.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        })
        builder.addCase(confirmRegistration.rejected, (state, action: any) => {
            state.isLoading = false
            state.status = action.payload.message
        })

        //sign-in
        builder.addCase(signin.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
        })
        builder.addCase(signin.rejected, (state, action: any) => {
            state.status = action.payload.message
            state.isLoading = false
        })

        //Logout
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            resetUserData()
            state.isLoading = false
            state.status = action.payload?.message
        })
        builder.addCase(logout.rejected, (state, action: any) => {
            state.status = action.payload.message
            state.isLoading = false
        })

        //forgot password
        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(forgotPassword.fulfilled, (state, action: any) => {
            state.isLoading = false
            state.status = action.payload.message
        })
        builder.addCase(forgotPassword.rejected, (state, action: any) => {
            state.isLoading = false
            state.status = action.payload.message
        })

        //reset password
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(resetPassword.fulfilled, (state, action: any) => {
            state.isLoading = false
            state.status = action.payload.message
        })
        builder.addCase(resetPassword.rejected, (state, action: any) => {
            state.isLoading = false
            state.status = action.payload.message
        })

    }
})

export default authSlice.reducer