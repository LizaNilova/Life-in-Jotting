import logo from "../../img/icons/logo.svg"
import bulb from "../../img/stickers/bulb.png"
import next from "../../img/icons/next.png"
import star from "../../img/stickers/stars.png"
import { useEffect, useState } from "react"

import "./styles/ActivateAccount.css"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { confirmRegistration } from "../../store/reducers/authSlice"
import { useNavigate, useParams } from "react-router-dom"

export const ActivateAccount = () => {
    const [code, setCode] = useState("")

    const { status } = useAppSelector(state => state.authSlice)

    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(status)
        if (status == "User comfirm account") {
            navigate('/')
        }
    }, [status, navigate])

    const handleSubmit = () => {
        dispatch(confirmRegistration({ code: code, id: String(params.id) }))
    }

    return (
        <div className="main-container">
            <div className="logo-container">
                <img src={logo} alt="logo" />
                <label>Life In Jotting</label>
            </div>
            <div className="notebook__container">
                <div className="sticky-note__container">
                    <div className="activate__card">
                        <div className="card_text">Registration Confirmation</div>

                    </div>
                </div>
                <div className="activate__container">
                    <img className="bulb" src={bulb} alt="bulb" />
                    <p>Enter the code that was sent to your e-mail</p>
                    <input maxLength={4} value={code} onChange={(e) => { setCode(e.target.value) }} placeholder="0000" type="text" />
                    <div className="bottom">
                        <img className="star" src={star} alt="star" />
                        <div className="next-btn"
                            onClick={handleSubmit}>
                            <label>Next</label>
                            <img src={next} alt="next" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}