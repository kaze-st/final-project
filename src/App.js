import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import SignInPage from "./components/sign-in-page/SignInPage";
import HomePage from "./components/home-page/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import TradePage from "./components/trade/TradePage";
import ChatPage from "./components/chat/ChatPage";
import NavBar from "./components/NavBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true}
    }

    render() {
        let content = null;

        if (!this.state.user) { // If user is not logged in
            content = <div className="wrapper">
                <SignInPage/>
            </div>;
        } else { // else
            content = <div className="wrapper">
                <NavBar handle="tim" logout={() => { console.log("out"); }}/>
                <Switch>
                    <Route exact path="/" render={SignInPage}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/trade" component={TradePage}/>
                    <Route path="/profile/:name" component={ProfilePage}/>
                    <Route path="/chat" component={ChatPage}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        }

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;