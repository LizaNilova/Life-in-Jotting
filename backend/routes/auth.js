import { Router } from "express"
import { AuthController } from "../controllers/auth.js"

const router = new Router()
const auth = new AuthController()

//Реєстрація користувача в системі
router.post('/sign-up', auth.signUp)

//Авторизація в системі
router.post('/sign-in', auth.signIn)

//Refresh token
router.get('/refresh', auth.refresh)

//Підтвердження пошти (перевірка відповідності введеного коду активації)
router.post('/confirm/:eventId', auth.confirmEmail)

//Sign Out
router.get('/sign-out', auth.signOut)

//Відправка листа зі скиданням паролю
router.post('/forgot-password', auth.forgotPass)

//Відновлення паролю (зміна) за посиланням з пошти
router.post('/reset-password/:token', auth.resetPass)

export default router