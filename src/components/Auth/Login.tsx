import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import cowicon from '../../assets/cow.png';
import cowbg from '../../assets/cowbg.jpg';

interface LoginResponse {
  token: string;
}

const Login = () => {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Too short').required('Required'),
    }),
    onSubmit: async (values) => {
      setApiError('');
      setIsLoading(true);
      try {
        const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', values);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } catch {
        setApiError('Login failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${cowbg})` }}>
      <div className="login-form-container">
        <img src={cowicon} alt="Cow Icon" className="cow-icon" />
        <h1>Log in to your account.</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}
              value={formik.values.email} placeholder="Email" />
            {formik.touched.email && formik.errors.email && <span className="error-text">{formik.errors.email}</span>}
          </div>
          <div className="form-group">
            <input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}
              value={formik.values.password} placeholder="Password" />
            {formik.touched.password && formik.errors.password && <span className="error-text">{formik.errors.password}</span>}
          </div>
          <div className="forgot-password"><a href="#">Forgot your password?</a></div>
          {apiError && <span className="error-text error-api">{apiError}</span>}
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="other-login-options">
          <p>Or login with</p>
          <div className="social-login">
            <button className="social-icon google"></button>
            <button className="social-icon facebook"></button>
            <button className="social-icon apple"></button>
          </div>
        </div>
        <div className="create-account">
          <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
