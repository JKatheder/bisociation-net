import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { Point, Fill, ShapeNodeStyle } from 'yfiles';
import { greenNodeStyle, redNodeStyle, style } from './ProjectViewStyles';
import ProjectView, {graph, graphComponent, generateNewNode, node1} from './ProjectView';
import './Toolbox.css';

export default function Toolbox() {
    const handleSave = () => {
        /* TODO */
    };
    const handleExport = () => {
        /* TODO */
    };
    const handleAutoLayout = () => {
        /* TODO */
    };
    var saveIfColored = new Array(graphComponent.selection.selectedNodes.size).fill(0)
    const handleColorChange = () => {
        if (graphComponent.selection.selectedNodes.size > 0){ 
            var i
            for (i=0; i < graphComponent.selection.selectedNodes.size; i++) {
                const t = graphComponent.selection.selectedNodes.elementAt(i)
                if(saveIfColored[i]){ //hsah.equals(style)){
                    graph.setStyle(t, style)   
                    saveIfColored[i] = 0
                } else {
                    graph.setStyle(t, greenNodeStyle)
                    saveIfColored[i] = 1
                }
            }
        }
    };
    const handleRelabel = () => {
        /* TODO */
    };

    return (
        <Draggable
            defaultPosition={{ x: 0, y: 0 }}
        >
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
                        onClick={handleColorChange}
                    >
                        Color-Change
                    </Button>
                    <Button
                        className="buttons"
                        variant="secondary"
                        onClick={handleRelabel}
                    >
                        Relabel
                    </Button>
                </Card.Body>
            </Card>
        </Draggable>
    );
}