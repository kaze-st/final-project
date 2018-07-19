import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TradeItemList, AddItemForm } from "./TradeOffers";

import firebase from 'firebase/app';

/**
 * props:
 * uid- uid of editing user
 * toggleNewUser- callback to declare user profile filled out
 */
class ProfileForm extends Component {

    constructor(props) {
        super(props);

        this.state = { tradeOffers: [] };
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
        currentUserRef.update(this.state);

        // log profile as completed
        this.props.toggleNewUser();
    }

    handleTradeClick(event, offer) {
        event.preventDefault();

        let currOffers = this.state.tradeOffers;
        currOffers.push(offer);
        this.setState({ tradeOffers: currOffers });
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
                        </div>
                        <div className="row">
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
                        <div className="col-sm-4">
                            <h2>My Item</h2>
                        </div>
                        <div classnName="col-sm">
                            <form>
                                <div className="input-group">
                                    <label className="input-group">Product Name:</label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        className="form-control"
                                        aria-label="fill in group name"
                                        placeholder="What is it?"
                                        onChange={(e) => this.handleInputChange(e)} />

                                    <label className="input-group">Asking Price:</label>
                                    <input onChange={(e) => this.handleInputChange(e)}
                                        type="number"
                                        name="itemCost"
                                        className="form-control"
                                        aria-label="Dollar amount (with dot and two decimal places)" />

                                    <label className="input-group">Description:</label>
                                    <textarea
                                        className="form-control"
                                        name="itemDesc"
                                        rows="3"
                                        placeholder="What's its condition? Any special terms?"
                                        onChange={(e) => this.handleInputChange(e)}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="line"></div>

                        {/* <!-- trading --> */}

                        <div className="row">
                            <div className="col-sm-4">
                                <h2>Trading</h2>
                            </div>
                            <div className="col-sm">
                                {<TradeItemList items={this.state.tradeOffers} />}
                            </div>
                            <div className="col-sm">
                                {<AddItemForm howToAdd={(event, offer) => this.handleTradeClick(event, offer)} />}
                            </div>
                        </div>
                        <div className="line"></div>

                        <button type="button"
                            className="btn btn-outline-info"
                            onClick={(e) => this.updateUserProfile(e)}>
                            <NavLink exact to={"/profile/" + this.props.uid}>
                                Submit Changes
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default ProfileForm;
