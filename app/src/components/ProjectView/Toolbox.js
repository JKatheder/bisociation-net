import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Draggable from 'react-draggable';
import Modal from 'react-bootstrap/Modal';
import { graph, graphComponent } from './ProjectView';
import Dropdown from 'react-bootstrap/Dropdown';
import { SvgExport, GraphComponent } from 'yfiles';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { 
    nodeColorDefault, 
    nodeColorStyle1,
    nodeColorStyle2, 
    redNodeStyle, 
    greenNodeStyle, 
    style } from './ProjectViewStyles';
import './Toolbox.css';
import saveGraph from './saveGraph.js';
import {
    impulseEdgesToOneNode,
    layoutGraph,
    relabel,
} from '../impulseEdges/impulseEdges';
import axios from 'axios';

export default function Toolbox(props) {
    const [show, setShow] = useState(false);
    const [newDes, setDes] = useState('');

    const defaultImpulseCount = 5;
    const [impulseCount, setImpulseCount] = useState(defaultImpulseCount);

    const [layoutMode, setLayoutMode] = useState('tree');
    const handleLayout = (layoutMode) => {
        return () => {
            layoutGraph(layoutMode);
            setLayoutMode(layoutMode);
        };
    };
    const handleSave = () => {
        saveGraph(props.project_id);
    };
    const handleExport = () => {
        const exportComponent = new GraphComponent();
        exportComponent.graph = graphComponent.graph;
        exportComponent.updateContentRect();

        const targetRect = exportComponent.contentRect;

        const exporter = new SvgExport({
            worldBounds: targetRect,
            scale: 1,
            encodeImagesBase64: true,
            inlineSvgImages: true,
        });

        exporter.cssStyleSheet = null;

        const svgElem = exporter.exportSvg(exportComponent);
        let fileContent = SvgExport.exportSvgString(svgElem);

        const element = document.createElement('a');
        const file = new Blob([fileContent], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = 'myFile.svg';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    const handleRelabel = () => {
        graphComponent.selection.selectedLabels.forEach((item) =>
            relabel(item)
        );
    };
    const handleImpulseEdges = () => {
        graphComponent.selection.selectedNodes.forEach((item) =>
            impulseEdgesToOneNode(item, impulseCount)
        );
        layoutGraph(layoutMode);
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
        // shorten description if longer than 1000 chars
        var shortDes = newDes;
        if (shortDes.length > 1000) {
            shortDes = shortDes.slice(0, 1000);
        }
        // if root: update project description
        if (graphComponent.currentItem === graph.nodes.toList().first()) {
            axios.put(`http://localhost:3001/projects/${props.project_id}`, {
                title: graphComponent.currentItem.labels.first().text,
                description: shortDes,
            });
        }
        graphComponent.currentItem.tag = shortDes;
    };

    const handleColorChange = () => {
        if (graphComponent.selection.selectedNodes.size > 0) {
            var i;
            for (i = 0; i < graphComponent.selection.selectedNodes.size; i++) {
                const t = graphComponent.selection.selectedNodes.elementAt(i);
                if (t.style.fill.hasSameValue(nodeColorDefault)) {
                    graph.setStyle(t, greenNodeStyle);
                } else if (t.style.fill.hasSameValue(nodeColorStyle1)) {
                    graph.setStyle(t, redNodeStyle);
                } else if (t.style.fill.hasSameValue(nodeColorStyle2)) {
                    graph.setStyle(t, style);
                }
            }
        }
    };
    const handleOnChange = (e) => {
        const minimum = 1;
        const maximum = 10;

        //check weather input is correct
        var currValue = parseInt(e.target.value); //afterwards: string input has type number

        if (currValue <= maximum && currValue >= minimum) {
            //everything alright, nothing to do
        } else if (currValue < minimum) {
            currValue = 1; //if number too small, add minimum edge count
        } else if (currValue > maximum) {
            currValue = maximum; //if number too big, add maximum edge count
        } else {
            currValue = defaultImpulseCount; //input was not a number, add default edge count
        }

        setImpulseCount(currValue);
    };

    return (
        <div className="positionCanvas">
            <Draggable defaultPosition={{ x: 0, y: 0 }}>
                <Card style={{ zIndex: 1000, width: '12rem' }}>
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
                        <Form.Label>Select Layout:</Form.Label>
                        <div>
                            <DropdownButton
                                className="buttons"
                                title={'current: ' + layoutMode}
                                variant="secondary"
                            >
                                <Dropdown.Item onClick={handleLayout('tree')}>
                                    Tree
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleLayout('organic')}>
                                    Organic
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleLayout('circular')}>
                                    Circular
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleRelabel}
                        >
                            Relabel
                        </Button>
                        <InputGroup
                            onChange={handleOnChange}
                            className="buttonAddImpulseEdges"
                        >
                            <Form.Label>Add Impulse Edges</Form.Label>
                            <Form.Control defaultValue="5" type="number" />
                            <Button
                                variant="outline-secondary"
                                className="buttonAdd"
                                onClick={handleImpulseEdges}
                            >
                                Add
                            </Button>
                        </InputGroup>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleColorChange}
                        >
                            Color Change
                        </Button>
                        <Button
                            className="buttons"
                            variant="secondary"
                            onClick={handleDescription}
                        >
                            Edit Description
                        </Button>
                    </Card.Body>
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
                                            onChange={(e) =>
                                                setDes(e.target.value)
                                            }
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
                                <Button
                                    variant="primary"
                                    onClick={handleDesSave}
                                >
                                    Save{' '}
                                </Button>{' '}
                            </Modal.Footer>{' '}
                        </Modal>{' '}
                    </div>
                </Card>
            </Draggable>
        </div>
    );
}
