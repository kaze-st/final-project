import React, {Component} from 'react';
import './App.css';
//routing
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';

//home made components
import SignInPage from "./components/sign-in-page/SignInPage";
import HomePage from "./components/home-page/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import TradePage from "./components/trade/TradePage";
import ChatPage from "./components/group-chat/ChatPage";
import NavBar from "./components/NavBar";
//database
import firebase from 'firebase/app';
import PersonalChatPage from "./components/personal-chat/PersonalChatPage";
import logo from './img/logo.png'
import ProfileForm from './components/profile/ProfileForm';


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
        ).then(
            () => {
                let currUID = firebase.auth().currentUser.uid;
                // where ill put it
                let allUsersRef = firebase.database().ref('users');
                let usersRef = allUsersRef.child(currUID);

                // preparing data for entry
                let newUserObj = {};
                newUserObj.email = email;
                newUserObj.rank = Object.keys(allUsersRef).length;

                newUserObj.handle = handle;
                newUserObj.avatar = avatar;
                newUserObj.id = currUID;
                newUserObj.tradeOffers = [];
                console.log(usersRef);

                // entering data in that spot we found before
                return usersRef.set(newUserObj);
            }
        ).then(() => this.setState({newUser: true})).catch((err) => {
            this.setState({errorMessage: err.message});
        });

    }

    toggleNewUser() {
        this.setState({newUser: false});
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
                <div className="wrapper row">
                    <NavBar uid={this.state.user.uid} logout={() => this.handleSignOut()} className="col-sm"/>
                    <main className="col-sm">
                        <div id="content">
                            <div id="logo" className="mx-auto">
                                <NavLink to="/home"> <img src={logo} alt="logo"/> </NavLink>
                            </div>
                            {this.state.newUser ?
                                // new user logs info into profile
                                <ProfileForm
                                    uid={this.state.user.uid}
                                    toggleNewUser={() => this.toggleNewUser()}/>
                                :
                                // returning user lands on home page
                                <Switch>
                                    <Route exact path="/" component={HomePage}/>
                                    <Route path="/home" component={HomePage}/>
                                    <Route exact path={"/trade/:uid"} component={TradePage}/>
                                    <Route exact path={"/profile/:uid"} render={(routerProps) => {
                                        return <ProfilePage {...routerProps}
                                                            currentUser={this.state.user}
                                                            toggleNewUser={() => this.toggleNewUser()}/>
                                    }}/>
                                    <Route path="/chat" render={(routerProps) => {
                                        return <ChatPage {...routerProps}
                                                         currentUser={this.state.user}/>
                                    }}/>
                                    <Route path="/profile/:uid/edit" render={(routerProps) => {
                                        return <ProfileForm {...routerProps}
                                                            uid={this.state.user.uid}
                                                            toggleNewUser={() => this.toggleNewUser()}/>
                                    }}/>
                                    <Route exact path="/personal-chat" render={(routerProps) => {
                                        return <PersonalChatPage {...routerProps}
                                                                 currentUser={this.state.user}/>
                                    }}/>
                                    <Route exact path="/personal-chat/:receiverID" render={(routerProps) => {
                                        return <PersonalChatPage {...routerProps}
                                                                 currentUser={this.state.user}/>
                                    }}/>
                                    <Redirect to="/"/>
                                </Switch>
                            }
                            {/* footer */}
                            {/* <footer className="container text-center">
                                <small>API from
                    <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"> amazon api</a>
                                </small>
                                <small>&copy; 2018 Alissa Adornato &amp; Emily Ding &amp; Hao Chen &amp; William Fu</small>
                            </footer> */}
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