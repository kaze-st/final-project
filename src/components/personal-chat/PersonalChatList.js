import {Component} from 'react';
import React from "react";
import firebase from 'firebase/app';

export default class PersonalChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: []}
    }

    componentDidMount() {
        let converHash = this.props.currentUser.uid < this.props.receiver.id ?
            (this.props.currentUser.uid + "-" + this.props.receiver.id) :
            (this.props.receiver.id + "-" + this.props.currentUser.uid);

        this.conversationRef = firebase.database().ref('conversation').child(converHash);
        this.conversationRef.on('value', (snapshot) => {
            this.setState({messages: snapshot.val()});
        });

    }

    componentWillUnmount() {
        this.conversationRef.off();
    }

    componentDidUpdate(prevProps) {

        let converHash = this.props.currentUser.uid < this.props.receiver.id ?
            (this.props.currentUser.uid + "-" + this.props.receiver.id) :
            (this.props.receiver.id + "-" + this.props.currentUser.uid);

        let oldHash = this.props.currentUser.uid < prevProps.receiver.id ?
            (this.props.currentUser.uid + "-" + prevProps.receiver.id) :
            (prevProps.receiver.id + "-" + this.props.currentUser.uid);

        if (converHash !== oldHash) {
            this.conversationRef.off();
            this.conversationRef = firebase.database().ref('conversation').child(converHash);

            this.conversationRef.on('value', (snapshot) => {
                this.setState({messages: snapshot.val()});
            });

        }
    }

    render() {
        if (!this.props.receiver) {
            return <div className="msg_history">
                No messages yet!
            </div>
        }
        if (!this.state.messages) return <div className="msg_history"><p>No messages</p></div>;

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

        return <div className="msg_history">
            {messageKeys}
        </div>;
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


