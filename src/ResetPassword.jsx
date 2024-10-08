import React ,{useState}from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Container, Button } from 'react-bootstrap';

import {  useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { RiLockPasswordFill } from "react-icons/ri";
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
        const response = await axios.post(`https://backend-project-2-cbk8.onrender.com/api/auth/reset-password/${id}/${token}`, { password });
        if(response.status === 200  ) {
            alert('Reset successfully')
            navigate('/login')
            
         
         
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        toast.error('There was an error!', error);
      }
    };
   

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
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
                <h1 className="form-title">Reset New Password </h1>
                <Formik onSubmit={onSubmit} >
                    {formik => (
                        <Form onSubmit={handleSubmit} >
                            <div className="password-input-container">
                                <label htmlFor="password"><RiLockPasswordFill size={30}color="#E1306C"/></label>
                                <Field type={passwordShown ? "text" : "password"} id="password" className="form-control" placeholder="min 10 " value={password} onChange={(e)=>setPassword(e.target.value)}required />
                                <button
                                      type="button"
                                         className="password-toggle-btn"
                                        onClick={togglePasswordVisibility}
                                          >
                                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
                                                           </button>
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