import React from 'react';
import Main from '../Main/Main';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';

const App: React.FC = () => {
  return (
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
  );
}

export default App;
