

import React, { useEffect,useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../store/auth/authSlice';
import Loading from '../../assets/istockphoto-1305268276-612x612.jpg';
import { Link } from 'react-router-dom';
import './SignupForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/context/AuthContext';
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contact: Yup.string().required('Contact is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function SignupForm() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const formikRef = React.useRef();
  const initialValues = {
    username: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  };
  useEffect(() => {
    if (token) {
      console.log("I don't have a token");
      navigate('/events');
    }}, [token]);
  useEffect(() => {
    console.log('Redux Auth Data:', authData);
   
  }, [authData]);

  // Rest of the code...
  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(updateState(values));
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error registering user');
      }

      const responseData = await response.json();
  setSubmitting(false);
      setRegistrationStatus('success');
      console.log(responseData)

    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationStatus('error');
    }
    
    setSubmitting(false);
  };

  


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 bg-light">
          <div className="signup-form">
            <h2>Sign Up</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {registrationStatus === 'success' && (
                    <div className="alert alert-success">Registration successful!</div>
                  )}
                  {registrationStatus === 'error' && (
                    <div className="alert alert-danger">Error registering user.</div>
                  )}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                    />
                    <ErrorMessage name="username" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <Field
                      type="text"
                      id="contact"
                      name="contact"
                      className="form-control"
                    />
                    <ErrorMessage name="contact" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      
                    />
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="error" />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </Form>
              )}
            </Formik>

            <p>
              If you already have an account,{' '}
              <Link to="/">log in</Link>
            </p>
          </div>
        </div>
        <div className="col-sm-6 bg-light">
          
            <img src={Loading} alt="Loading..." style={{ height: '500px' }} />
        
        </div>
      </div>
    </div>
  );
}

export default SignupForm;