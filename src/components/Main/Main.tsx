import React from 'react';
import SortModule from '../SortModule/SortModule';
import PathfindingModule from '../PathfindingModule/PathfingModule';
import Navbar from './Navbar/Navbar';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './Main.css';

const Main: React.FC = () => {
    return (
        <div className='Main'>
            <Navbar />
            <Switch>
                <Route path='/sort'>
                    <SortModule />
                </Route>
                <Route path='/pathfind'>
                    <PathfindingModule />
                </Route>
                <Route exact path='/'>
                    <Redirect to='/sort' />
                </Route>
            </Switch>
        </div>
    );
}


export default Main;