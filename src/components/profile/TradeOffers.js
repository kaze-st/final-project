import React, { Component } from 'react'
import { Button } from 'reactstrap';

import firebase from 'firebase/app';

/**
 * props:
 * currId- uid of profile's user
 * loggedId- uid of logged in user
 */
export class TradeItemList extends Component {

    constructor(props) {
        super(props);

        /**
         * state:
         * tradeOffers- trade items
         */
        this.state = {tradeOffers: undefined};
    }

    handleClick(e, i) {
        e.preventDefault();

        this.usersRef.child('tradeOffers').child(i).remove().catch((err) =>{alert(err.message)});
    }

    componentDidMount() {
        this.usersRef = firebase.database().ref('users').child(this.props.currId);

        this.usersRef.on('value', (snapshot) => {

            if (snapshot.val().tradeOffers) {
                let offers = snapshot.val().tradeOffers;

                let tradeItemArray = Object.keys(offers).map((index) => {
                    let tradeItem = offers[index];
                    return (
                        <div>
                        {this.props.loggedId === this.props.currId ? <Button className="tradeItemButtonClose" color="danger" onClick={ (e) =>  this.handleClick(e, index) } >X</Button> : ""}
                        <TradeItem name={tradeItem.name} 
                                    key={index}
                                    desc={tradeItem.desc}
                                    quantity={tradeItem.quantity} />
                        </div>
                    );
                });

                this.setState({tradeOffers: tradeItemArray});
            }
        });
    }

    componentWillUnmount() {
        this.usersRef.off();
    }
   
    render() {
        return (
            <ol>
                {this.state.tradeOffers}
            </ol>
        );
    }
}

/**
 * props:
 * name- title of item
 * desc- description of item
 * quantity- how many available
 */
export class TradeItem extends Component {
    render() {
        let name = this.props.name;
        if (this.props.quantity) {
            name += " x" + this.props.quantity;
        }
        return (
            <li>
                <h3>{name}</h3>
                <p>{this.props.desc}</p>
            </li>
        );
    }
}


/**
 * props:
 * currId- uid of profile's user
 */
export class TradeItemForm extends Component {

    constructor(props) {
        super(props);
        this.state = {index: 0};
    }

    handleInputChange(e) {
        let field = e.target.name; //which input
        let value = e.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    componentDidMount() {
        this.usersRef = firebase.database().ref('users').child(this.props.currId).child('tradeOffers');

        this.usersRef.once('value').then((snapshot) => {
            if (snapshot.val()) {
                this.setState({index: Object.keys(snapshot.val()).length})
            } else {
                this.setState({index: 0});
            }});
    }

    componentWillUnmount() {
        this.usersRef.off();
    }

    handleTradeClick(event) {
        event.preventDefault();

        let usersRef = firebase.database().ref('users').child(this.props.currId).child('tradeOffers');

        var clone = Object.assign({}, this.state);
        delete clone.index;

        let toAdd = {};
        toAdd[this.state.index] = clone;

        usersRef.update(toAdd).catch((err) =>{alert(err.message)});

        this.setState({index: this.state.index + 1});
    }

    render() {
        return (
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
            
                <label className="input-group">Quantity (if applicable):</label>
                <input 
                    type="text" 
                    name="quantity"
                    className="form-control input-group"
                    placeholder="How many?"  
                    onChange={(e) => this.handleInputChange(e)}/>

                <label className="input-group">Description:</label>
                <textarea 
                    className="form-control" 
                    name="desc" 
                    rows="3" 
                    placeholder="What's its condition? Any special terms?"
                    onChange={(e) => this.handleInputChange(e)}></textarea>
            </div>
            <Button color="primary" onClick={(e) => this.handleTradeClick(e) }>
                submit item
            </Button>
        </form>
        );
    }
}