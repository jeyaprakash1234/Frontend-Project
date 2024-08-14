import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './adminpanel.css'; // Import the CSS file for custom styles

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [emailContent, setEmailContent] = useState('');
    const [cancelContent, setCancelContent] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [userSearch, setUserSearch] = useState('');
    const [bookingSearch, setBookingSearch] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchBookings();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                (user.name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                (user.email || '').toLowerCase().includes(userSearch.toLowerCase())
            )
        );
    }, [users, userSearch]);

    useEffect(() => {
        setFilteredBookings(
            bookings.filter(booking =>
                (booking.name || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
                (booking.email || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
                (booking.service || '').toLowerCase().includes(bookingSearch.toLowerCase())
            )
        );
    }, [bookings, bookingSearch]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://backend-project-2-cbk8.onrender.com/api/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Error fetching users');
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get('https://backend-project-2-cbk8.onrender.com/api/booking');
            setBookings(response.data);
        } catch (error) {
            toast.error('Error fetching bookings');
        }
    };

    const handleEmailSend = async () => {
        try {
            await axios.post(`https://backend-project-2-cbk8.onrender.com/api/users/${selectedUser._id}/send-email`, {
                content: emailContent,
            });
            toast.success('Email sent successfully');
            setShowEmailModal(false);
            setEmailContent('');
        } catch (error) {
            toast.error('Error sending email');
        }
    };

    const handleCancelBooking = async () => {
        try {
            await axios.post(`https://backend-project-2-cbk8.onrender.com/api/booking/${selectedBooking._id}/cancel`, {
                content: cancelContent,
            });
            toast.success('Booking cancelled and email sent to user');
            setShowCancelModal(false);
            setCancelContent('');
            fetchBookings(); // Refresh the bookings list
        } catch (error) {
            toast.error('Error cancelling booking');
        }
    };

    const handleOpenEmailModal = (user) => {
        setSelectedUser(user);
        setShowEmailModal(true);
    };

    const handleOpenCancelModal = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    return (
        <div className="container admin-panel">
            <h2 className="mt-5 mb-4 text-center">Admin Panel</h2>
            <div className="mb-4 text-center">
                <h4>Total Users: {users.length}</h4>
                <h4>Total Bookings: {bookings.length}</h4>
            </div>

            <div className="search-bar mb-4">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search Users"
                        aria-label="Search Users"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                </InputGroup>

            </div>

            <h4 className="text-primary">Users</h4>
            <Table striped bordered hover className="mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name || 'N/A'}</td>
                            <td>{user.email || 'N/A'}</td>
                            <td>{user.phone || 'N/A'}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenEmailModal(user)}>
                                    Send Email
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4 className="text-primary">Bookings</h4>
            <InputGroup>
                    <FormControl
                        placeholder="Search Bookings"
                        aria-label="Search Bookings"
                        value={bookingSearch}
                        onChange={(e) => setBookingSearch(e.target.value)}
                    />
                </InputGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Address</th>
                        <th>Pincode</th>
                       
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.name || 'N/A'}</td>
                            <td>{booking.email || 'N/A'}</td>
                            <td>{booking.phone || 'N/A'}</td>
                            <td>{booking.service || 'N/A'}</td>
                            <td>{booking.address || 'N/A'}</td>
                            <td>{booking.pincode || 'N/A'}</td>
                            
                            <td>{new Date(booking.date).toLocaleDateString() || 'N/A'}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleOpenCancelModal(booking)}>
                                    Cancel Booking
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Email to {selectedUser?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEmailSend}>
                        Send Email
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Booking for {selectedBooking?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Cancellation Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={cancelContent}
                                onChange={(e) => setCancelContent(e.target.value)}
                                placeholder="Sorry, your booking is canceled. Please call our customer care (1234567890)."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleCancelBooking}>
                        Cancel Booking
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default AdminPanel;
