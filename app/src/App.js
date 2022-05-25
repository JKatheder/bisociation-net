import './App.css';
import ProjectList from './components/ProjectList/ProjectList';
import ProjectView from './components/ProjectView/ProjectView';
import {Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className = "App">
          <header className = "App-header">
            <h1>Bisociation Net</h1>
          </header>
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/project/:projectID" element={<ProjectView />} />
          </Routes>
        </div>
    );
}

export default App;