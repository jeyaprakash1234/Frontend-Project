// import React, { useState } from 'react'

// function PaymentPage () {

//   const [amout, setAmount]= useState('')
//   return (
//     <div className='PaymentPage'>

//       <h2>Razorpay Payment </h2>

//     </div>
//   )
// }

// export default PaymentPage


// src/components/Payment.js
import React from 'react';
import './payment.css'; // Import the CSS file

const PaymentPage = () => {
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

  return (
    <div className="payment-container">
      <button className="payment-button" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
