import React, {Component} from 'react';
import {Button} from 'reactstrap';

import firebase from 'firebase/app';

/**
 * props:
 * uid- asking user id
 * handle- asking user handle
 */
export default class ItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: this.props.uid,
            handle: this.props.handle,
            name: "",
            price: 0,
            desc: ""
        };
    }

    componentDidMount() {
        let wishlistRef = firebase.database().ref('wishlist');
        wishlistRef.once('value').then((snapshot) => {
            if (snapshot.val()) {

                this.setState({urgency: Object.keys(snapshot.val()).length});

            } else {

                this.setState({urgency: 0});

            }

        });
    }

    handleInputChange(e) {
        let field = e.target.name; //which input
        let value = e.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    updateWishList(e) {
        e.preventDefault();

        // reference to my current profile
        let newWishlistRef = firebase.database().ref('wishlist').child(this.props.uid);

        newWishlistRef.update(this.state).catch((err) => {
            alert(err.message)
        });
    }

    render() {
        return (
            <div>
                <div className="col-sm-4">
                    <h1>My Item</h1>
                </div>
                <div className="col-sm">
                    <form>
                        <div className="input-group">
                            <label className="input-group">Product Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                aria-label="fill in group name"
                                placeholder="What is it?"
                                onChange={(e) => this.handleInputChange(e)}/>

                            <label className="input-group">Asking Price:</label>
                            <input onChange={(e) => this.handleInputChange(e)}
                                   type="number"
                                   name="price"
                                   className="form-control"
                                   aria-label="Dollar amount (with dot and two decimal places)"/>

                            <label className="input-group">Description:</label>
                            <textarea
                                className="form-control"
                                name="desc"
                                rows="3"
                                placeholder="What's its condition? Any special terms?"
                                onChange={(e) => this.handleInputChange(e)}></textarea>
                        </div>
                    </form>
                    <Button color="primary" onClick={(e) => {
                        this.state.id = Math.random().toString(36).substring(7);
                        if (this.state.price > 0) {
                            if (this.state.name !== "") {
                                this.updateWishList(e);
                            } else {
                                alert("Your item needs a name!");
                            }

                        } else {
                            alert("Your price should be larger than 0");
                        }
                    }}>

                        submit item
                    </Button>
                </div>
            </div>
        );
    }
}
