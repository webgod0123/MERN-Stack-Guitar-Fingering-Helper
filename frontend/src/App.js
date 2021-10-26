import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import guitar from './images/Guitar.jpg';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <div style={{backgroundImage:`url(${guitar})`, backgroundPositionY: 'center', backgroundSize: 'cover', height: '100vh', width: '100vw'}}>
            <LoginPage />
          </div>
        </Route>
        <Route path="/gfh" exact>
          <CardPage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
