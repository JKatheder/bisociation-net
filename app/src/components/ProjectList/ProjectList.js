import './ProjectList.css';
import NewItem from './NewItem.js';
import Item from './Item.js';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default function ProjectList() {
    const [arrayItems, setArrayItems] = useState([]);

    useEffect(() => {
        var arrayIt = [];
        axios
            .get('http://localhost:3001/projects')
            .then((res) => {
                // saves objects from json in form of Items
                res.data.map((item) =>
                    arrayIt.push({
                        description: item.description,
                        date: item.date,
                        title: item.title,
                        id: item.project_id,
                    })
                );
                setArrayItems(arrayIt);
            })
            .catch((err) => console.log(err));
    }, []);

    //renders Item so that it can be added in return
    const RenderItems = () =>
        arrayItems.map((item) => (
            <div className="col col-lg-3" key={item.id}>
                <Item
                    text={item.description}
                    date={item.date}
                    title={item.title}
                    id={item.id}
                    onDelete={setArrayItems}
                    allItems={arrayItems}
                ></Item>{' '}
            </div>
        ));

    // creates Button for new Item
    const RenderNewItem = () => {
        return (
            <NewItem onSave={setArrayItems} prevItems={arrayItems}>
                {' '}
            </NewItem>
        );
    };

    return (
        <div>
            <h1 style={{ padding: 50 }}> My Projects </h1>{' '}
            <Container>
                <Row>
                    <Col xs={3}>
                        <RenderNewItem />
                    </Col>{' '}
                    <RenderItems />
                </Row>{' '}
            </Container>{' '}
        </div>
    );
}
