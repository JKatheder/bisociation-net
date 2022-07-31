import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function EditItem(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setID] = useState(-1);
    const [date, setDate] = useState('');

    const handleClose = () => {
        props.setShow(false);
    };
    const handleSave = () => {
        props.setShow(false);
        props.update({ id: id, title: title, description: description, date: date });
        const NewTitleDesc = { title: title, description: description };
        axios

            .put(`http://localhost:3001/projects/${id}`, NewTitleDesc)
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setTitle(props.allItems.title);
        setDescription(props.allItems.description);
        setID(props.allItems.id);
        setDate(props.allItems.date)
    }, []);

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label> Titel </Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Description </Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            as="textarea"
                            rows={3}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
