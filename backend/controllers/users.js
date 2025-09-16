import User from '../models/user.js'
import jwb from "jsonwebtoken"
import { getUserByIdInToken } from '../services/userService.js'

export class UserController {
    async getUserData(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({ message: "User unauthorized" })
                return;
            }

            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)
            res.json({
                user: user_data,
                message: "User is loged in"
            })
        } catch (error) {
            res.json({ message: `Get User Data Error: ${error}` })
        }
    }
}
