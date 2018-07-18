import React, {Component} from 'react';
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";

class ChatPage extends Component {


    render() {

        return (
            <div className="mesgs">
                <h2>Group Chat</h2>
                <ChatList currentUser={this.props.currentUser}/>
                <ChatBox currentUser={this.props.currentUser}/>
            </div>

        );


    }
}

export default ChatPage;