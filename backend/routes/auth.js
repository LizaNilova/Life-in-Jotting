import { Router } from "express"
import { AuthController } from "../controllers/auth.js"

const router = new Router()
const auth = new AuthController()

//Sign up in the system
router.post('/sign-up', auth.signUp)

//Sign in in the system
router.post('/sign-in', auth.signIn)

//Refresh token
router.get('/refresh', auth.refresh)

//Email confirmation (verification of the entered activation code)
router.post('/confirm/:eventId', auth.confirmEmail)

//Sign Out
router.get('/sign-out', auth.signOut)

//Sending password reset email
router.post('/forgot-password', auth.forgotPass)

//Password reset (change) via email link
router.post('/reset-password/:token', auth.resetPass)

export default router