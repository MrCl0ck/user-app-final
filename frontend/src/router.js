import React from 'react';
import User from './pages/Users/index';
import Profile from './pages/Profile/index';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Edit from './pages/Editar/index';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={User}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/update/:id" component={Edit}/>
            </Switch>
        </BrowserRouter>        
    );
}

export default Routes;

