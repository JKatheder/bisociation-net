import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';

export default function Toolbox() {
    return (
        <Draggable
        defaultPosition={{x: 0, y: 0}}
        style={{display: "block"}}>
          <Card style={{zIndex:1000, width: '10rem'}}>
               <Card.Body>
                    <Card.Title style={{textAlign: "left"}}>Toolbox</Card.Title>
                    <Button style={{display: "block", width: 100}} variant="secondary">Save</Button>
                    <Button style={{display: "block", width: 100}} variant="secondary">Export</Button>
                    <Button style={{display: "block", width: 100}} variant="secondary">Auto-Layout</Button>
                    <Button style={{display: "block", width: 100}} variant="secondary">Color-Change</Button>
               </Card.Body>
          </Card>
        </Draggable>
    );
}
