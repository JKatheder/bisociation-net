import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropDown from 'react-bootstrap/DropDown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditItem from './EditItem';

export default function Item(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [editId, setEditId] = useState(false);
    const [show, setShow] = useState(false);
    const [arr, setArr] = useState({});

    useEffect(() => {
        setArr({
            title: props.title,
            description: props.text,
            id: props.id,
            date: props.date,
        });
    }, []);

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

    const setVArr = (vArr) => {
        setArr(vArr);
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

    const shortDes = (txt) => {
        if (txt !== undefined && txt !== null) {
            if (txt.length > 10) {
                return txt.substring(0, 20);
            } else {
                return txt;
            }
        }
    };

    return (
        <Card border="border border-dark" className="card h-100">
            <Card.Body>
                <Row>
                    <Col xs={11}>
                        <Card.Title> {arr.title} </Card.Title>{' '}
                        <Card.Subtitle className="mb-2 text-muted">
                            {' '}
                            {arr.date}{' '}
                        </Card.Subtitle>{' '}
                        <Card.Text> {shortDes(arr.description)} </Card.Text>{' '}
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
            {show ? (
                <EditItem
                    allItems={arr}
                    argh={setVArr}
                    setShow={setShow}
                    show={show}
                />
            ) : null}
        </Card>
    );
}
