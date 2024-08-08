import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './payment.css';

function PaymentPage () {


  const products = [
    { name: 'Laundry Service', price: 999, discount: 10 },
    { name: 'Dry Cleaning', price: 100, discount: 50 },
    { name: 'Ironing Service', price: 500, discount: 5 },
    { name: 'Folding Service', price: 899, discount: 20 },
    { name: 'Stitching Service', price: 50, discount: 10 },
    { name: 'Housekeeping Service', price: 150, discount: 25 }
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [formData, setFormData] = useState({
   
    housekeepingHours: 1 // Default to 1 hour
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleProductChange = (e) => {
    const selected = products.find(product => product.name === e.target.value);
    setSelectedProduct(selected);
    setFormData({ ...formData, housekeepingHours: 1 });
  };
  const calculateFinalPrice = () => {
    let basePrice = selectedProduct.price;
    
    if (selectedProduct.name === 'Housekeeping Service') {
      basePrice *= parseInt(formData.housekeepingHours, 10); // Multiply by hours
    }
    
    const discountAmount = basePrice * (selectedProduct.discount / 100);
    return basePrice - discountAmount;
  };

  const finalPrice = calculateFinalPrice();

  


  const [amount, setAmount]= useState('')

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(amount ==""){
      alert('enter the amount')
     
    }else{
      var options ={
        key:"rzp_test_3vX7YtmxzDNqN0",
        key_secret:"VIbktoDKS1LIpbKHSM6IktVS",
        amount:amount*100,
        currency:"INR",
        name:"laundry payment",
        description:"for testing purpose",
        handler: function(){
          Swal.fire({
            title: "payment successfully!",
            text: "You clicked the button!",
            icon: "success"
          });
          

        },
        prefill:{
          name:"jeyaprakash",
          email:"hhtfcjp@gamil.com",
          contact:"1234567891"
        },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme:{
        color:"#fff"
        }
      
      };
      var pay= new window.Razorpay(options);
      pay.open();

    }


  }
  return (
    <div className='Payment'>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className='Payment-card'>
            <Card.Body className='payment'>
              <Card.Title className="Payment-title">Payment Information</Card.Title>

              <Form.Group controlId="formProductSelect">
                <Form.Label>Select Product</Form.Label>
                <Form.Control className='Payment-focus' as="select" onChange={handleProductChange}>
                  {products.map((product, index) => (
                    <option key={index} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className='Payment2' controlId="formPrice">
                <Form.Label>Price: Rs:{selectedProduct.price}</Form.Label>
              </Form.Group>

              <Form.Group className='Payment2' controlId="formDiscount">
                <Form.Label>Discount: {selectedProduct.discount}%</Form.Label>
              </Form.Group>
              {selectedProduct.name === 'Housekeeping Service' && (
                <Form.Group controlId="formHousekeepingHours">
                  <Form.Label>Number of Hours</Form.Label>
                  <Form.Control
                    type="number"
                    name="housekeepingHours"
                    value={formData.housekeepingHours}
                    onChange={handleChange}
                    placeholder="Enter number of hours"
                    min="1"
                    required
                  />
                </Form.Group>
              )}

              <Form.Group  className="Payment2"controlId="formFinalPrice" >
                <Form.Label >Final Price to Pay: Rs:{finalPrice}</Form.Label>
              </Form.Group>

              
              
              <p>Please enter the Finalprice </p>
              <input type="text" placeholder='Enter amount ' className='Payment3' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
              
              </Card.Body>
              <button className='Payment-button' onClick={handleSubmit}> Pay</button>


              </Card>
        </Col>
      </Row>
             


      
      

 </div>
  )
}

export default PaymentPage


