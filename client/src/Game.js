import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Start from './components/pages/Start';
import Board from './components/pages/Board'
import Home from './components/pages/Home'
import NewGame from './components/start/NewGame';
import LocalComputer from './components/localComputer/App';
const Game = () => (
    <Router>
        <Route path='/' exact component={Home} />
        <Route path='/game' exact component={Board} />
        <Route path='/start'exact component={Start}/>
        <Route path="/new-game" exact component={NewGame}/>
        <Route path="/local" exact component={LocalComputer}/>
    </Router>
)
 
export default Game