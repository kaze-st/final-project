import React, { Component } from 'react';
import firebase from 'firebase/app';


/**
 * props:
 * currentUser- logged in user
 */
export default class MoneyForm extends Component {

    constructor(props) {
        super(props);

        /**
         * state:
         * availableFunds- money on hand
         * transactions- list of transactions performed
         */
        this.state = {availableFunds: 0};
    }

    // // old cycling code (cycle and commit Item). must be converted to work in MoneyForm
    // // a week has passed...
    // cycle(rate) {
    //     // update weeks, total
    //     let newTotal = this.state.total + rate;
    //     this.setState({ total: newTotal });
    //     let i = 0;

    //     while (i < this.state.commitUsers.length && newTotal >= this.state.commitUsers[0].itemCost) {
    //         let topUser = this.state.commitUsers[0];
    //         this.commitItem(topUser);
    //         i++;
    //     }
    // }

    // // what to do if we can afford the top item
    // commitItem(topUser) {
    //     // subtract money
    //     this.setState({ total: this.state.total - topUser.itemCost });

    //     // remove item data from profile
    //     topUser.itemCost = 0;
    //     topUser.itemName = "";
    //     topUser.itemDesc = "";

    //     // fix ranks
    //     let newUsers = this.state.commitUsers;
    //     newUsers.forEach(user => {
    //         user.rank -= 1;
    //     });
    //     topUser.rank = newUsers.length;

    //     // push user changes
    //     newUsers.splice(0, 1);
    //     newUsers.push(topUser);
    //     this.setState({ commitUsers: newUsers });
    //     console.log(this.state.commitUsers);

    //     this.state.commitUsers.forEach((user) => {
    //         console.log(user)
    //         let currentUserRef = firebase.database().ref('users').child(user.id);
    //         currentUserRef.update(user);
    //     });
    // }

    // log the donation into the database
    // enters a new transaction into the database
    handleTransaction() {
        // TODO TIME
        let transactionRef = firebase.database().ref('fundHistory').child();

        let newTransaction = {};
        newTransaction.amount = this.state.donation;
        newTransaction.user = this.props.currentUser;
        newTransaction.time = 0;// TODO

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
        this.fundHistoryRef = firebase.database().ref('fundHistory');
        this.fundHistoryRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            this.setState({ transactions: snapshot.val() });
        });

        this.fundRef = firebase.database().ref('fundHistory').child('availableFunds');
        this.fundRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            this.setState({ availableFunds: snapshot.val() });
        });
    }

    componentWillUnmount() {
        this.fundRef.off();
        this.fundHistoryRef.off();
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
                            <button className="input-group-append btn btn-secondary">
                                Buy item
                            </button>
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
                    <div className="col-6">
                        <div id="total">{"TOTAL: $" + this.state.availableFunds}</div>
                        {/*this.state.transactions*/}
                        <History transactions={[]}/>
                    </div>

                </div>
            </div>
        );
    }
}

/**
 * props:
 * transactions- a list of transactions to be displayed
 */
class History extends Component {

    render() {
        if (!this.props.transactions) return null;

        let allTransactions = Object.keys(this.props.transactions).map((key) => {
            return <Transaction key={key} transaction={this.props.transactions[key]} />;
        });

        return (
            <div className="trans_history">
                {allTransactions}
            </div>
        );
    }
}

/**
 * props:
 * transaction- transaction object with time, amount, and user
 */
class Transaction extends Component {
    render() {
        console.log(this.props.user);
        return (
            <div className="trans_report">
                <div className="trans_report_img"><img src={this.props.transaction.user} alt="avatar"/></div>
                <p>{this.props.transaction.user.handle + ": $" + this.props.transaction.amount + " at " + this.props.transaction.time}</p>
            </div>
        );
    }
}