import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
 import { Navbar,Container } from 'react-bootstrap';
import Menu from './components/Menu';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ServiceList from './components/ServiceList';
import './App.css'
// import background from './assets/images/pexels-grant-larcom-1296658223-24414789.jpg'
import logo from './assets/images/logo.png';

// import porfile  from './assets/images/profile.png'


import PaymentForm from './components/PaymentPage';
import ForgotPasswords from './ForgotPassword';
import ResetPasswords from './ResetPassword';





function App() {

    
        
    return (
       
        
        <Router>
            <Menu/>
              <Navbar  >
               
                   
                    <Navbar.Brand as={Link} to="/" >
                    <img 
                     src={logo}
                     alt='laundry Service'
                     className='d-inline-block align-top logo'
                     />
                     
                    
                    </Navbar.Brand>
                      {/* <Nav className="ml-auto ">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/services">Services</Nav.Link>
                    </Nav>  */}
                    




               
            </Navbar>  
            <Container className="my-4"> 
               
                <Routes>
                     <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                 <Route path="/services" element={<ServiceList />} />
                 
                 <Route path="/payment" element={<PaymentForm />} />  
                 <Route path="/forgot-password" element={<ForgotPasswords />} />
                 <Route path="/resetpassword/:id/:token" element={<ResetPasswords />} />   
                 
                 
                   
              

                   
                </Routes>
              
        </Container> 
       
        </Router>
       
       
      
    );
}

export default App;
