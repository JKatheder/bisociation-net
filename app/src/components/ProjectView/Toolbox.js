import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Draggable from 'react-draggable';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { redNodeStyle , greenNodeStyle, style} from './ProjectViewStyles';
import {graph, graphComponent} from './ProjectView';
import './Toolbox.css';
import { useState } from 'react';
import saveGraph from './saveGraph.js';
import {
    impulseEdgesToOneNode,
    layoutGraph,
    relabel,
} from '../impulseEdges/impulseEdges';

export default function Toolbox(props) {

    const defaultImpulseCount =  5;
    const [impulseCount, setImpulseCount] = useState(defaultImpulseCount);

    const [layoutMode, setLayoutMode] = useState("tree");
    const handleLayout = (layoutMode) => {
        return () => {
            layoutGraph(layoutMode)
            setLayoutMode(layoutMode)
        }
    };
    const handleSave = () => {
        saveGraph(props.project_id);
    };
    const handleExport = () => {

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

    //0="original Color", 1="green" and 2="red"
    var saveIfColored = new Array(graphComponent.selection.selectedNodes.size).fill(0)
    const handleColorChange = () => {
        if (graphComponent.selection.selectedNodes.size > 0){ 
            var i
            for (i=0; i < graphComponent.selection.selectedNodes.size; i++) {
                const t = graphComponent.selection.selectedNodes.elementAt(i)
                if(saveIfColored[i] === 0){
                    graph.setStyle(t, greenNodeStyle) 
                    saveIfColored[i] = 1
                }else if(saveIfColored[i] === 1) {
                    graph.setStyle(t, redNodeStyle)
                    saveIfColored[i] = 2
                }else {
                    graph.setStyle(t, style)
                    saveIfColored[i] = 0
                }
            }
        }
    };
    const handleOnChange = (e) => {
        const minimum = 1;
        const maximum = 10;

        //check weather input is correct
        var currValue = parseInt(e.target.value); //afterwards: string input has type number

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
                        <Form.Label>
                            Select Layout:
                        </Form.Label>
                        <DropdownButton 
                            className="buttons"
                            title={"current: " + layoutMode}
                            variant="secondary"
                        >
                            <Dropdown.Item onClick={handleLayout("tree")}>
                                Tree
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLayout("organic")}>
                                Organic
                                </Dropdown.Item>
                            <Dropdown.Item onClick={handleLayout("circular")}>
                                Circular
                            </Dropdown.Item>
                        </DropdownButton>
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
        </div>
    );
}