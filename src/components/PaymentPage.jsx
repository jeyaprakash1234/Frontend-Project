import React, { useState } from 'react'


function PaymentPage () {


  const [amount, setAmount]= useState('')

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(amount ===""){
      alert('please enter amount');
    }else{
      var options ={
        key:"",
        key_secret:"",
        amount:amount*100,
        currency:"INR",
        name:"laundry payment",
        description:"for testing purpose",
        handler: function(response){
          alert(response.razorpay_payment_id);

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
    <div className='PaymentPage'>

      <h2>Razorpay Payment </h2>
      <br />
      <input type ="text"placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
      <br /> <br />
      <button onClick={handleSubmit}> Pay

      </button>
 </div>
  )
}

export default PaymentPage
