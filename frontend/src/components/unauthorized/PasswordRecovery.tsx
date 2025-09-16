
import logo from "../../img/icons/logo.svg"
import star from "../../img/stickers/stars.png"
import bulb from "../../img/stickers/bulb.png"
import next from "../../img/icons/next.png"

import "../unauthorized/styles/PasswordRecovery.css"
import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { useNavigate } from "react-router-dom"
import { forgotPassword } from "../../store/reducers/authSlice"

export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        dispatch(forgotPassword({ email }))
        navigate('/')
    }
    return (
        <div className="main-container">
            <div className="logo-container">
                <img src={logo} alt="logo" />
                <label>Life In Jotting</label>
            </div>
            <div className="notebook__container">
                <div className="sticky-note__container">
                    <div className="card">
                        <div>Забули пароль?</div>
                    </div>
                </div>
                <div className="forgot-pass__container">
                    <img className="bulb" src={bulb} alt="bulb" />
                    <p>Введіть e-mail, за яким було зареєстровано обліковий запис</p>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="your.e-mail@mail.com" type="text" />
                    <div className="bottom">
                        <img className="star" src={star} alt="star" />
                        <div className="next-btn"
                            onClick={handleSubmit}>
                            <label>Далі</label>
                            <img src={next} alt="next" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}