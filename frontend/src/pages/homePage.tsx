import { useNavigate } from "react-router-dom"
import { Notebooks } from "../components/authorized/Notebooks"
import { PageCanvas } from "../components/authorized/PageCanvas"
import { Pages } from "../components/authorized/Pages"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import "./styles/homePage.css"
import { logout } from "../store/reducers/authSlice"



export const HomePage = () => {

    const { active_notebook } = useAppSelector(state => state.pageSlice)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutClick = () => {
        dispatch(logout());
        navigate('/');
        location.reload();
    };
    return (
        <div className="home-screen__container">
            {/* <div className="home-screen__box"> */}
            <div className="home-screen__notebooks">
                <Notebooks />
            </div>
            <div className="home-screen__pages">
                <div className="home-screen__pages-toolbar">
                    Toolbar {active_notebook}
                    <a href="#!" className='header__nav-btn' onClick={logoutClick}>sign out</a>
                </div>
                <div className="notebook__component">
                    <div className="notebook__pages-list">
                        <Pages />
                    </div>
                    <div className="notebook__page-field">
                        <PageCanvas />
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}
