import React from 'react'
import { HashRouter, Route, Switch,Redirect} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'

export default class ERouter extends React.Component{
    render(){
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path='/' exact={true} component={Home} />
                    </Switch>
            </HashRouter>
        );
    }
}