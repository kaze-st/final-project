import React, {Component} from 'react'; //import React Component
import firebase from 'firebase/app'
import {Link, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'

export default class PersonalChatBox extends Component {
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
            containerId: "personal_chat"
        });

        let newMessage = {
            text: this.state.post,
            userId: this.props.currentUser.uid,
            userName: this.props.currentUser.displayName,
            userPhoto: this.props.currentUser.photoURL,
            time: firebase.database.ServerValue.TIMESTAMP
        };

        let converHash = this.props.currentUser.uid < this.props.receiver.id ?
            (this.props.currentUser.uid + "-" + this.props.receiver.id) :
            (this.props.receiver.id + "-" + this.props.currentUser.uid);

        let conversationRef = firebase.database().ref('conversation').child(converHash);
        conversationRef.push(newMessage);

        //
        firebase.database().ref('users').child(this.props.currentUser.uid).child('active conversations').child(converHash).update({
            read: "y",
            time: firebase.database.ServerValue.TIMESTAMP
        });
        firebase.database().ref('users').child(this.props.receiver.id).child('active conversations').child(converHash).update({
            read: "n",
            time: firebase.database.ServerValue.TIMESTAMP
        });

        this.setState({post: ''}); //empty out post for next time
    }

    render() {
        if (!this.props.receiver) return null;
        return (<div className="type_msg">
            <div className="input_msg_write">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (this.state.post.length !== 0) {
                        this.postMessage(event)
                    }
                }}>

                    <input onChange={(event) => this.updatePost(event)} value={this.state.post} type="text" className="write_msg"
                           placeholder={"Type a message to " + this.props.receiver.handle}

                    />
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