import React,{useState }from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Services.css';
import foldingsrc from '../assets/images/folding.jpg';
import stitchings from  '../assets/images/stitchings.jpg';
import house from '../assets/images/housekeeping.jpg';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function ServiceList() {
  

    const [showBookingForm, setShowBookingForm] = useState(false);
     const [selectedService, setSelectedService] = useState(null);
  
     const handleBookClick = (service) => {
       setSelectedService(service);
      setShowBookingForm(true);
    };
  
    const handleCloseForm = () => {
      setShowBookingForm(false);
      setSelectedService(null);
    };

    const [service, setService] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [pincode , setPincode ] = useState('');

     const navigate = useNavigate();    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newBooking = { name,  phone, service ,pincode,address};
      try {
        await axios.post('http://localhost:5000/api/booking/bookingdata', newBooking);
        alert('Booking successful!');
        setName('');
        setPincode('');
        setPhone('');
        setAddress('');
        setService('');
        navigate('/services');
      } catch (err) {
        toast.error('Error creating booking');
      }
    };
   
    
    


    const services = [
        {
            title: 'Laundry Service',
            description: 'Complete laundry service with wash, dry, and fold.',
            price: 'Starting at RS:999 per load',
            image: 'https://www.rishabhsoft.com/wp-content/uploads/2022/01/Laundry-Management-System-Development-1200x600-1.jpg?text=Laundry+Service'
        },
        {
            title: 'Dry Cleaning',
            description: 'Professional dry cleaning for all types of fabrics.',
            price: 'Starting at RS:100 per item',
            image: 'https://housing.com/news/wp-content/uploads/2023/07/How-to-dry-clean-clothes-at-home-t.jpg?text=Dry+Cleaning'

        },
        {
            title: 'Ironing Service',
            description: 'Expert ironing to keep your clothes crisp and wrinkle-free.',
            price: 'Starting at RS:50  per item',
            image: 'https://i.insider.com/5ea06be7a34b3c74de4f11a4?width=1200&format=jpeg?text=Ironing+Service'
        },
        {
            title: 'Folding Service',
            description: 'Perfect folding service to keep your clothes organized.',
            price: 'starting at RS:899 per load',
            image: foldingsrc
          },
          {
            title: 'Stitching Service',
            description: 'Professional Stitcher  for a perfect fit for your cloth  .',
            price: 'Starting at RS:50 per item',
            image: stitchings
          },
          {
            title: 'HouseKeeping',
            description: 'Professional Housekeeping  for a perfect to the cleaning  your house.',
            price: 'Starting at RS:150 per her',
            image:house
          }

    ];

    const offers = [
        {
            title: '20% Off on First Order',
            description: 'Use code FIRST20 to get 20% off on your first laundry order!',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/013/562/832/small/20-percent-off-special-discount-offer-20-off-sale-of-advertising-campaign-graphics-free-vector.jpg'
        },
        {
            title: 'Free Pickup and Delivery',
            description: 'Enjoy free pickup and delivery for orders above $50.',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/007/267/486/small/fast-and-free-delivery-by-scooter-perfect-for-landing-page-delivery-man-and-smartphone-tracking-website-banner-background-application-poster-on-mobile-free-vector.jpg'
        },
        {
            title: '50% Off on Dry Cleaning',
            description: 'Get 50% off on all dry cleaning services. Limited time offer!',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/025/360/966/small/special-offer-discount-hand-drawn-numbers-of-50-percent-off-black-friday-sale-vector.jpg'
        }
    ];

    return (
       
        <Container >
            <ToastContainer/>
            <Menu/>
            <div className={`services ${showBookingForm ? 'blurred' : ''}`}> 
            <h2 className="text-center my-5">Our Services</h2>
            <Row>
                {services.map((service, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="service-card">
                            <Card.Img variant="top" src={service.image} />
                            <Card.Body>
                                <Card.Title>{service.title}</Card.Title>
                                <Card.Text>
                                    {service.description}
                                </Card.Text>
                                <Card.Text>
                                    {service.price}
                                </Card.Text>
                                <Card.Text>
                                <button className="book-button" onClick={() => handleBookClick('Laundry Service')}>Book</button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            

           

            <h2 className="text-center my-5">Daily Offers</h2>
            <Row>
                {offers.map((offer, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="offer-card">
                            <Card.Img variant="top" src={offer.image} />
                            <Card.Body>
                                <Card.Title>{offer.title}</Card.Title>
                                <Card.Text>
                                    {offer.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </div>
            {showBookingForm && (
                <>
                 <div className="background-overlay" onClick={handleCloseForm}></div>
        <div className="booking-form">
          <h2>Book {selectedService}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}required />
            </div>
            <div className="form-group">
              <label htmlFor="service">service</label>
              <input type="text" id="service" name="service" value={service} onChange={(e)=>setService(e.target.value)}required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address"  value={address} onChange={(e)=>setAddress(e.target.value)}required/>
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" name="pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)}required />
            </div>
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="close-button" onClick={handleCloseForm}>Close</button>
          </form>
        </div>
        </>
      )}
            <footer className="text-center my-5">
                <p>&copy; 2024 Laundry Service. All rights reserved.</p>
            </footer>
        </Container>

    );
}

export default ServiceList;
