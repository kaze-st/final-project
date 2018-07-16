import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import SignInPage from "./components/sign-in-page/SignInPage";


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
            </div>
        } else { // else

        }

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}


class NavBarSigned extends Component {

    render() {
        return (<nav id="sidebar">
            <div className="sidebar-header">
                <h3>weFund</h3>
                <strong>WF</strong>
            </div>

            <ul className="list-unstyled components">
                <li className="active">
                    <a href="#">
                        <i className="fas fa-home"></i>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-briefcase"></i>
                        About
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-image"></i>
                        Profile
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-paper-plane"></i>
                        Contact
                    </a>
                </li>
            </ul>

            <ul className="list-unstyled">
                <li>
                    <a href="#" className="profile">Profile</a>
                </li>
                <li>
                    <a href="#" className="logOut">Log Out</a>
                </li>
            </ul>
        </nav>)
    }
}

export default App;