// import React, { useState } from 'react'


// function PaymentPage () {


//   const [amount, setAmount]= useState('')

//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     if(amount ===""){
//       alert('please enter amount');
//     }else{
//       var options ={
//         key:"rzp_test_3vX7YtmxzDNqN0",
//         key_secret:"VIbktoDKS1LIpbKHSM6IktVS",
//         amount:amount*100,
//         currency:"INR",
//         name:"laundry payment",
//         description:"for testing purpose",
//         handler: function(response){
//           alert(response.razorpay_payment_id);

//         },
//         prefill:{
//           name:"jeyaprakash",
//           email:"hhtfcjp@gamil.com",
//           contact:"1234567891"
//         },
//         notes:{
//           address:"Razorpay Corporate office"
//         },
//         theme:{
//         color:"#fff"
//         }
      
//       };
//       var pay= new window.Razorpay(options);
//       pay.open();

//     }


//   }
//   return (
//     <div className='PaymentPage'>

//       <h2>Razorpay Payment </h2>
//       <br />
//       <input type ="text"placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
//       <br /> <br />
//       <button onClick={handleSubmit}> Pay

//       </button>
//  </div>
//   )
// }

// export default PaymentPage

// src/components/Payment.js
import React from 'react';

const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch('/api/create-order', { method: 'POST' });
    const { orderId, currency, amount } = await response.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID generated from the Razorpay Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR.
      currency: currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: orderId,
      handler: function (response) {
        // Handle the response from Razorpay
        console.log('Payment Successful', response);
        // Optionally send payment details to the server for verification
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
    },
    button: {
      backgroundColor: '#3399cc',
      color: '#fff',
      border: 'none',
      padding: '15px 30px',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#2874a6',
    },
    buttonActive: {
      backgroundColor: '#1c6ea4',
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        onMouseDown={(e) => (e.currentTarget.style.backgroundColor = styles.buttonActive.backgroundColor)}
        onMouseUp={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
