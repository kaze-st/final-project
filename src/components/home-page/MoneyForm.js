import React, { Component } from 'react';

import firebase from 'firebase/app';

export default class MoneyForm extends Component {

    // old cycling code (cycle and commit Item). must be converted to work in MoneyForm
    // a week has passed...
    cycle(rate) {
        // update weeks, total
        let newTotal = this.state.total + rate;
        this.setState({ total: newTotal });
        let i = 0;

        while (i < this.state.commitUsers.length && newTotal >= this.state.commitUsers[0].itemCost) {
            let topUser = this.state.commitUsers[0];
            this.commitItem(topUser);
            i++;
        }
    }

    // what to do if we can afford the top item
    commitItem(topUser) {
        // subtract money
        this.setState({ total: this.state.total - topUser.itemCost });

        // remove item data from profile
        topUser.itemCost = 0;
        topUser.itemName = "";
        topUser.itemDesc = "";

        // fix ranks
        let newUsers = this.state.commitUsers;
        newUsers.forEach(user => {
            user.rank -= 1;
        });
        topUser.rank = newUsers.length;

        // push user changes
        newUsers.splice(0, 1);
        newUsers.push(topUser);
        this.setState({ commitUsers: newUsers });
        console.log(this.state.commitUsers);

        this.state.commitUsers.forEach((user) => {
            console.log(user)
            let currentUserRef = firebase.database().ref('users').child(user.id);
            currentUserRef.update(user);
        });
    }

    // log the donation into the database
    // enters a new transaction into the database
    handleTransaction() {
        let fundRef = firebase.database().ref('fundHistory');
        let transactionRef = fundRef.child(Object.keys(fundRef).length);

        let newTransaction = {};
        newTransaction.amount = this.state.donation;

        transactionRef.set(newTransaction);
    }

    // save donation in the state
    handleInputChange(e) {
        let field = e.target.name; //which input
        let value = e.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    componentDidMount() {
        this.fundRef = firebase.database().ref('fundHistory').child('availableFunds');
        this.fundRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            let availableFunds = snapshot.val(); //convert snapshot to value

            this.setState({ availableFunds: availableFunds });
        });
    }

    componentWillUnmount() {
        this.fundRef.off();
    }

    render() {
        return (
            <div>
                <h2>Donate your money to your friendly group!</h2>
                <div className="row">            
            
                <div className={"col-6"}>
                    {/* <!-- monel pool contribution --> */}
                    <label htmlFor="money">Donate to money pool</label>
                    <div className="input-group">
                        <button onClick={(e) => this.handleTransaction(e)} className="input-group-append btn btn-primary">
                            Donate
                        </button>
                        <input onChange={(e) => this.handleInputChange(e)}
                            type="number"
                            name="donation"
                            className="form-control"
                            aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

