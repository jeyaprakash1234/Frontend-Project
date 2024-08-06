import React, {useState}from 'react';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





import './RegisterForm.css';

import Menu from './Menu';


// const registerBackground = require('../assets/images/laundry-register-bg.jpg');

function RegisterForm  ()  {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      if(response.status === 200  ) {
        navigate('/')
        alert('Register successfully')
        
      } else{
        console.log("error");
      }
      

      
    } catch (error) {
      toast.error('There was an error!', error);
    }
  };
    

   
    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string()
        .min(10, 'Password must be at least 10 characters ')
        .required('Required')
    });

    const onSubmit = values => {
        console.log('Form data', values);
    };


    return (
        <div className="register-form-container">
            <Menu/>
            <ToastContainer/>
            <Container className="form-container">
                <h1 className="form-title">Register</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {formik => (
                        <Form onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field type="text" id="name" name="name"className="form-control"  value={name} onChange={(e) => setName(e.target.value)} required />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="email"  name="email" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password"id="password" name="password" className="form-control" placeholder="min. 10 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <Button  type="submit" className="btn btn-primary btn-block">Register</Button>
                            <Link to ="/login" type ="submit" className='btn btn-primary btn-block'>Login</Link> 
                        </Form>
                       
                    )}
                </Formik>
                
            </Container>
            
        </div>
        
    );
};

export default RegisterForm;
