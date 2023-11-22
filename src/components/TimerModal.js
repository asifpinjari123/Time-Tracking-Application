import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const TimerModal = ({ onSave, onCancel, editedTask }) => {
  const [title, setTitle] = useState(editedTask ? editedTask.title : '');
  const [description, setDescription] = useState(editedTask ? editedTask.description : '');
  const [validationError, setValidationError] = useState(null);

  const handleSave = () => {
    // Basic form validation
    if (!title.trim() || !description.trim()) {
      setValidationError('Please fill out all fields.');
      return;
    }

    // If validation passes, save the task
    onSave({ title, description });
    setTitle('');
    setDescription('');
    setValidationError(null);
  };

  useEffect(() => {
    setTitle(editedTask ? editedTask.title : '');
    setDescription(editedTask ? editedTask.description : '');
  }, [editedTask]);

  const handleCancel = () => {
    setValidationError(null);
    onCancel();
  };

  return (
    <Modal show={true} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{editedTask ? 'Edit Task' : 'Save Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {validationError && <Alert variant="danger">{validationError}</Alert>}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {editedTask ? 'Save Changes' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimerModal;
