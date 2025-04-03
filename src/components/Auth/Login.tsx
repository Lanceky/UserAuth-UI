import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password too short').required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values); // Validated form data
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Email"
      />
      {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}

      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Password"
      />
      {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
