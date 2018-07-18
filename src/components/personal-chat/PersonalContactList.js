import React, {Component} from 'react'; //import React Component
import firebase from 'firebase/app'

export default class PersonalContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {contacts: []}
    }

    componentDidMount() {
        this.userRef = firebase.database().ref('users');
        this.userRef.on('value', (snapshot) => {

            this.setState({contacts: snapshot.val()});
        })
    }

    componentWillUnmount(){
        this.userRef.off()
    }
    render() {
        if (!this.state.contacts) {
            return <div className="inbox_chat">
                <div className="recent_heading">
                    <h4>Contact list</h4>
                </div>
            </div>
        }

        let contactsKey = Object.keys(this.state.contacts);


        contactsKey = contactsKey.reduce((filtered, option) => {
            if (option !== this.props.currentUser.uid) {
                let contactObj = this.state.contacts[option];
                contactObj.id = option;
                filtered.push(contactObj);
            }
            return filtered;
        }, []);

        contactsKey = contactsKey.map((contact) => {
            return <PersonalContactItem key={contact.id} contact={contact} handleContactClick={this.props.handleContactClick}/>
        });
        return <div className="inbox_chat">
            <div className="recent_heading">
                <h4>Contact list</h4>
            </div>
            {contactsKey}
        </div>;
    }
}

class PersonalContactItem extends Component {
    render() {
        return <div className="chat_list active_chat" onClick={() => this.props.handleContactClick(this.props.contact)}>
            <div className="chat_people">
                <div className="chat_img"><img src={this.props.contact.photoURL} alt="sunil"/></div>
                <div className="chat_ib">
                    <h5>{this.props.contact.handle}</h5>
                </div>
            </div>
        </div>;
    }
}