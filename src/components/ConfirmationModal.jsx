import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ show, handleClose, handleConfirm, title, body }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Confirm Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;