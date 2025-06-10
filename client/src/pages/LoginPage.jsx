import React, { useState } from 'react';
import { login } from '../api/api';
import { fetchUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import './LoginPage.css'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      dispatch(fetchUser(response));
      setRedirect(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Вход в аккаунт</h1>
          <p className="login-subtitle">Введите ваши данные для входа</p>
        </div>

        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Вход...
              </>
            ) : 'Войти'}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Ещё нет аккаунта?{' '}
            <Link to="/register" className="footer-link">
              Зарегистрироваться
            </Link>
          </p>
          <Link to="/forgot-password" className="forgot-password">
            Забыли пароль?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;