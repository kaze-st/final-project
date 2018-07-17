import React, {Component} from 'react';

import PersonalContactList from "./PersonalContactList";
import PersonalChatBox from "./PersonalChatBox";
import PersonalChatList from "./PersonalChatList";

export default class PersonalChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return <div className="messaging">
            <PersonalContactList/>
            {/*<PersonalChatList currentUser={this.props.currentUser}/>*/}
            {/*<PersonalChatBox currentUser={this.props.currentUser}/>*/}
        </div>
    }

}