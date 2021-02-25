import React from 'react';
import styles from './app.module.css';
import Login from './components/login/Login';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Maker from './components/maker/Maker';

function App({ FileInput, authService, cardRepository }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService}/>
          </Route>
          <Route path="/maker">
            <Maker authService={authService} FileInput={FileInput} cardRepository={cardRepository}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
