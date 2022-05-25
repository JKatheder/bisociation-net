import './ProjectList.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function ProjektListe() {
    return (
        <div>
            <h1 style={{ padding: 50 }}>Meine Projekte</h1>
            <Container>
                <Row>
                    <Col xs={3}>
                        <NewItem></NewItem>
                    </Col>
                    <Col xs={3}>
                        <Item
                            text="text1 ist viel zu lange daher wird das ersetzt..."
                            date="02.03.22"
                            title="Card 1"
                            id={1}
                        ></Item>
                    </Col>
                    <Col xs={3}>
                        <Item
                            text="text2"
                            date="02.03.22"
                            title="Card 2: Projekt"
                            id={2}
                        ></Item>
                    </Col>
                    <Col xs={3}>
                        <Item
                            text="text3"
                            date="02.03.22"
                            title="Card 3"
                            id={3}
                        ></Item>
                    </Col>
                    <Col xs={3}>
                        <Item
                            text="text4"
                            date="02.04.22"
                            title="Card 4"
                            id={4}
                        ></Item>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

//erstellt Item mit den 3 Eingaben Text, Datum und Name
const Item = ({ text, date, title, id }) => {
    //fügt ... hinzu falls Text zu lang ist
    if (text.length > 10) {
        text = text.substring(0, 20) + '...';
    }
    return (
        <Card border="border border-dark" class="card h-100">
            <Card.Body>
                <Row>
                    <Col xs={11}>
                        <Card.Title>{title} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {date}
                        </Card.Subtitle>
                        <Card.Text>{text}</Card.Text>
                    </Col>
                    <Col item xs={1} style={{ paddingRight: -50 }}>
                        <div
                            id="Event1"
                            class="justify-content-end bi bi-three-dots-vertical"
                        ></div>
                    </Col>
                </Row>
                <div class="d-grid">
                    <Link to={`/project/${id}`} className="btn btn-secondary">
                        Öffnen
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

//erstellt den Button für ein neues Item
const NewItem = () => (
    <Card border="border border-dark" class="card h-100">
        <Card.Body>
            <Row>
                <Col>
                    <Card.Text>
                        <div style={{ textAlign: 'center', margin: 'auto' }}>
                            <Button variant="btn btn-secondary">+</Button>
                            <p>Neues Projekt</p>
                        </div>
                    </Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>
);
// hier Code für ListView der Projekte, in ProjectList.css Format definieren
function Test() {
    return <h2> Project 1 </h2>;
}
