import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { TradeItemList } from './TradeOffers';

import firebase from 'firebase/app';


/**
 * props:
 * currentUser- currently logged in user
 * toggleNewUser- callback to log user profile as completed
 */
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = { userProfileData: undefined };
    }

    componentDidMount() {
        this.userProfileRef = firebase.database().ref('users').child(this.props.match.params.uid);
        this.userProfileRef.on('value', (snapshot) => {
            this.setState({ userProfileData: snapshot.val() });
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
        } else {
            button = (
                <div className="row">
                    <Button color="primary">
                        <NavLink to={"/personal-chat"}>
                            {"Chat with " + this.state.userProfileData.handle}
                        </NavLink>
                    </Button>
                    <Button color="primary">
                        <NavLink to={"/trade"}>
                            {"Trade with " + this.state.userProfileData.handle}
                        </NavLink>
                    </Button>
                </div>);
        }

        console.log(this.state.userProfileData);

        return (
            <div className="profile">
                <h2>My Profile Page</h2>
                {button}
                <div id="profile" className="container-fluid">
                    <div className="row" id="profileBio">
                        <div className="col">
                            {this.state.userProfileData.bio && <div> <h2>Bio:</h2>
                                <p>{this.state.userProfileData.bio}</p> </div>}
                            <div className="col" id="profileWishlist bg-light">
                                {this.state.userProfileData.itemName && <h3>{"WishList item: " + this.state.userProfileData.itemName}</h3>}
                                {this.state.userProfileData.itemCost && <h3>{"Asking for $" + this.state.userProfileData.itemCost}</h3>}
                                {this.state.userProfileData.itemDesc && <p>{this.state.userProfileData.itemDesc}</p>}
                            </div>

                            {this.state.userProfileData.tradeOffers && <div className="col-6 card">
                                <h2>Trade Offers:</h2>
                                {<TradeItemList items={this.state.userProfileData.tradeOffers} />}
                            </div>}
                        </div>
                        <div className="col" id="profilePicture">
                            <h3>Profile Picture</h3>
                            {this.state.userProfileData.avatar && <img src={this.state.userProfileData.avatar} alt="profile avatar" />}
                            <div id="profileInfo">
                                {this.state.userProfileData.name && <p><strong>Full name: </strong>{this.state.userProfileData.name}</p>}
                                {this.state.userProfileData.email && <p>{"Email: " + this.state.userProfileData.email}</p>}
                                {this.state.userProfileData.handle && <p>{"Handle: " + this.state.userProfileData.handle}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>

            </div>
        );
    }
}

export default ProfilePage;