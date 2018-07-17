import React, {Component} from 'react';
import firebase from 'firebase/app';
import logo from '../../img/logo.png'
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {post: ''}
    }


    render() {
        return (

            <div className="mesgs">
                <div id="logo" className="d-flex justify-content-between">
                    <img src={logo} alt="logo"/>
                </div>
                <ChatList currentUser={this.props.currentUser}/>
                <ChatBox currentUser={this.props.currentUser}/>
            </div>

        );


    }
}

export default ChatPage;