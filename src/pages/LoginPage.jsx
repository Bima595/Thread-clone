import 'react';
import { IoFlowerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput'; 
import { asyncSetAuthUser } from '../states/authUser/action';
import { toast } from 'react-hot-toast'; 
 
function LoginPage() {
  const dispatch = useDispatch();
 
  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => {
        // Jika login berhasil, tampilkan notifikasi
        console.log('Login successful!');
        toast.success('Login successful!', {
          duration: 4000,
          position: 'top-center',
        });
      })
      .catch(() => {
        // Jika login gagal, tampilkan notifikasi dengan pesan error
        console.log('Login failed!');
        toast.error(`Login failed !!!`, {
          duration: 4000,
          position: 'top-center',
        });
      });
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
          <p>Don&apos;t have an account? <Link to="/register">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
}
 
export default LoginPage;