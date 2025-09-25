import { signUp, signin, confirm, refresh, forgotPass, resetPass } from '../services/authService.js'
// export const registration = async (req, res) => {
//     try {
//         const { first_name, last_name, username, password, email } = req.body;

//         const validEmail = await User.findOne({ email })
//         if (validEmail) {
//             return res.json({ message: "Такий e-mail вже зареєстровано в системі." })
//         }

//         const validUsername = await User.findOne({ username })
//         if (validUsername) {
//             return res.json({ message: "Цей нікнейм вже зайнято. Спробуйте інший." })
//         }

//         const salt = bcrypt.genSaltSync(3);
//         const hash = bcrypt.hashSync(password, salt)

//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: process.env.SMTP_PORT,
//             secure: true,
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASSWORD
//             }
//         })

//         //доробити створення та хешування коду активації 
//         const activationCode = codeGenerator()
//         console.log(activationCode)

//         //содержание письма
//         const mailOptions = {
//             from: process.env.SMTP_USER,
//             to: email,
//             subject: 'Активація облікового запису',
//             text: '',
//             html:
//                 `
//             <div>
//                 <h1> Код активації</h1>
//                 <h2>${activationCode}</h2>
//             `
//         }

//         transporter.sendMail(mailOptions, async (error, info) => {
//             if (error) {
//                 console.log(error)
//                 return res.json({ message: error })
//             } else {
//                 const newUser = new User({
//                     first_name,
//                     last_name,
//                     username,
//                     password: hash,
//                     email
//                 })
//                 await newUser.save()
//                 //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//                 //разобраться с токеном и куки!!!!
//                 //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//                 return res.json({ newUser, message: 'Confirmation code was sent' })
//             }

//         })
//     } catch (error) {
//         return res.json({ message: error })
//     }
// }

export class AuthController {
    async signUp(req, res) {
        try {
            const response = await signUp(req, res)
            res.json({
                eventId: response,/* этот айди потом пойдёт в парамсы на фронте при переадресации на ввод кода*/
                message: "Mail sent"
            })
        } catch (error) {
            res.json({ message: `Error registration: ${error}` })
        }
    }

    async confirmEmail(request, response) {
        try {
            const tokens = await confirm(request.params.eventId, request.body.code);
            if (!tokens?.message) {
                response.cookie('accessToken', tokens.accessToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
                });
                response.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
                });
                response.json({ error: false, message: 'User comfirm account' })
            } else {
                response.status(tokens.status).json({ message: tokens.message })
            }
        } catch (error) {
            response.json({
                message: error,
                error: true
            })
        }


    }

    async refresh(request, response) {
        const tokens = await refresh(request.cookies['refreshToken']);
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        response.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        });
        response.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        });
        return { accessToken: tokens.accessToken, message: 'Success' };
    }

    async signOut(request, response) {

    }

    async signIn(request, response) {
        const tokens = await signin(request);
        if (tokens.tokens != null) {
            response.cookie('accessToken', tokens.tokens.accessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
            });
            response.cookie('refreshToken', tokens.tokens.refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
            });
            response.json({ message: 'The user is authorized' });
        } else {
            response.json({ message: tokens.message })
        }


    }

    async forgotPass(request, response) {
        const data = await forgotPass(request)
        console.log(data.message)
        response.json({
            message: data.message
        })
    }

    async resetPass(request, response) {
        const data = await resetPass(request)
        if (data) {
            response.json({ message: data.message })
        }
    }
}
