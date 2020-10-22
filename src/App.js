
import React from 'react';

import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'

import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch] =useStateValue();
  
  return (
    <div className="App">
      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
        <Router>
          
          <Sidebar/>  {/* here we always want to show whenever our app loads*/}
          <Switch>
          <Route path="/rooms/:roomId"> {/*we want chat to show onlly when user comes to this  url */}
          <Chat/>
          </Route>
          </Switch>
        </Router>
     
   
      </div>
      )}
    </div>
  );
}

export default App;
