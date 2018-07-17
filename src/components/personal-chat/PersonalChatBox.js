import React, {Component} from 'react'; //import React Component
import firebase from 'firebase/app'

export default class PersonalChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {post: ''}
    }

    componentDidMount() {

        // this.chatRef = firebase.database().ref(this.props.currentUser.uid).child('messages').child(this.props.receiverUser.id);
        // this.chatRef.once('value', (snap)=>{
        //     console.log(snap.val());
        //     if (snap.val() === null){
        //         let newChat = {};
        //         newChat[this.props.receiverUser.id] = {};
        //         this.chatRef.push(newChat);
        //         firebase.database().ref(this.props.currentUser.uid).child('messages').child(this.props.receiverUser.id)
        //     }
        // });


    }

    updatePost(event) {
        this.setState({post: event.target.value});
    }

    postMessage(event) {
        event.preventDefault(); //don't submit


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
        console.log(converHash);
        conversationRef.push(newMessage);

        this.setState({post: ''}); //empty out post for next time
    }

    render() {
        if (!this.props.receiver) return null;

        return (<div className="type_msg">
            <div className="input_msg_write">
                <input onChange={(event) => this.updatePost(event)} value={this.state.post} type="text" className="write_msg"
                       placeholder="Type a message"/>
                <button className="msg_send_btn"
                        type="button"
                        disabled={this.state.post.length === 0}
                        onClick={(event) => (this.postMessage(event))}
                ><i className="fas fa-share-square" aria-hidden="true"></i></button>
            </div>
        </div>);
    }
}