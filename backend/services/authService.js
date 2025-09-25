import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwb from "jsonwebtoken"

import asyncHandler from "express-async-handler";

import { sendEmail } from '../utils/sendMailer.js'
import codeGenerator from "../utils/code-generator.js";
import { confirmEnteredCode, getUserByIdInToken, createEvent, getUserByEmail, getUserByLogin } from '../services/userService.js'

const signUp = async (req, res) => {
    const { username, password, passwordConfirmation, email } = req.body

    const isUsed = await User.findOne({ username })

    if (isUsed) {
        return res.json({
            message: 'This login is used.'
        })
    }

    if (password !== passwordConfirmation) {
        return res.json({
            message: "Password confirmation was faild. Try again."
        })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
        username,
        password: hash,
        email: email
    })
    // console.log(newUser)
    await newUser.save()

    // console.log(activationCode.toString())
    const code = await sendCode(newUser)
    return code
}

const sendCode = async (user) => {
    const activationCode = codeGenerator()
    const event = await createEvent({
        userId: user._id,
        eventContent: activationCode.join('')
    })
    await sendEmail(user.email, "Verify Email", { text: `Hello ${user.username},\n\nThank you for registering with "Life in Jotting"!\nTo complete your account activation, please use the following verification code:\n\n Your code\n ${activationCode.join('')}\n\nIf you didn’t request this code, please ignore this email.\n\n Best regards,\nThe "Life in Jotting" Team` })
    return event._id
}

const confirm = async (eventId, code) => {
    const data = await confirmEnteredCode(eventId, code);
    if (data.status !== 200) {
        return (data)
    } else {
        return await generateToken(data.user);
    }
}

const refresh = async (refreshToken) => {
    const payload = await this.validateToken(refreshToken);
    const user = await getUserByIdInToken(payload._id)
    return await this.generateToken(user);
}

const validateToken = async (token) => {
    try {
        const payload = jwb.verify(token);
        return payload;
    } catch {
        throw new UnauthorizedException()
    }
}

const generateToken = async (user) => {
    const accessPayload = { id: user._id, role: user.role };
    const refreshPayload = { id: user._id };
    return {
        accessToken: jwb.sign(accessPayload, process.env.JWT_SECRET, { expiresIn: '15m' }),
        refreshToken: jwb.sign(refreshPayload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
    };
}

const signin = async (req) => {
    const { username, password } = req.body
    const user = username.includes('@') ?
        await getUserByEmail(username) :
        await getUserByLogin(username);
    if (!user) {
        return {
            tokens: null,
            message: "User undefined"
        }
    }
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (passwordEquals) {
        const tokens = await generateToken(user);
        return ({ tokens, message: null })
    }
    if (!user.isActivated) {
        return {
            tokens: null,
            message: 'User inactive account'
        }
    }
    return {
        tokens: null,
        message: 'Incorrect password'
    }

}

const forgotPass = async (req) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        const v_token = jwb.sign(
            {
                email: user.email,
            },
            process.env.JWT_SECRET_FORGOT_PASSWORD,
            { expiresIn: "15m" }
        );
        await sendEmail(user.email, `Restoring access to your account in "Life in Jotting"`, { token: v_token, type: "forgot", username: user.username })
    }
    return ({ message: "mail send (forgot pass)" })
}

const resetPass = async (req) => {
    const { newPass, repeatPass } = req.body

    if (newPass && repeatPass && req.params.token) {
        jwb.verify(
            req.params.token,
            process.env.JWT_SECRET_FORGOT_PASSWORD,
            asyncHandler(async (err, decoded) => {
                if (decoded === undefined) {
                    return { message: "Wrong token" };
                }
                req.decoded = decoded.email;
                if (err) {
                    return { message: "Forbidden" };
                }
            })
        );

        const user = await User.findOne({ email: req.decoded });
        if (!user) {
            return { message: "Sorry, user not found!" };
        }

        if (newPass != repeatPass) {
            return { message: "Passwords are different" };
        }

        const isPasswordCorrect = await bcrypt.compare(newPass, user.password);
        if (isPasswordCorrect) {
            return {
                message: "Your new password has to be different from your old",
            };
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPass, salt);

        user.password = hash;
        await user.save();
        return { message: "Your password was changed" };
    } else {
        return ({ message: "Content can not be empty (reset password)" })
    }


}

export {
    signUp, signin, sendCode, confirm, refresh, validateToken, generateToken, forgotPass, resetPass
}
