import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Draggable from 'react-draggable';

export default function Toolbox() {
    return (
        <Draggable>
            <Modal size="sm">
                <Modal.Header>
                    <Modal.Title>Toolbox</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Button variant="secondary">Save</Button>
                    <Button variant="secondary">Export</Button>
                </Modal.Body>
            </Modal>
        </Draggable>
    );
}
