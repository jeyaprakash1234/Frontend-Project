import React ,{useState}from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button } from 'react-bootstrap';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';

import Menu from './Menu';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';




// const loginBackground = require('../assets/images/laundry-register-bg.jpg');

function LoginForm  () {
    //const navigate =useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const navigate = useNavigate();    
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('https://backend-project-2-cbk8.onrender.com/api/auth/login', { email, password });
        if(response.status === 200  ) {
           
            Swal.fire({
                title: "Good job!",
                text: "Login successfully!",
                icon: "success"
              });
              navigate('/')
         
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        toast.error('There was an error!', error);
      }
    };
   

  
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required(''),
        password: Yup.string().required('')
    });

    const onSubmit = values => {
        console.log('Form data', values);
    };

    return (
        <div className="login-form-container">
            <Menu/>
            <ToastContainer/>
            <Container className="form-container">
                <h1 className="form-title">Login</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    {formik => (
                        <Form onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="name" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}required />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" id="name"  name="password"  className="form-control"value={password} onChange={(e)=>setPassword(e.target.value)}required />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>
                            <div className="register-link">
                            <p>Don't have an account? <Link to="/register">Register here</Link></p>
                            <p>Forgot passwrod <Link to="/forgot-password">click here</Link></p>


                            </div>

          

                            <Button type="submit" className="btn btn-primary btn-block">Login</Button>
                        </Form>
                    )}
                </Formik>
                
            </Container>
        </div>
    );
};

export default LoginForm;