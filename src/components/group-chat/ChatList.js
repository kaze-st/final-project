import {Component} from 'react';
import React from "react";
import firebase from 'firebase/app';

export default class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: []}
    }

    componentDidMount() {
        this.messagesRef = firebase.database().ref('message');
        this.messagesRef.on('value', (snapshot) => {
            this.setState({messages: snapshot.val()});
        })
    }

    componentWillUnmount() {
        this.messagesRef.off();
    }


    render() {
        if (!this.state.messages) return null;

        let messagesItems = [];
        let messageKeys = Object.keys(this.state.messages);

        messageKeys = messageKeys.map((key) => {
            let messageObj = this.state.messages[key];
            messageObj.id = key;
            return messageObj;
        });

        messageKeys = messageKeys.map((message) => {
                return <ChatItem key={message.id} message={message} currentUser={this.props.currentUser}/>;
            }
        );


        return (
            <div className="msg_history" id={"msg_history"}>
                {messageKeys}
            </div>);


    }
}


class ChatItem extends Component {

    render() {
        let messageType;
        if (this.props.message.userId === this.props.currentUser.uid) {
            messageType =
                <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>{this.props.message.text}</p>
                    </div>
                </div>
        } else {
            messageType = <div className="incoming_msg">
                <div className="incoming_msg_img"><img src={this.props.message.userPhoto} alt="sunil"/></div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{this.props.message.text}</p>
                    </div>
                </div>
            </div>
        }

        return messageType;
    }
}


