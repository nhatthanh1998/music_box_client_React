import React from 'react'
import LoginView from '../views/Login.view'
import CreateView from '../views/Create.view'
import MusicBox from '../views/MusicBox.view'
import {Router,Route,Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {withAuthenticate} from '../services/Authenticate'
export const history = createBrowserHistory()
export default class App extends React.Component{
    render(){
        return(
            <Router history = {history}>
                <Switch>
                    <Route exact path = "/" component = {LoginView}/>
                    <Route path = "/register" component={CreateView}/>
                    <Route path="/playlist" component = {withAuthenticate(MusicBox)}/>
                </Switch>
            </Router>
        )
    }
}