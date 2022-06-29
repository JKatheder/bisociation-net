import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
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
    const handleColorChange = () => {
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
                </Card.Body>
            </Card>
        </Draggable>
    );
}
