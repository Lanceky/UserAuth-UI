import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import cowbg from '../../assets/cowbg.jpg';

interface SignupResponse {
  token: string;
}

const Signup = () => {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Too short').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
    }),
    onSubmit: async (values) => {
      setApiError('');
      setIsLoading(true);
      try {
        const response = await axios.post<SignupResponse>('http://localhost:3000/auth/signup', {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } catch {
        setApiError('Signup failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${cowbg})` }}>
      <div className="login-form-container">
        <h1>Create your account.</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur}
              value={formik.values.name} placeholder="Full Name" />
            {formik.touched.name && formik.errors.name && <span className="error-text">{formik.errors.name}</span>}
          </div>
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
          <div className="form-group">
            <input type="password" name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur}
              value={formik.values.confirmPassword} placeholder="Confirm Password" />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <span className="error-text">{formik.errors.confirmPassword}</span>
            )}
          </div>
          {apiError && <span className="error-text error-api">{apiError}</span>}
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="other-login-options">
          <p>Or sign up with</p>
          <div className="social-login">
            <button className="social-icon google"></button>
            <button className="social-icon facebook"></button>
            <button className="social-icon apple"></button>
          </div>
        </div>
        <div className="create-account">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
