import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import firebase from 'firebase/app';

/**
 * props:
 * uid- uid of editing user
 * toggleNewUser- callback to declare user profile filled out
 */
class ProfileForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleInputChange(e) {
        let field = e.target.name; //which input
        let value = e.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    updateUserProfile(e) {
        e.preventDefault();

        // reference to my current profile
        let currentUserRef = firebase.database().ref('users').child(this.props.uid);
        console.log(this.state);
        currentUserRef.update(this.state);

        // log profile as completed
        this.props.toggleNewUser();
    }
    
    render() {
        return (
            <div id="content">
                {/* <!-- profile image --> */}
                <div id="profile" className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            {/* <!-- start avatar and bio --> */}
                            <form>
                                {/* <div className="im-g">
                                    <img src={this.state.photo} 
                                        alt="profile picture" />
                                </div> */}
                                <div className="col-md-6 form-group">
                                    <label for="firstname">Profile Picture URL</label>
                                    <input onChange={(e) => this.handleInputChange(e)} 
                                            type="text" 
                                            name="photo"
                                            className="form-control" 
                                            placeholder="Url here" 
                                            aria-label="fill in profile picture URL" />
                                </div>
                                <div className="form-group">
                                    <label for="personal information">Personal Bio</label>
                                    <textarea className="form-control" 
                                                name="bio" 
                                                rows="3" 
                                                onChange={(e) => this.handleInputChange(e)}></textarea>
                                </div>
                            </form>
                            {/* <!-- end avatar and bio --> */}
                        </div>

                        <div className="col-6">
                            <div className="first-line agileits">
                                {/* <!-- name --> */}
                                <div className="col-md-6 form-group">
                                    <label for="name">Full Name</label>
                                    <input onChange={(e) => this.handleInputChange(e)} 
                                            type="text" 
                                            name="name"
                                            className="form-control" 
                                            placeholder="Full name" 
                                            aria-label="fill in name" />
                                </div>
                                {/* <!-- monel pool contribution --> */}
                                <label for="Remaining">Set weekly money pool contribution</label>
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <span className="input-group-text">$10.00 &le; </span>
                                    </div>
                                    <input onChange={(e) => this.handleInputChange(e)} 
                                            type="text" 
                                            name="contribution"
                                            className="form-control" 
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                </div>
                                {/* <!-- trading --> */}
                                <div className="form-group">
                                    <label for="goods/services">Goods / Services to Trade</label>
                                    <textarea onChange={(e) => this.handleInputChange(e)} 
                                            name="tradeOffer"
                                            className="form-control" 
                                            id="trading" 
                                            rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <button type="button" 
                                className="btn btn-outline-info" 
                                onClick={(e) => this.updateUserProfile(e)}>
                                <NavLink exact to={"/profile/" + this.props.uid}>
                                    Submit Changes
                                </NavLink>
                        </button>
                    </div>
                </div>
                <div className="line"></div>
            </div>
        );
    }
}

export default ProfileForm;