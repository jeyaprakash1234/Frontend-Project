import React ,{useState}from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Container, Button } from 'react-bootstrap';

import {  useNavigate, useParams } from 'react-router-dom';


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






// const loginBackground = require('../assets/images/laundry-register-bg.jpg');

function ResetPassword  () {
    //const navigate =useNavigate();
    
    const [password, setPassword] = useState('');
    
     const navigate = useNavigate();   
     const {id, token }=useParams() ;
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${id}/${token}`, { password });
        if(response.status === 200  ) {
            navigate('/login')
            
         
         
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        toast.error('There was an error!', error);
      }
    };
   

  
    // const initialValues = {
    //     email: '',
        
    // };

    // const validationSchema = Yup.object({
    //     email: Yup.string().email('Invalid email format').required(''),
        
    // });

    const onSubmit = values => {
        console.log('Form data', values);
    };

    return (
        <div className="login-form-container">
            
            <ToastContainer/>
            <Container className="form-container">
                <h1 className="form-title">ResetPassword</h1>
                <Formik onSubmit={onSubmit} >
                    {formik => (
                        <Form onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="password">New password</label>
                                <Field type="password" id="password" className="form-control" placeholder="min 10 " value={password} onChange={(e)=>setPassword(e.target.value)}required />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                           

                            <Button type="submit" className="btn btn-primary btn-block">update </Button>
                        </Form>
                    )}
                </Formik>
                
            </Container>
        </div>
    );
};

export default ResetPassword;