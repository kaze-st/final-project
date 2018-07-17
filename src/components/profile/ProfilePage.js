import React, {Component} from 'react';
import ProfileForm from './ProfileForm';


/**
 * props:
 * currentUser - currently logged in user
 */
class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let content = null;
        if (this.props.currentUser.displayName === this.props.match.params.name) {

        } else {

        }

        return (
            <div className="profile">
                {<ProfileForm uid={this.props.currentUser.uid}/>}
            </div>
        );
    }
}

export default ProfilePage;