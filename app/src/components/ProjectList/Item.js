import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropDown from 'react-bootstrap/DropDown';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Item(props) {
    const [showMenu, setShowMenu] = useState(false);
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

    const DropDownMenu = () => {
        return (
            <DropDown className="d-inline mx-2" autoClose="true">
                <DropDown.Menu show>
                    <DropDown.Header> Options </DropDown.Header>{' '}
                    <DropDown.Item> Edit </DropDown.Item>{' '}
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
        </Card>
    );
}
