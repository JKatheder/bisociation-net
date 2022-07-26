import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { GraphComponent, License, GraphEditorInputMode, Size } from 'yfiles';
import { configureContextMenu } from './CreateContextMenu.js';
import { layoutGraph } from '../impulseEdges/impulseEdges';
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';
import { style, decorateSelection } from './ProjectViewStyles.js';
import Toolbox from './Toolbox.js';
import loadGraph from './loadGraph.js';
import saveGraph from './saveGraph.js';

// Providing license information for the yfiles library
License.value = license;

// Initialize graphComponent and ContextMenu
export const graphComponent = new GraphComponent();
export const graph = graphComponent.graph;
graphComponent.inputMode = new GraphEditorInputMode();

//Not in use right now, might be useful as reference
//Adds a node to the graph at (x,y) with label 'Label'
// function generateNewNode(x, y, input_label, graph) {
//     const node = graph.createNodeAt(new Point(x, y));
//     graph.addLabel(node, input_label);
//     return node;
// }

//Style:
const nodeDefaults = graph.nodeDefaults;
nodeDefaults.style = style;
graph.nodeDefaults.size = new Size(150, 150);
decorateSelection(graphComponent);

// show description on hover
graphComponent.inputMode.toolTipItems = GraphItemTypes.NODE;
graphComponent.inputMode.addQueryItemToolTipListener((src, args) => {
    if (args.handled) {
        // A tooltip has already been assigned -> nothing to do
        return;
    }
    // We can safely cast here because we set ToolTipItems to only Node
    const hitNode = args.item;
    if (hitNode) {
        args.toolTip = hitNode.tag;
        args.handled = true;
    }
});
// duration to show tooltip/description in seconds
graphComponent.inputMode.mouseHoverInputMode.duration = 10000;
// show description under cursor
graphComponent.inputMode.mouseHoverInputMode.toolTipLocationOffset = new Point(
    0,
    20
);

var loaded = false;
export default function ProjectView() {
    let params = useParams();

    if (!loaded) {
        loadGraph(params.projectID);
        loaded = true;
    }

    // The useRef hook is used to reference the graph-container DOM node directly in order to append the graphComponent canvas to it
    const graphContainer = useRef(null);

    // The canvas is rendered by the yfiles library, thus this is handled as a side effect
    // For documentation, see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // Append the graphComponent canvas to the graph container
        const currentgraphContainer = graphContainer.current;
        currentgraphContainer.appendChild(graphComponent.div);
        configureContextMenu(graphComponent);
        layoutGraph('tree');

        // Return cleanup function
        return () => {
            currentgraphContainer.removeChild(graphComponent.div);
        };
    });

    const RenderToolbox = () => {
        return <Toolbox project_id = { params.projectID } > < /Toolbox>;
    };

    const handleBack = () => {
        // save before exit
        saveGraph(params.projectID);
        loaded = false;
    };

    return ( <
        div >
        <
        Navbar bg = "light"
        variant = "light" >
        <
        Container >
        <
        Navbar.Brand href = "#home" >
        Project { params.projectID } { ' ' } <
        /Navbar.Brand>{' '} <
        Form >
        <
        Link to = { `/` }
        onClick = { handleBack }
        className = "btn btn-success" >
        Back <
        /Link>{' '} <
        Button variant = "secondary" > Logout < /Button> <
        /Form> <
        /Container>{' '} <
        /Navbar>{' '} <
        div className = "card" >
        <
        RenderToolbox / >
        <
        /div> <
        div className = "graph-container"
        ref = { graphContainer } > { ' ' } <
        /div>{' '} <
        /div>
    );
}