import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { Fill } from 'yfiles';
import { redNodeStyle , greenNodeStyle, style} from './ProjectViewStyles';
import {graph, graphComponent} from './ProjectView';
import './Toolbox.css';
import { useState } from 'react';
import saveGraph from './saveGraph.js';
import {
    impulseEdgesToOneNode,
    IMPULSE_COUNT,
    layoutGraph,
    relabel,
} from '../impulseEdges/impulseEdges';

export default function Toolbox(props) {
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
            impulseEdgesToOneNode(item, IMPULSE_COUNT)
        );
        layoutGraph(layoutMode);
    };

    const handleColorChange = () => {
        if (graphComponent.selection.selectedNodes.size > 0){ 
            var i
            for (i=0; i < graphComponent.selection.selectedNodes.size; i++) {
                const t = graphComponent.selection.selectedNodes.elementAt(i)
                if(t.style.fill.hasSameValue(Fill.DARK_KHAKI)) {
                    graph.setStyle(t, greenNodeStyle) 
                }else if(t.style.fill.hasSameValue(Fill.GREEN)) {
                    graph.setStyle(t, redNodeStyle)
                }else if(t.style.fill.hasSameValue(Fill.DARK_RED)) {
                    graph.setStyle(t, style)
                }
            }
        }
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
                        <Form.Label 
                            className="label-form"
                        >
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
        </div>
    );
}
