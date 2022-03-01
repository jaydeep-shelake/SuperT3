import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Start from './components/pages/Start';
import Board from './components/pages/Board'
import Home from './components/pages/Home'
import NewGame from './components/start/NewGame';

const Game = () => (
    <Router>
        <Route path='/' exact component={Home} />
        <Route path='/game' exact component={Board} />
        <Route path='/start'exact component={Start}/>
        <Route path="/new-game" exact component={NewGame}/>
    </Router>
)
 
export default Game