import './ProjectList.css';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DateString from './Date.js';

//erstellt den Button für ein neues Item
export default function NewItem(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // TODO: save only with set title
    // TODO: fix id system when database is connected
    const handleSave = () => {
        setShow(false);
        var all_ids = props.prevItems.map((item) => item.id);
        var new_id = Math.max(...all_ids) + 1;
        // change title if empty
        var new_title = title;
        if (new_title === '') {
            new_title = 'Project ' + new_id;
        }
        console.log(title);
        const newItems = [
            ...props.prevItems,
            {
                content: description,
                title: new_title,
                date: DateString(),
                id: new_id,
            },
        ];
        props.onSave(newItems);
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
