import logo from "../../img/icons/logo.svg"
import "./styles/SignIn.css"
import stars from "../../img/stickers/stars.png"
import bulb from "../../img/stickers/bulb.png"
import sign_up_img from "../../img/icons/file-edit.svg"
import next_btn from "../../img/icons/next.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { userProfile } from "../../store/reducers/userSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { signin } from "../../store/reducers/authSlice"
import { getAllNotebooks } from "../../store/reducers/pageSlice"
// import google from "../../img/icons/search.png"


export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { status } = useAppSelector((state) => state.authSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfile());
        if (status === 'The user is authorized') {
            dispatch(getAllNotebooks())
            navigate('/');
        }
        console.log(status);
    }, [status, dispatch, navigate]);

    const handleSubmit = () => {
        try {
            dispatch(
                signin({
                    username,
                    password,
                })
            );
        } catch (error) {
        }
    };

    const goToSignUp = () => {
        navigate('/sign-up')
    }

    return (
        <div className="unauthorized__container">
            <div className="half-part">
                <div className="unauthorized__logo">
                    <img src={logo} alt="logo" />
                    <label>Life In Jotting</label>
                </div>
            </div>

            <div className="half-part">
                <div className="bg">
                    <div className="bg__container">
                        <label className="bg__header">Sign in to your account</label>
                        <div className="bg__img-star-sticker">
                            <img src={stars} alt="start sticker" />
                        </div>
                        <div className="bg__sign-in-data">
                            <div className="bg__inputs">
                                <label>Username or e-mail</label>
                                <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" />
                            </div>
                            <div className="bg__google">
                                <label id="pass">Password</label>
                                {/* <label id="or">OR</label> */}
                                {/* <div className="bg__google-btn">
                                    <img src={google_icon} alt="google" />
                                    <label>Google account</label>
                                </div> */}
                            </div>
                            <div className="bg__inputs">
                                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate("/access-recovery")
                        }} className="bg__forgot-pass">
                            <label>Forgot your password? Click here to recover it</label>
                            <img src={bulb} alt="bulb" />
                        </div>
                        <div className="bg__bottom">
                            <div onClick={goToSignUp} className="bg__sign-up-link">
                                <img src={sign_up_img} alt="sign-up" />
                                <label>Don't have an account yet? Create one now!</label>
                            </div>
                            <div onClick={handleSubmit} className="bg__next-btn">
                                <label>Sign in</label>
                                <img src={next_btn} alt="next" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}