import React, {Component} from 'react';
import ProfileForm from './ProfileForm';


/**
 * props:
 * currentHandle - uid of the currently logged in user
 */
class ProfilePage extends Component {
    constructor(props) {
        super(props);

        

    }

    render() {
        let content = null;
        if (this.props.currentHandle === this.props.match.params.name) {

        } else {

        }

        return (
            <div className="profile">
                {<ProfileForm />}
            </div>
        );
    }
}

export default ProfilePage;