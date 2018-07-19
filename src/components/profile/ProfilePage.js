import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {TradeItemList} from './TradeOffers';

import firebase from 'firebase/app';
import HelpModal from '../HelpModal';


const PAGE_DESC = "This is your profile. You can set information about yourself, decide what item you want to save up for, and add or remove good and services for trading.";

/**
 * props:
 * currentUser- currently logged in user
 * toggleNewUser- callback to log user profile as completed
 */
class ProfilePage extends Component {

    

    constructor(props) {
        super(props);
        this.state = {userWishlistData: undefined, userProfileData: undefined};
    }

    componentDidMount() {
        this.wishListRef = firebase.database().ref('wishlist').child(this.props.match.params.uid);
        this.wishListRef.on('value', (snapshot) => {
            this.setState({userWishlistData: snapshot.val()});
        });

        this.userProfileRef = firebase.database().ref('users').child(this.props.match.params.uid);
        this.userProfileRef.on('value', (snapshot) => {
            this.setState({userProfileData: snapshot.val()});
        });
    }

    componentWillUnmount() {
        this.wishListRef.off();
        this.userProfileRef.off();
    }

    render() {
        if (!this.state.userProfileData) { return null }

        let button = null;
        if (this.props.currentUser.uid === this.props.match.params.uid) {
            button =
                <NavLink to={"/profile/" + this.props.match.params.uid + "/edit"}>
                    <Button color="primary">
                        Edit Profile</Button>
                </NavLink>

        } else {
            button = (
                <div className="row">

                    <NavLink to={"/personal-chat"}>
                        <Button color="primary">
                            {"Chat with " + this.state.userProfileData.handle}
                        </Button>
                    </NavLink>

                </div>);
        }

        console.log(this.state.userProfileData);

        return (
            <div className="profile">
                <div id="profile" className="container-fluid">
                    <div id="profileHeader">
                        <h2>My Profile Page</h2>
                        <HelpModal name="Profile Page" desc={PAGE_DESC}/>
                    </div>
                    {this.state.userProfileData.avatar &&
                    <img src={this.state.userProfileData.avatar} alt="profile avatar" id="profileImage" class="img-fluid"/>}
                    <div id="profileInfo">
                        {this.state.userProfileData.name &&
                        <p className="text-center"><strong>Full name: </strong>{this.state.userProfileData.name}</p>}
                        {this.state.userProfileData.email &&
                        <p className="text-center"><strong>E-Mail: </strong>{this.state.userProfileData.email}</p>}
                        {this.state.userProfileData.handle &&
                        <p className="text-center"><strong>Handle: </strong>{this.state.userProfileData.handle}</p>}
                    </div>

                    {this.state.userProfileData.bio && <div><h2>Bio:</h2> <p>{this.state.userProfileData.bio}</p></div>}
                    {this.state.userWishlistData && this.state.userWishlistData.name && <h3>{"WishList item: " + this.state.userWishlistData.name}</h3>}
                    {this.state.userWishlistData && this.state.userWishlistData.price && <h3>{"Asking for $" + this.state.userWishlistData.price}</h3>}
                    {this.state.userWishlistData && this.state.userWishlistData.desc && <p>{this.state.userWishlistData.desc}</p>}


                    {this.state.userProfileData.tradeOffers && <div>
                        <h2>Trade Offers:</h2>
                        {<TradeItemList currId={this.props.match.params.uid} loggedId={this.props.currentUser.uid}/>}
                    </div>}

                    {button}


                </div>

            </div>
        );
    }
}

export default ProfilePage;