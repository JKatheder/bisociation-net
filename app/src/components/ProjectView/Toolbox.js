import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Draggable from 'react-draggable';
import { Point } from 'yfiles';
import { redNodeStyle } from './ProjectViewStyles';
import {graph, graphComponent} from './ProjectView';
import './Toolbox.css';
import saveNodes from './saveNodes.js';
import saveEdges from './saveEdges.js';
import { impulseEdgesToOneNode, layoutGraph, relabel } from '../impulseEdges/impulseEdges';
import { useState } from 'react';

export default function Toolbox(props) {

    const defaultImpulseCount =  5;
    const [impulseCount, setImpulseCount] = useState(defaultImpulseCount);

    const handleSave = () => {
        saveNodes(props.project_id, props.nodes, props.nodesCallback);
        saveEdges(props.project_id, props.edges, props.edgesCallback);
    };
    const handleExport = () => {
        /* TODO */
    };
    const handleAutoLayout = () => {
        layoutGraph()
    };
    const handleRelabel = () => {
        graphComponent.selection.selectedLabels.forEach(item => relabel(item))
    };
    const handleImpulseEdges = () => {
        graphComponent.selection.selectedNodes.forEach(item => impulseEdgesToOneNode(item, impulseCount))
        layoutGraph()
    };
    const handleColorChange = () => {
        /* TODO */
        if (graphComponent.selection.selectedNodes.size > 0){
            graph.createNodeAt(new Point(900,100), redNodeStyle)
        }
    };
    const handleOnChange = (e) => {
        var currValue;
        const minimum = 1;
        const maximum = 10;

        //check weather input is correct
        currValue = parseInt(e.target.value); //afterwards: string input has type number

        if (currValue <= maximum && currValue >= minimum){
            //everything alright, nothing to do
        } else if(currValue < minimum) {
            currValue = 1; //if number too small, add minimum edge count
        } else if(currValue > maximum) {
            currValue = maximum; //if number too big, add maximum edge count
        } else {
            currValue = defaultImpulseCount; //input was not a number, add default edge count
        }
        
        setImpulseCount(currValue);
        
    };

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }}>
            <Card style={{ zIndex: 1000, width: '10rem' }}>
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
                    <InputGroup
                        onChange={handleOnChange}
                        className="buttons">
                        <Form.Label>Add impulse edges</Form.Label>
                        <Form.Control 
                            defaultValue="5"
                            type="number"
                        />
                        <Button 
                            variant="outline-secondary"
                            onClick={handleImpulseEdges} 
                            >
                            add
                        </Button>
                    </InputGroup>
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