import React, {Component} from 'react'; //import React Component
import firebase from 'firebase/app'

export default class ActiveConversationList extends Component {
    constructor(props) {
        super(props);
        this.state = {conversations: []}
    }

    componentDidMount() {
        this.userRef = firebase.database().ref('users').child(this.props.currentUser.uid).child('active conversations');
        this.userRef.on('value', (snapshot) => {

            this.setState({conversations: snapshot.val()});
        })
    }

    componentWillUnmount() {
        this.userRef.off()
    }

    render() {
        if (!this.state.conversations) {
            return <div className="inbox_chat col-sm border border-dark">
                <h4>Recent</h4>
                <div id="recentChatsContainer">
                </div>
            </div>
        }

        // Unsorted
        // let conversationKey = this.state.conversations;


        // conversationKey = Object.keys(conversationKey);
        // console.log(conversationKey);
        // conversationKey = conversationKey.map((conversation) => {
        //     return <ConversationItem key={conversation}
        //                              currentUser={this.props.currentUser}
        //                              conversation={conversation}
        //                              handleContactClick={this.props.handleContactClick}/>
        // });
        //
        let conversationKey = this.state.conversations;
        let sort = [];
        for (let conv in conversationKey) {
            sort.push([conv, conversationKey[conv]]);
        }

        sort.sort((a, b) => {
            return -a[1].time + b[1].time;
        });
        console.log(sort);
        conversationKey = sort.map((conversation) => {
            return <ConversationItem key={conversation[0]}
                                     currentUser={this.props.currentUser}
                                     conversation={conversation[0]}
                                     read={conversation[1].read}
                                     handleContactClick={this.props.handleContactClick}/>
        });


        return <div className="inbox_chat col-sm border border-dark">
            <h4>Recent</h4>
            <div id="recentChatsContainer">
                {conversationKey}
            </div>
        </div>;
    }
}

class ConversationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let split = this.props.conversation.split("-");
        let receptorUserID = split[0] === this.props.currentUser.uid ? split[1] : split[0];
        console.log("currentUser: ", this.props.currentUser.uid, " receptor: ", receptorUserID);
        firebase.database().ref('users').child(receptorUserID).on('value', (snapshot) => {
            let receptor = snapshot.val();
            receptor.id = receptorUserID;
            this.setState({receptor: receptor});
        });

        firebase.database().ref('conversation').child(this.props.conversation).limitToLast(1).on("value",
            (snapshot) => {
                console.log(snapshot.val());
                let text = snapshot.val();
                let key = Object.keys(text)[0];

                this.setState({lastMessage: text[key]});
            }
        )
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        firebase.database().ref('conversation').child(this.props.conversation).limitToLast(1).on("value",
            (snapshot) => {
                console.log(snapshot.val());
                let text = snapshot.val();
                let key = Object.keys(text)[0];
                console.log(prevState.lastMessage);
                if (prevState.lastMessage !== undefined && (prevState.lastMessage.text !== text[key].text || prevState.lastMessage.time !== text[key].time)) {
                    console.log("prevState.last message: ", prevState.lastMessage, " this last message: ", text[key]);
                    this.setState({lastMessage: text[key]});
                }

            }
        )
    }


    render() {
        console.log("renderlast message: ", this.state.lastMessage);
        if (this.state.receptor === null || !this.state.receptor || !this.state.lastMessage) return null;
        let lastPersonTalk = this.state.lastMessage.userId === this.props.currentUser.uid ? "You" : this.state.receptor.handle;
        return <div className="chat_list active_chat" onClick={() => {
            firebase.database().ref('users').child(this.props.currentUser.uid).child('active conversations')
                .child(this.props.conversation).update({read: "y"})
            // .once('value').then((snap) =>{ console.log("ashjfbaskhvbaskfd", snap.val())});
            //
                .then(() => {
                    this.props.handleContactClick(this.state.receptor);
                }).catch((err) =>{alert(err.message)})

        }}>
            <div className="chat_people">
                <div className="chat_img"><img src={this.state.receptor.avatar} alt="sunil"/></div>
                <div className="chat_ib">
                    <h5>{this.state.receptor.handle}</h5>
                    <h4>{this.props.read === "y" ? "(read)" : "(unread)"}</h4>
                    <p>{lastPersonTalk + ": " + this.state.lastMessage.text}</p>
                </div>
            </div>
        </div>;
    }
}