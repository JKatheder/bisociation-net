import './App.css';
import ProjectList from './components/ProjectList/ProjectList';
import ProjectView from './components/ProjectView/ProjectView';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProjectList />} />{' '}
                <Route path="/project/:projectID" element={<ProjectView />} />{' '}
            </Routes>{' '}
        </div>
    );
}

export default App;
