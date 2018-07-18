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

    componentDidMount() {

        console.log("wtf", this.props);
        if (this.props.match.params.receiverID && this.props.match.params.receiverID !== this.props.currentUser.uid) {
            firebase.database().ref('users').child(this.props.match.params.receiverID).once('value').then((snapshot) => {
                    console.log("param", snapshot.val());
                    this.setState({receiver: snapshot.val()});
                }
            )
        }
    }




    // Receives an user object that represents the receiver
    handleContactClick(receiver) {
        console.log("CLicked!!!!!");
        console.log("receiver in handleClick", receiver);
        this.setState({receiver});
    }

    render() {


        console.log('receiver', this.state.receiver);
        console.log('current user', this.props.currentUser);

        // If no receiver just show this!
        let content = <h2 id="defaultChatText">Select a person to talk to!</h2>;

        if (this.state.receiver) {
            content = <div className="col-sm-8"><h4>Conversation</h4><PersonalChatList currentUser={this.props.currentUser} receiver={this.state.receiver}/>
                <PersonalChatBox currentUser={this.props.currentUser} receiver={this.state.receiver}/></div>
        }

        return <div className="messaging row">
            <PersonalContactList currentUser={this.props.currentUser} handleContactClick={(contactID) => this.handleContactClick(contactID)}/>
            <ActiveConversationList  currentUser={this.props.currentUser} handleContactClick={(contactID) => this.handleContactClick(contactID)}/>
            {content}
        </div>
    }

}