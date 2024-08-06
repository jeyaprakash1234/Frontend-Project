import React ,{useState}from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






// const loginBackground = require('../assets/images/laundry-register-bg.jpg');

function ForgotPassword  () {
    //const navigate =useNavigate();
    
    const [email, setEmail] = useState('');
    
     const navigate = useNavigate();    
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
        if(response.status === 200  ) {
            navigate('/login')
            
         
         
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        toast.error('There was an error!', error);
      }
    };
   

  
    const initialValues = {
        email: '',
        
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required(''),
        
    });

    const onSubmit = values => {
        console.log('Form data', values);
    };

    return (
        <div className="login-form-container">
            
            <ToastContainer/>
            <Container className="form-container">
                <h1 className="form-title">ForgotPassword</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    {formik => (
                        <Form onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="name" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}required />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                           

                            <Button type="submit" className="btn btn-primary btn-block">send </Button>
                        </Form>
                    )}
                </Formik>
                
            </Container>
        </div>
    );
};

export default ForgotPassword;