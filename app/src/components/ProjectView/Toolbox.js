import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { Point } from 'yfiles';
import { redNodeStyle } from './ProjectViewStyles';
import {graph, graphComponent} from './ProjectView';
import './Toolbox.css';
import saveNodes from './saveNodes.js';
import saveEdges from './saveEdges.js';
import { impulseEdgesToOneNode, IMPULSE_COUNT, layoutGraph, relabel } from '../impulseEdges/impulseEdges';
import { useState } from 'react';

export default function Toolbox(props) {
    const [layoutMode, setLayoutMode] = useState(0);

    const handleLayout = (layoutMode) => {
        return () => {
            layoutGraph(layoutMode)
            setLayoutMode(layoutMode)
        }
    };
    const handleSave = () => {
        saveNodes(props.project_id, props.nodes, props.nodesCallback);
        saveEdges(props.project_id, props.edges, props.edgesCallback);
    };
    const handleExport = () => {
        /* TODO */
    };
    const handleRelabel = () => {
        graphComponent.selection.selectedLabels.forEach(item => relabel(item))
    };
    const handleImpulseEdges = () => {
        graphComponent.selection.selectedNodes.forEach(item => impulseEdgesToOneNode(item, IMPULSE_COUNT))
        layoutGraph(layoutMode)
    };
    const handleColorChange = () => {
        /* TODO */
        if (graphComponent.selection.selectedNodes.size > 0){
            graph.createNodeAt(new Point(900,100), redNodeStyle)
        }
    };

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }}>
            <Card style={{ zIndex: 1000, width: '11rem' }}>
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
                    <Form.Label className="label-form">Select Layout:</Form.Label>
                    <DropdownButton 
                        className="buttons"
                        title={"current: " + layoutMode}
                        variant="secondary">
                        <Dropdown.Item onClick={handleLayout("tree")}>Tree</Dropdown.Item>
                        <Dropdown.Item onClick={handleLayout("organic")}>Organic</Dropdown.Item>
                        <Dropdown.Item onClick={handleLayout("circular")}>Circular</Dropdown.Item>
                    </DropdownButton>
                    
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
                </Card.Body>
            </Card>
        </Draggable>
    );
}