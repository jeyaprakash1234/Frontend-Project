import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css'
import Swal from 'sweetalert2'

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleRatingHover = (rate) => {
    setHover(rate);
  };

  const handleRatingHoverLeave = () => {
    setHover(0);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const feedbackData = {
    //   rating,
    //   comments,
    // };
    

    try {
      await axios.post('https://backend-project-2-cbk8.onrender.com/api/feedback', {rating,comments });
      setSubmitted(true);
      onSubmit(); 
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thankyou for your feedback",
        showConfirmButton: false,
        timer: 1500
      });

    }
    
    catch (error) {
      console.error('Error submitting feedback', error);
    }
    
    
  };

  if (submitted) {
    return <div>Thank you for your feedback!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Rate Our Service</h3>
      <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRatingClick(ratingValue)}
              />
              <svg
                className="star"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill={ratingValue <= (hover || rating) ? 'gold' : 'gray'}
                onMouseEnter={() => handleRatingHover(ratingValue)}
                onMouseLeave={handleRatingHoverLeave}
              >
                <polygon points="12,17.27 18.18,21 15.64,13.97 22,9.24 14.47,8.63 12,2 9.53,8.63 2,9.24 8.36,13.97 5.82,21" />
              </svg>
            </label>
          );
        })}
      </div>
      <div>
        <label>Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Leave your feedback here..."
        ></textarea>
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );

};

export default FeedbackForm;
