import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useNavigate } from "react-router-dom"
import { signup } from "../../store/reducers/authSlice"

import logo from "../../img/icons/logo.svg"
import star from "../../img/stickers/stars.png"
import pot from "../../img/stickers/pot.png"
import bulb from "../../img/stickers/bulb.png"
import google from "../../img/icons/search.png"
import next from "../../img/icons/next.png"

import "./styles/SignUp.css"

export const SignUp = () => {
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [passAgain, setPassAgain] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const { status, eventId } = useAppSelector(state => state.authSlice)
    const navigate = useNavigate()

    useEffect(() => {
        if (status == 'Mail sent') {
            navigate(`/activate/${eventId}`)
        }
    }, [status, navigate])

    const handleSignUp = () => {
        try {
            dispatch(
                signup({ username, password: pass, passwordConfirmation: passAgain, email })
            )
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="main-container">
            <div className="logo-container">
                <img src={logo} alt="logo" />
                <label>Life In Jotting</label>
            </div>
            <div className="notebook__container">
                <div className="notebook__google-container">
                    <img src={bulb} alt="bulb" />
                    <label>Створення облікового запису</label>
                    {/* <div className="google-btn">
                        <img src={google} alt="google" />
                        <label>Google account</label>
                    </div> */}
                    <div className="google__bottom">
                        <img src={pot} alt="pot" />
                        {/* <label>або</label> */}
                    </div>
                </div>
                <div className="notebook__classic-sign-up">
                    <label>nfjdvnfdkvndkfvndkjnvdkgbfbmfgkbflkmb
                        kndkjnkdj</label>
                    <img src={star} alt="star" />
                    <div className="sign-up__container">
                        <div className="sign-up__inputs">
                            <label>Ім'я користувача</label>
                            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text"></input>
                        </div>
                        <div className="sign-up__inputs">
                            <label>Електронна пошта</label>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text"></input>
                        </div>
                        <div className="sign-up__inputs">
                            <label>Пароль</label>
                            <input value={pass} onChange={(e) => { setPass(e.target.value) }} type="password"></input>
                        </div>
                        <div className="sign-up__inputs">
                            <label>Повторіть пароль</label>
                            <input value={passAgain} onChange={(e) => { setPassAgain(e.target.value) }} type="password"></input>
                        </div>
                    </div>
                    <div className="sign-up__bottom">
                        <div onClick={handleSignUp} className="next-btn">
                            <label>Далі</label>
                            <img src={next} alt="next" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}