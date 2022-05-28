import './ProjectList.css';
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { get } from 'express/lib/response';


export default function ProjektListe() {

    const [arrayItems, setArrayItems] = React.useState([]);

    React.useEffect(() => {
        var arrayIt = [];
        axios.get("http://localhost:3001")
        .then(res => {
            res.data.map((item) => {
                //hier sollte komponente dynamisch erzeugt werden 
                //irgendwas mit createElement...
                //arrayIt = [...]
            });
            setArrayItems(arrayIt);
        })
    }, []);

    //renders Item so that it can be added in return
    const renderItems = () => (arrayItems.map((item) => (<Col xl={3}>{item}</Col>)));
    
    return (
        <div>
            <h1 style={{ padding: 50 }} >Meine Projekte</h1>
            <Container>
                <Row>
                    <Col xs={3}>
                        <NewItem>

                        </NewItem>

                    </Col>
                    {renderItems()}
                </Row>
            </Container>
        </div>
    )
} 

//erstellt Item mit den 3 Eingaben Text, Datum und Name 
const Item = ({ text, date, title, id}) => {
    //fügt ... hinzu falls Text zu lang ist 
    if (text.length > 10) {
        text = text.substring(0, 20) + "...";
    }
    return (
    <Card border="border border-dark" className="card h-100">
            <Card.Body>
                <Row>
                    <Col xs={11}>
                        <Card.Title>{title} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                        <Card.Text>
                            {text}
                        </Card.Text>
                    </Col>
                    <Col xs={1} style={{ paddingRight: -50 }}>
                        <div id = "Event1" className='justify-content-end bi bi-three-dots-vertical'></div>
                    </Col>
                </Row>
                <div class="d-grid">
                    <Link to={`/project/${id}`} className="btn btn-secondary">Öffnen</Link>
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
                            <Button variant="btn btn-secondary" >+</Button>
                            <p>Neues Projekt</p>
                        </div>
                    </Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>);

// hier Code für ListView der Projekte, in ProjectList.css Format definieren
function Test() {
    return <h2> Project 1 </h2>;
}

