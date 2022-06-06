import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { GraphComponent,
    License, 
    ICommand,
    ShapeNodeStyle,
    GraphEditorInputMode,
    INode,
    Size, 
    Point } from 'yfiles';
import ContextMenu from './ContextMenu.js'
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';

// Providing license information for the yfiles library
License.value = license;

// Initialize graphComponent and ContextMenu
const graphComponent = new GraphComponent();
const graph = graphComponent.graph;
graphComponent.inputMode = new GraphEditorInputMode()
const contextMenu = new ContextMenu(graphComponent);
const inputMode = graphComponent.inputMode;

//Styles:
const greenNodeStyle = new ShapeNodeStyle({
  shape: 'ellipse',
  fill: 'green',
  stroke: 'transparent'
})
graph.nodeDefaults.size = new Size(100, 100)


//Graph methods: not used right now
//Adds a node to the graph at (x,y)
function generateNewNode(x, y) {
  let label = '(' + x.toString() + ',' + y.toString() + ')'
  const node = graph.createNodeAt(new Point(x,y), greenNodeStyle)
  graph.addLabel(node, label)

}

// Construct a some sample nodes:
const node1 = graph.createNodeAt(new Point(200,200), greenNodeStyle)
const label = graph.addLabel(node1, 'node1')
const node2 = graph.createNodeAt(new Point(800,200), greenNodeStyle)
const label2 = graph.addLabel(node2, 'node2')



//Methods for context Menu:
function configureContextMenu(graphComponent) {
  const inputMode = graphComponent.inputMode

  // Create a context menu. In this demo, we use our sample context menu implementation but you can use any other
  // context menu widget as well. See the Context Menu demo for more details about working with context menus.
  const contextMenu = new ContextMenu(graphComponent)

  // Add event listeners to the various events that open the context menu. These listeners then
  // call the provided callback function which in turn asks the current ContextMenuInputMode if a
  // context menu should be shown at the current location.
  contextMenu.addOpeningEventListeners(graphComponent, location => {
    if (inputMode.contextMenuInputMode.shouldOpenMenu(graphComponent.toWorldFromPage(location))) {
      contextMenu.show(location)
    }
  })

  // Add an event listener that populates the context menu according to the hit elements, or cancels showing a menu.
  // This PopulateItemContextMenu is fired when calling the ContextMenuInputMode.shouldOpenMenu method above.
  inputMode.addPopulateItemContextMenuListener((sender, args) =>
    populateContextMenu(contextMenu, graphComponent, args)
  )

  // Add a listener that closes the menu when the input mode requests this
  inputMode.contextMenuInputMode.addCloseMenuListener(() => {
    contextMenu.close()
  })

  // If the context menu closes itself, for example because a menu item was clicked, we must inform the input mode
  contextMenu.onClosedCallback = () => {
    inputMode.contextMenuInputMode.menuClosed()
  }
}
function populateContextMenu(contextMenu, graphComponent, args) {
    // The 'showMenu' property is set to true to inform the input mode that we actually want to show a context menu
    // for this item (or more generally, the location provided by the event args).
    // If you don't want to show a context menu for some locations, set 'false' in this cases.
    args.showMenu = true
  
    contextMenu.clearItems()
  
    const node = args.item instanceof INode ? args.item : null
    // If the cursor is over a node select it
    updateSelection(graphComponent, node)
  
    // Create the context menu items
    if (graphComponent.selection.selectedNodes.size > 0) {
      contextMenu.addMenuItem('Edit', () => ICommand.EDIT_LABEL.execute(null, graphComponent))
      contextMenu.addMenuItem('Copy', () => ICommand.COPY.execute(null, graphComponent))
      contextMenu.addMenuItem('Delete', () => ICommand.DELETE.execute(null, graphComponent))
    } else {
      // no node has been hit
      contextMenu.addMenuItem('Select all', () => ICommand.SELECT_ALL.execute(null, graphComponent))
      contextMenu.addMenuItem('Paste', () =>
        ICommand.PASTE.execute(args.queryLocation, graphComponent)
      )
    }
}
function updateSelection(graphComponent, node) {
    if (node === null) {
      // clear the whole selection
      graphComponent.selection.clear()
    } else if (!graphComponent.selection.selectedNodes.isSelected(node)) {
      // no - clear the remaining selection
      graphComponent.selection.clear()
      // and select the node
      graphComponent.selection.selectedNodes.setSelected(node, true)
      // also update the current item
      graphComponent.currentItem = node
    }
}




export default function ProjektListe() {
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
                        <Link to={`/`} className="btn btn-success">
                            zurück
                        </Link>{' '}
                        <Button variant="secondary">Logout</Button>
                    </Form>
                </Container>
            </Navbar>
            <div className="graph-container" ref={graphContainer}></div>
        </div>
    );
}
