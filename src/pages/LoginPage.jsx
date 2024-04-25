import React from 'react';
import { IoFlowerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/loginInput'; // Ubah path sesuai dengan struktur proyek Anda
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h1><IoFlowerOutline /></h1>
          <h2>Know Your World With Us</h2>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <LoginInput login={onLogin} />
          <p>Don't have an account? <Link to="/register">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
