import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { redNodeStyle, greenNodeStyle, style } from './ProjectViewStyles';
import { graph, graphComponent } from './ProjectView';
import './Toolbox.css';
import saveGraph from './saveGraph.js';
import {
    impulseEdgesToOneNode,
    IMPULSE_COUNT,
    layoutGraph,
    relabel,
} from '../impulseEdges/impulseEdges';

export default function Toolbox(props) {
    const [show, setShow] = useState(false);
    const [newDes, setDes] = useState(null);

    const handleSave = () => {
        saveGraph(props.project_id);
    };
    const handleExport = () => {};
    const handleAutoLayout = () => {
        layoutGraph();
    };
    const handleRelabel = () => {
        graphComponent.selection.selectedLabels.forEach((item) =>
            relabel(item)
        );
    };
    const handleImpulseEdges = () => {
        graphComponent.selection.selectedNodes.forEach((item) =>
            impulseEdgesToOneNode(item, IMPULSE_COUNT)
        );
        layoutGraph();
    };
    const handleDescription = () => {
        if (graphComponent.currentItem) {
            setShow(true);
            setDes(graphComponent.currentItem.tag);
        }
    };
    const handleDesClose = () => setShow(false);
    const handleDesSave = () => {
        setShow(false);
        graphComponent.currentItem.tag = newDes;
    };

    //0="original Color", 1="green" and 2="red"
    var saveIfColored = new Array(
        graphComponent.selection.selectedNodes.size
    ).fill(0);
    const handleColorChange = () => {
        if (graphComponent.selection.selectedNodes.size > 0) {
            var i;
            for (i = 0; i < graphComponent.selection.selectedNodes.size; i++) {
                const t = graphComponent.selection.selectedNodes.elementAt(i);
                if (saveIfColored[i] === 0) {
                    graph.setStyle(t, greenNodeStyle);
                    saveIfColored[i] = 1;
                } else if (saveIfColored[i] === 1) {
                    graph.setStyle(t, redNodeStyle);
                    saveIfColored[i] = 2;
                } else {
                    graph.setStyle(t, style);
                    saveIfColored[i] = 0;
                }
            }
        }
    };

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }}>
            <Card style={{ zIndex: 1000, width: '10rem' }}>
                <div className="positionCanvas">
                    <Card.Body>
                        <Card.Title>Toolbox</Card.Title>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleExport}
                        >
                            Export
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleAutoLayout}
                        >
                            Auto-Layout
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleRelabel}
                        >
                            Relabel
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleImpulseEdges}
                        >
                            Add impulse edges
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleColorChange}
                        >
                            Color-Change
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleDescription}
                        >
                            Edit description
                        </Button>
                    </Card.Body>
                </div>
                <div>
                    <Modal show={show} onHide={handleDesClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> Edit Description </Modal.Title>{' '}
                        </Modal.Header>{' '}
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label> Description </Form.Label>{' '}
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newDes}
                                        onChange={(e) => setDes(e.target.value)}
                                    />{' '}
                                </Form.Group>{' '}
                            </Form>{' '}
                        </Modal.Body>{' '}
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleDesClose}
                            >
                                Close{' '}
                            </Button>{' '}
                            <Button variant="primary" onClick={handleDesSave}>
                                Save{' '}
                            </Button>{' '}
                        </Modal.Footer>{' '}
                    </Modal>{' '}
                </div>
            </Card>
        </Draggable>
    );
}
