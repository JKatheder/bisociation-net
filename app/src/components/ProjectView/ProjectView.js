import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { GraphComponent,
    License, 
    ShapeNodeStyle,
    GraphEditorInputMode,
    Size, 
    Point } from 'yfiles';
import { configureContextMenu } from './CreateContextMenu.js';
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';

// Providing license information for the yfiles library
License.value = license;

// Initialize graphComponent and ContextMenu
const graphComponent = new GraphComponent();
const graph = graphComponent.graph;
graphComponent.inputMode = new GraphEditorInputMode()


//Style:
const greenNodeStyle = new ShapeNodeStyle({
  shape: 'ellipse',
  fill: 'green',
  stroke: 'transparent'
})
graph.nodeDefaults.size = new Size(150, 150)

//Graph methods: not used right now
//Adds a node to the graph at (x,y) with label 'Label'
function generateNewNode(x, y, input_label) {
  const node = graph.createNodeAt(new Point(x,y), greenNodeStyle)
  graph.addLabel(node, input_label)
  return node
}

// Construct a some sample nodes:
const node0 = generateNewNode(700,200, 'PROJECT-X')
const node1 = generateNewNode(200,700, 'Node1')
const node2 = generateNewNode(800,700, 'Node2')
graph.createEdge(node0, node1)
graph.createEdge(node0, node2)


export default function ProjectView() {
  
    let params = useParams();

    // The useRef hook is used to reference the graph-container DOM node directly in order to append the graphComponent canvas to it
    const graphContainer = useRef(null);

    // The canvas is rendered by the yfiles library, thus this is handled as a side effect
    // For documentation, see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // Append the graphComponent canvas to the graph container
        const currentgraphContainer = graphContainer.current;
        currentgraphContainer.appendChild(graphComponent.div);
        configureContextMenu(graphComponent);

        // Return cleanup function
        return () => {
            currentgraphContainer.removeChild(graphComponent.div);
            //contextMenu.clearItems()
        };
    });

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        Project {params.projectID}
                    </Navbar.Brand>
                    <Form>
                        <Link to={`/`} className="btn btn-success">Back</Link>{' '}
                        <Button variant="secondary">Logout</Button>
                    </Form>
                </Container>
            </Navbar>
            <div className="graph-container" ref={graphContainer}></div>
        </div>
    );
}
