import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TradeItemList, TradeItemForm } from "./TradeOffers";
import ItemForm from './ItemForm';

import firebase from 'firebase/app';

/**
 * props:
 * uid- uid of editing user
 * handle- handle of editing user
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
        currentUserRef.update(this.state).catch((err) =>{alert(err.message)});

        // log profile as completed
        this.props.toggleNewUser();
    }

    render() {
        return (
            <div id="content">
                <div id="profile" className="container-fluid">

                    <div className="row">

                        <div className="col-sm-4">
                            <h2>Personal Info</h2>

                        </div>
                        <div className="col">
                            {/* <!-- start avatar and bio --> */}

                            <form>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="firstname">Profile Picture URL</label>
                                        <input onChange={(e) => this.handleInputChange(e)}
                                            type="text"
                                            name="avatar"
                                            className="form-control"
                                            placeholder="Url here"
                                            aria-label="fill in profile picture URL" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="personal information">Personal Bio</label>
                                        <textarea className="form-control"
                                            name="bio"
                                            rows="3"
                                            onChange={(e) => this.handleInputChange(e)}></textarea>
                                    </div>
                                </div>
                            </form>
                            {/* <!-- end avatar and bio --> */}
                            
                            <div className="first-line agileits">
                                {/* <!-- name --> */}
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input onChange={(e) => this.handleInputChange(e)}
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Full name"
                                        aria-label="fill in name" />
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="row">
                        {/* item requested */}
                        {<ItemForm uid={this.props.uid} handle={this.props.handle} />}

                        <div className="line"></div>

                        {/* <!-- trading --> */}

                        <div className="row">
                            <div className="col-sm-4">
                                <h2>Trading</h2>
                            </div>
                            <div className="col-sm">
                                {<TradeItemList loggedId={this.props.match.params.uid} currId={this.props.uid} />}
                            </div>
                            <div className="col-sm">
                                {<TradeItemForm currId={this.props.uid} />}
                            </div>
                        </div>
                        <div className="line"></div>


                        <button type="button"
                            className="btn btn-outline-info"
                            onClick={(e) => this.updateUserProfile(e)}>
                            <NavLink strict to={"/profile/" + this.props.uid}>
                                Submit All Changes
                            </NavLink>
                        </button>

                    </div>
                </div>
            </div >
        );
    }
}

export default ProfileForm;
