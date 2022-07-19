import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropDown from 'react-bootstrap/DropDown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Item(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [editId, setEditId] = useState(false);
    const [show, setShow] = useState(false);

    //adds ... if text is to long
    var text = props.text;
    if (text.length > 10) {
        text = text.substring(0, 20) + '...';
    }

    const deleteProject = () => {
        // delete in database
        axios
            .delete(`http://localhost:3001/projects/${props.id}`)
            .catch((error) => {
                console.log(error);
            });
        // delete in current state
        props.onDelete(props.allItems.filter((items) => items.id !== props.id));
    };

    const EditItem = (props) => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [id, setID] = useState(-1);

        const handleClose = () => {
            setShow(false);
        };
        const handleSave = () => {
            setShow(false);
            const NewTitleDesc = { title: title, description: description };
            axios
                // update in database
                .put(`http://localhost:3001/projects/${id}`, NewTitleDesc)
                .then((response) =>
                    this.setState({ updatedAt: response.data.updatedAt })
                );
        };

        useEffect(() => {
            props.allItems.forEach((elem) => {
                if (editId === elem.id) {
                    setTitle(elem.title);
                    setDescription(elem.content);
                    setID(elem.id);
                }
            });
        }, []);

        //console.log(show);

        //setDescription(description);
        return (
            <Modal show={show} onHide={handleClose}>
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
    };

    const DropDownMenu = () => {
        return (
            <DropDown className="d-inline mx-2" autoClose="true">
                <DropDown.Menu show>
                    <DropDown.Header> Options </DropDown.Header>{' '}
                    <DropDown.Item
                        onClick={() => {
                            setShow(true);
                            setEditId(props.id);
                        }}
                    >
                        {' '}
                        Edit{' '}
                    </DropDown.Item>{' '}
                    <DropDown.Item onClick={deleteProject}>
                        Delete{' '}
                    </DropDown.Item>{' '}
                </DropDown.Menu>{' '}
            </DropDown>
        );
    };

    return (
        <Card border="border border-dark" className="card h-100">
            <Card.Body>
                <Row>
                    <Col xs={11}>
                        <Card.Title> {props.title} </Card.Title>{' '}
                        <Card.Subtitle className="mb-2 text-muted">
                            {' '}
                            {props.date}{' '}
                        </Card.Subtitle>{' '}
                        <Card.Text> {text} </Card.Text>{' '}
                    </Col>{' '}
                    <Col xs={1} style={{ paddingRight: -50 }}>
                        <span
                            onClick={() => setShowMenu(!showMenu)}
                            className="justify-content-end bi bi-three-dots-vertical"
                        ></span>{' '}
                        {showMenu ? <DropDownMenu /> : null}{' '}
                    </Col>{' '}
                </Row>{' '}
                <div className="d-grid">
                    <Link
                        to={`/project/${props.id}`}
                        className="btn btn-secondary"
                    >
                        Open{' '}
                    </Link>{' '}
                </div>{' '}
            </Card.Body>{' '}
            {show ? <EditItem allItems={props.allItems} /> : null}
        </Card>
    );
}
