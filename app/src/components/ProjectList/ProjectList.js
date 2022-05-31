import './ProjectList.css';
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import DropDown from 'react-bootstrap/DropDown'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function ProjektListe() {

    const [arrayItems, setArrayItems] = React.useState([]);

    React.useEffect(() => {
        var arrayIt = [];
        axios.get("http://localhost:3001")
        .then((res) => {
            // saves objects from json in form of Items
            Object.keys(res.data).forEach(function(key) {
                var item = res.data[key]
                // TODO: check when database is connected
                arrayIt.push({content: item.text, date:item.date, title:item.title, id:item.id})
            });
            setArrayItems(arrayIt)
        })
        .catch(err => console.log(err))
    }, []);

    const CreateNewItem = () => {

        // TODO: user input
        setArrayItems((prev) => [
            ...prev,
            <Item text="h" date="h" title="h" id="h"></Item>
        ]);
    };


    //erstellt Item mit den 3 Eingaben Text, Datum und Name 
    const Item = (props) => {
        const [showMenu, setShowMenu] = React.useState(false)
        //fügt ... hinzu falls Text zu lang ist 
        var text = props.text;
        if (text.length > 10) {
            text = text.substring(0, 20) + "...";
        }
        const deleteProject = () => {
            // TODO
            props.onDelete(props.allItems.filter((items) =>  items.id !== props.id));
        }

        const DropDownMenu = () => {
            return(
                <DropDown className="d-inline mx-2" autoClose="true">
                    <DropDown.Menu show>
                        <DropDown.Header>Options</DropDown.Header>
                        <DropDown.Item>Edit</DropDown.Item>
                        <DropDown.Item onClick={deleteProject} >Delete</DropDown.Item>
                    </DropDown.Menu>
                </DropDown>);
        }

        return (
        <Card border="border border-dark" className="card h-100">
            <Card.Body>
                <Row>
                    <Col xs={11}>
                        <Card.Title>{props.title} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.date}</Card.Subtitle>
                        <Card.Text>
                            {text}
                        </Card.Text>
                    </Col>
                    <Col xs={1} style={{ paddingRight: -50 }}>
                        <span onClick= {() => setShowMenu(!showMenu)} className='justify-content-end bi bi-three-dots-vertical'></span>
                        {showMenu ? <DropDownMenu /> : null}
                    </Col>
                </Row>
                <div className="d-grid">
                    <Link to={`/project/${props.id}`} className="btn btn-secondary">Öffnen</Link>
                </div>
            </Card.Body>
        </Card>);
    }

    //erstellt den Button für ein neues Item
    const NewItem = () => (
        <Card border="border border-dark" className="card h-100" >
            <Card.Body>
                <Row>
                    <Col>
                    <Card.Text>
                        <div style={{ textAlign: "center", margin: "auto"}}>
                            <Button variant="btn btn-secondary" onClick={CreateNewItem}>+</Button>
                            <p>Neues Projekt</p>
                        </div>
                    </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>);

    //renders Item so that it can be added in return
    const RenderItems = () => (arrayItems.map((item) => (<Col xl={3}><Item text={item.content} date={item.date} title={item.title} id={item.id} onDelete={setArrayItems} allItems={arrayItems}></Item></Col>)));


    return (
        <div>
            <h1 style={{ padding: 50 }} >Meine Projekte</h1>
            <Container>
                <Row>
                    <Col xs={3}>
                        <NewItem></NewItem>
                    </Col>
                    <RenderItems />
                </Row>
            </Container>
        </div>
    )
}
