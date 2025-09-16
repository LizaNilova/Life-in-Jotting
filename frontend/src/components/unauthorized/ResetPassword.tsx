import logo from "../../img/icons/logo.svg"
import bulb from "../../img/stickers/bulb.png"
import next from "../../img/icons/next.png"
import star from "../../img/stickers/stars.png"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { resetPassword } from "../../store/reducers/authSlice"

import "./styles/ResetPassword.css"

export const ResetPassword = () => {
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const { status } = useAppSelector((state) => state.authSlice)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (status === "Your password was changed") {
            console.log("password was changed....")
            navigate('/')
        }
    }, [navigate, status])

    const handleSubmit = () => {
        dispatch(resetPassword({ newPass: pass, repeatPass: repeatPass, token: params.token }))
    }
    return (
        <div className="main-container">
            <div className="logo-container">
                <img src={logo} alt="logo" />
                <label>Life In Jotting</label>
            </div>
            <div className="notebook__container">
                <div className="sticky-note__container">
                    <div className="reset-pass__card">
                        <div>Зміна паролю</div>
                    </div>
                </div>
                <div className="forgot-pass__container">
                    <img className="bulb" src={bulb} alt="bulb" />
                    <p>Для зміни паролю введіть новий в поля нижче</p>
                    <input value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder="Новий пароль" type="password" />
                    <input value={repeatPass} onChange={(e) => { setRepeatPass(e.target.value) }} placeholder="Повторіть новий пароль" type="password" />
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