import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { GraphComponent, License } from 'yfiles';
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';
import Toolbox from './Toolbox.js';

// Providing license information for the yfiles library
License.value = license;

export default function ProjectView() {
    let params = useParams();

    // The useRef hook is used to reference the graph-container DOM node directly in order to append the graphComponent canvas to it
    const graphContainer = useRef(null);

    // Create a new graphComponent object to render the graph canvas
    const graphComponent = new GraphComponent();

    // The canvas is rendered by the yfiles library, thus this is handled as a side effect
    // For documentation, see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // Append the graphComponent canvas to the graph container
        const currentgraphContainer = graphContainer.current;
        currentgraphContainer.appendChild(graphComponent.div);

        // Return cleanup function
        return () => {
            currentgraphContainer.removeChild(graphComponent.div);
        };
    });

    const RenderToolbox = () => {
        return (
            <Toolbox></Toolbox>
        )
    }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        Project {params.projectID}
                    </Navbar.Brand>
                    <Form>
                        <Link to={`/`} className="btn btn-success">back</Link>{' '}
                        <Button variant="secondary">Logout</Button>
                    </Form>
                </Container>
            </Navbar>
            <RenderToolbox />
            <div className="graph-container" ref={graphContainer}></div>
        </div>
    );
}
