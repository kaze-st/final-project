import React, { Component } from 'react';
import './App.css';
//routing
import { Route, Switch, Redirect } from 'react-router-dom';
//home made components
import SignInPage from "./components/sign-in-page/SignInPage";
import HomePage from "./components/home-page/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import TradePage from "./components/trade/TradePage";
import ChatPage from "./components/group-chat/ChatPage";
import NavBar from "./components/NavBar";
//database
import firebase from 'firebase/app';
//logo
import logo from './img/logo.png'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    // Life cycle events
    componentDidMount() {
        this.onAuthStateChanged = firebase.auth().onAuthStateChanged(
            (firebaseUser) => {
                if (firebaseUser) {
                    this.setState({ user: firebaseUser, loading: false });
                } else {
                    this.setState({ user: null, loading: false });
                }
            }
        );
    }

    componentWillUnmount() {
        this.onAuthStateChanged();
    }

    // Handle methods
    handleSignIn(email, password) {
        this.setState({ errorMessage: null });

        firebase.auth().signInWithEmailAndPassword(email, password).catch(
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        );
    }

    handleSignUp(email, password, handle, avatar) {
        console.log("email: ", email, " password: ", password, " handle: ", handle, " avatar: ", avatar);
        this.setState({ errorMessage: null });
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
                return firebase.auth().currentUser.updateProfile({ displayName: handle, photoURL: avatar })
            }
        ).then(
            () => {
                let currUID = firebase.auth().currentUser.uid;
                let usersRef = firebase.database().ref('users').child(currUID);
                let newUserObj = {};
                newUserObj.email = email;
                newUserObj.password = password;
                newUserObj.handle = handle;
                newUserObj.avatar = avatar;
                console.log(usersRef);
                return usersRef.set(newUserObj);

            }
        ).catch((err) => {
            this.setState({ errorMessage: err.message });
        });

    }

    handleSignOut() {
        this.setState({ errorMessage: null });
        firebase.auth().signOut().catch(
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        )
    }

    render() {
        console.log(this.state.user);
        let content = null;

        if (!this.state.user) { // If user is not logged in
            content = <div className="wrapper">
                <SignInPage
                    handleSignIn={(e, p) => this.handleSignIn(e, p)}
                    handleSignUp={(e, p, h, a) => this.handleSignUp(e, p, h, a)}
                />
            </div>;
        } else { // else
            content =
                <div className="wrapper">
                    <NavBar handle={this.state.user.displayName} logout={() => this.handleSignOut()} />
                    <main>
                        <div id="content">
                            <div id="logo" className="d-flex justify-content-between">
                                <img src={logo} alt="logo" />
                            </div>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route path="/home" component={HomePage} />
                                <Route path="/trade" component={TradePage} />
                                <Route path={"/profile/:name"} render={(routerProps) => { return <ProfilePage {...routerProps} currentUser={this.state.user} /> }} />
                                <Route path="/chat" render={(routerProps) => {
                                    return <ChatPage {...routerProps} currentUser={this.state.user} />
                                }
                                } />
                                <Redirect to="/" />
                            </Switch>
                            {/* footer */}
                            <footer class="container text-center">
                                <small>API from
                    <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"> amazon api</a>
                                </small>
                                <small>&copy; 2018 Alissa Adornato &amp; Emily Ding &amp; Hao Chen &amp; William Fu</small>
                            </footer>
                        </div>

                    </main>
                </div>

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