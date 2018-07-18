import React, {Component} from 'react';

import PersonalContactList from "./PersonalContactList";
import PersonalChatBox from "./PersonalChatBox";
import PersonalChatList from "./PersonalChatList";
import firebase from 'firebase';
import ActiveConversationList from "./ActiveConversationList";

export default class PersonalChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        firebase.database().ref('users').limitToFirst(1).once('value', (snap) =>{
            console.log(snap.val());
            let firstUser = snap.val();
            let userKey = Object.keys(snap.val());
            firstUser = firstUser[userKey[0]];
            firstUser.id = userKey[0];
            this.setState({receiver:firstUser})
        })
    }

    // Receives an user object that represents the receiver
    handleContactClick(receiver) {
        console.log("receiver in handleClick", receiver);
        this.setState({receiver});
    }

    render() {
        console.log('receiver', this.state.receiver);
        console.log('current user', this.props.currentUser);
        if (!this.state.receiver) return null;
        return <div className="messaging">
            <PersonalContactList currentUser={this.props.currentUser} handleContactClick={(contactID) => this.handleContactClick(contactID)}/>
            <ActiveConversationList currentUser={this.props.currentUser} handleContactClick={(contactID) => this.handleContactClick(contactID)}/>
            <PersonalChatList currentUser={this.props.currentUser} receiver={this.state.receiver}/>
            <PersonalChatBox currentUser={this.props.currentUser} receiver={this.state.receiver}/>
        </div>
    }

}