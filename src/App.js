import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import SignInPage from "./components/sign-in-page/SignInPage";
import HomePage from "./components/home-page/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import TradePage from "./components/trade/TradePage";
import ChatPage from "./components/chat/ChatPage";
import NavBar from "./components/NavBar";
import firebase from 'firebase/app';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true}
    }

    // Life cycle events
    componentDidMount() {
        this.onAuthStateChanged = firebase.auth().onAuthStateChanged(
            (firebaseUser) => {
                if (firebaseUser) {
                    this.setState({user: firebaseUser, loading: false});
                } else {
                    this.setState({user: null, loading: false});
                }
            }
        );
    }

    componentWillUnmount() {
        this.onAuthStateChanged();
    }

    // Handle methods
    handleSignIn(email, password) {
        this.setState({errorMessage: null});

        firebase.auth().signInWithEmailAndPassword(email, password).catch(
            (err) => {
                this.setState({errorMessage: err.message});
            }
        );
    }

    handleSignUp(email, password, handle, avatar) {
        console.log("email: ", email, " password: ", password, " handle: ", handle, " avatar: ", avatar);
        this.setState({errorMessage: null});
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
                return firebase.auth().currentUser.updateProfile({displayName: handle, photoURL: avatar})
            }
        ).catch((err) => {
            this.setState({errorMessage: err.message});
        });
    }

    handleSignOut() {
        this.setState({errorMessage: null});
        firebase.auth().signOut().catch(
            (err) => {
                this.setState({errorMessage: err.message});
            }
        )
    }

    render() {
        let content = null;

        if (!this.state.user) { // If user is not logged in
            content = <div className="wrapper">
                <SignInPage
                    handleSignIn={(e,p) => this.handleSignIn(e,p)}
                    handleSignUp={(e,p,h,a) => this.handleSignUp(e,p,h,a)}
                />
            </div>;
        } else { // else
            content = <div className="wrapper">
                <NavBar handle={this.state.user.displayName} logout={() => this.onAuthStateChanged()}/>
                <Switch>
                    <Route exact path="/" render={SignInPage}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/trade" component={TradePage}/>
                    <Route path="/profile/:name" component={ProfilePage}/>
                    <Route path="/chat" component={ChatPage}/>
                    <Redirect to="/"/>
                </Switch>
            </div>;
        }

        if (this.state.loading) {
            return <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
            </div>
        }

        return (
            <div>
                {this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                }
                {content}
            </div>
        );
    }
}

export default App;