import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authSlice.ts';

import logo_img from './../../img/icons/logo.svg'
import './header.css'

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userSlice);

  const logoutClick = () => {
    dispatch(logout());
    navigate('/');
    location.reload();
  };

  return user.user ? (
    <header className='header'>
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <img src={logo_img} alt="Logo" />
            <span>Life In Jotting</span>
          </div>
          <nav className="header__nav">
            <ul>
              <li><a href="#!">Profile</a></li>
              <li><a href="#!" className='header__nav-btn' onClick={logoutClick}>sign out</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  ) : (
    <header className='header'>
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <img src={logo_img} alt="Logo" />
            <span>Life In Jotting</span>
          </div>
          <nav className="header__nav">
            <ul>
              <li><a href="#!">Item</a></li>
              <li><a href="#!">Item</a></li>
              <li><a href="#!">Item</a></li>
              <li><a href="#!">Item</a></li>
              <li><a href="#!" className='header__nav-btn'>sign in</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
