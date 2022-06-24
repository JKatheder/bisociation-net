import './ProjectList.css';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

//erstellt den Button für ein neues Item
export default function NewItem(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // saves new project to database and puts into state
    const handleSave = () => {
        setShow(false);
        axios
            .post('http://localhost:3001/projects', {
                title: title,
                description: description,
            })
            .then((res) => {
                console.log(res.data.rows[0]);
                var item = res.data.rows[0];
                props.onSave([
                    {
                        content: item.description,
                        title: item.title,
                        date: item.date,
                        id: item.project_id,
                    },
                    ...props.prevItems,
                ]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Card border="border border-dark" className="card h-100">
                <Card.Body>
                    <div
                        style={{
                            textAlign: 'center',
                            margin: 'auto',
                        }}
                    >
                        <Button
                            variant="btn btn-secondary"
                            onClick={handleShow}
                        >
                            +
                        </Button>{' '}
                        <p> New Project </p>{' '}
                    </div>{' '}
                </Card.Body>{' '}
            </Card>{' '}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Create New Project </Modal.Title>{' '}
                </Modal.Header>{' '}
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label> Titel </Form.Label>{' '}
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />{' '}
                        </Form.Group>{' '}
                        <Form.Group>
                            <Form.Label> Description </Form.Label>{' '}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />{' '}
                        </Form.Group>{' '}
                    </Form>{' '}
                </Modal.Body>{' '}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close{' '}
                    </Button>{' '}
                    <Button variant="primary" onClick={handleSave}>
                        Save{' '}
                    </Button>{' '}
                </Modal.Footer>{' '}
            </Modal>{' '}
        </div>
    );
}
