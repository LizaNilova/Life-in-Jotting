import { Router } from "express"

import { UserController } from "../controllers/users.js"

const router = new Router()
const user = new UserController()
//Get User Data
router.get('/profile', user.getUserData)

//edit user data
// router.post('/edit-profile', editUser)
export default router