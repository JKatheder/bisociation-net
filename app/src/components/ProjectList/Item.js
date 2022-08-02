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
    const [ProjectData, setProjectData] = useState({});

    //sets state to project data that wants to be edited
    useEffect(() => {
        setProjectData({
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

    //sets state when edited data is saved
    const setStateNew = (NewProjectDate) => {
        setProjectData(NewProjectDate);
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

    //shortens description if its over 20 symbols long
    const shortDes = (txt) => {
        if (txt !== undefined && txt !== null) {
            if (txt.length > 10) {
                return txt.substring(0, 20) + '...';
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
                        <Card.Title> {ProjectData.title} </Card.Title>{' '}
                        <Card.Subtitle className="mb-2 text-muted">
                            {' '}
                            {ProjectData.date}{' '}
                        </Card.Subtitle>{' '}
                        <Card.Text>
                            {' '}
                            {shortDes(ProjectData.description)}{' '}
                        </Card.Text>{' '}
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
                        className="btn button-color"
                    >
                        Open{' '}
                    </Link>{' '}
                </div>{' '}
            </Card.Body>{' '}
            {show ? (
                <EditItem
                    allItems={ProjectData}
                    update={setStateNew}
                    setShow={setShow}
                    show={show}
                />
            ) : null}
        </Card>
    );
}
