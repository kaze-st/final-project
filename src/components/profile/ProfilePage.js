import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import firebase from 'firebase/app';


/**
 * props:
 * currentUser - currently logged in user
 * toggleNewUser- callback to log user profile as completed
 */
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {userProfileData: undefined};
    }

    componentDidMount() {
        this.userProfileRef = firebase.database().ref('users').child(this.props.match.params.uid);
        this.userProfileRef.on('value', (snapshot) => {
            this.setState({userProfileData: snapshot.val()});
        });
        
    }

    componentWillUnmount() {
        this.userProfileRef.off();
    }

    render() {
        if (!this.state.userProfileData) { return null };

        let button = null;
        if (this.props.currentUser.uid === this.props.match.params.uid) {
            button = <Button color="primary">
                        <NavLink to={"/profile/" + this.props.match.params.uid + "/edit"}>
                            Edit Profile
                        </NavLink>
                    </Button>;
        }// else {
        //     button = 
        // }

        console.log(this.state.userProfileData);

        return (
            <div className="profile">
                <div id="profile" className="container-fluid">
                    <div className="row">
                        <div className="col-6 im-g">
                            <img src={this.state.userProfileData.avatar} alt="profile picture" />
                        </div>
                        <div className="col-6">
                            <h2>Bio:</h2>
                            <p>{this.state.userProfileData.bio}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>all the other stuff here</p>
                        </div>
                        <div className="col-6">
                            <h2>Trade Offer:</h2>
                            <p>{this.state.userProfileData.tradeOffer}</p>
                        </div>
                    </div>
                </div>
                {button}
            </div>
            );
    }
}

export default ProfilePage;