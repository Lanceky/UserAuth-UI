import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Too short')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setApiError('');
      setIsLoading(true);
      try {
        const response = await axios.post<{ token: string }>(
          'http://localhost:3000/auth/login',
          values
        );
        console.log('Token:', response.data.token);
      } catch (err) {
        setApiError('Login failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Email"
      />
      {formik.errors.email && formik.touched.email && (
        <span>{formik.errors.email}</span>
      )}

      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Password"
      />
      {formik.errors.password && formik.touched.password && (
        <span>{formik.errors.password}</span>
      )}

      {apiError && <span>{apiError}</span>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
