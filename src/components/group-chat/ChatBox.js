import React, {Component} from 'react'; //import React Component
import firebase from 'firebase/app'
import { animateScroll as scroll } from 'react-scroll'

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {post: ''}
    }

    updatePost(event) {
        this.setState({post: event.target.value});
    }

    postMessage(event) {
        event.preventDefault(); //don't submit

        scroll.scrollToBottom({
            containerId: "group_chat"
        });

        let newMessage = {
            text: this.state.post,
            userId: this.props.currentUser.uid,
            userName: this.props.currentUser.displayName,
            userPhoto: this.props.currentUser.photoURL,
            time: firebase.database.ServerValue.TIMESTAMP
        };

        let messageRef = firebase.database().ref('message');
        messageRef.push(newMessage);

        this.setState({post: ''}); //empty out post for next time
    }

    render() {
        return (<div className="type_msg">
            <div className="input_msg_write">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (this.state.post.length !== 0) {
                        this.postMessage(event)
                    }
                }}>
                    <input onChange={(event) => this.updatePost(event)} value={this.state.post}
                           onSubmit={(event) => (this.postMessage(event))}
                           type="text"
                           className="write_msg"
                           placeholder="Type a message"/>
                    <button className="msg_send_btn"
                            type="button"
                            disabled={this.state.post.length === 0}
                            onClick={(event) => (this.postMessage(event))}
                    ><i className="fas fa-share-square" aria-hidden="true"></i></button>
                </form>
            </div>
        </div>);
    }
}