import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsAndConditionsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Important Message:</strong> Our service operates from 9 AM to 6 PM.</p>
        <p>Terms and Conditions: By using our services, you agree to the following terms and conditions. Your use of our services is subject to your acceptance of and compliance with these terms...</p>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsAndConditionsModal;
