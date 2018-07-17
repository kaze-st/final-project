import React, {Component} from 'react'; //import React Component
import firebase from 'firebase/app'

export default class PersonalContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {contacts: []}
    }

    componentDidMount() {
        this.userRef = firebase.database().ref('users');
        this.userRef.once('value').then((snapshot) => {
            this.setState({contacts: snapshot.val()});
        })
    }

    render() {
        if (!this.state.contacts) {
            return <div className="inbox_chat">
                <div className="recent_heading">
                    <h4>Recent</h4>
                </div>
            </div>
        }

        let contactsKey = Object.keys(this.state.contacts);

        contactsKey = contactsKey.map((key) => {
            let contactObj = this.state.contacts[key];
            contactObj.id = key;
            return contactObj;
        });

        contactsKey = contactsKey.map((contact) => {
            return <PersonalContactItem key={contact.id} contact={contact}/>
        });
        return <div className="inbox_chat">
            <div className="recent_heading">
                <h4>Recent</h4>
            </div>
            {contactsKey}
        </div>;
    }
}

class PersonalContactItem extends Component {
    render() {
        return <div className="chat_list active_chat">
            <div className="chat_people">
                <div className="chat_img"><img src={this.props.contact.photoURL} alt="sunil"/></div>
                <div className="chat_ib">
                    <h5>{this.props.contact.handle}</h5>
                    <p>Latest message</p>
                </div>
            </div>
        </div>;
    }
}