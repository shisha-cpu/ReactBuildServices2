import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css'
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">Теплоизоляция</Link>

        <div 
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`} 
          onClick={toggleMenu}
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </div>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item"><Link to="/services" className="header__nav-link">Услуги</Link></li>
            <li className="header__nav-item"><Link to="/forum" className="header__nav-link">Форум</Link></li>
            <li className="header__nav-item"><Link to="/about" className="header__nav-link">О компании</Link></li>
            <li className="header__nav-item"><Link to="/contacts" className="header__nav-link">Контакты</Link></li>
            
            {user?.name ? (
              <li className="header__nav-item">
                <Link to="/profile" className="header__nav-link">Личный кабинет</Link>
              </li>
            ) : (
              <>
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link">Вход</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/register" className="header__nav-link">Регистрация</Link>
                </li>
              </>
            )}
            
            {user?.name === 'nwe' && (
              <li className="header__nav-item">
                <Link to="/admin" className="header__admin-link">Админ-панель</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;