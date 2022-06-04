import "./ProjectList.css";
import NewItem from "./NewItem.js";
import Item from "./Item.js";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

export default function ProjektListe() {
  const [arrayItems, setArrayItems] = useState([]);

  useEffect(() => {
    var arrayIt = [];
    axios
      .get("http://localhost:3001")
      .then((res) => {
        // saves objects from json in form of Items
        Object.keys(res.data).forEach(function (key) {
          var item = res.data[key];
          // TODO: check when database is connected
          arrayIt.push({
            content: item.text,
            date: item.date,
            title: item.title,
            id: item.id,
          });
        });
        setArrayItems(arrayIt);
      })
      .catch((err) => console.log(err));
  }, []);

  //renders Item so that it can be added in return
  const RenderItems = () =>
    arrayItems.map((item) => (
      <Col xl={3}>
        <Item
          text={item.content}
          date={item.date}
          title={item.title}
          id={item.id}
          onDelete={setArrayItems}
          allItems={arrayItems}
        ></Item>
      </Col>
    ));

  return (
    <div>
      <h1 style={{ padding: 50 }}>Meine Projekte</h1>
      <Container>
        <Row>
          <Col xs={3}>
            <NewItem></NewItem>
          </Col>
          <RenderItems />
        </Row>
      </Container>
    </div>
  );
}
