import React, {Component} from 'react';
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
         * donation - keeping track of the donation input
         * block purchase - votes to forbid people to buy
         * totalUsers - all the users in the group
         *///, blockPurchase: 0
        this.state = {availableFunds: undefined};
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
        let transactionRef = firebase.database().ref('fundHistory').child(firebase.database.ServerValue.TIMESTAMP);

        let newTransaction = {};
        newTransaction.amount = this.state.donation;
        newTransaction.user = this.props.currentUser;
        newTransaction.time = firebase.database.ServerValue.TIMESTAMP;

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

    // Handle the donations
    handleTransaction(amount) {
        amount = parseFloat(amount);
        let newFund = {};
        newFund.amount = amount;
        newFund.userId = this.props.currentUser.uid;
        newFund.time = firebase.database.ServerValue.TIMESTAMP;

        firebase.database().ref('fundHistory').push(newFund);
        this.refFund.set(amount + this.state.availableFunds);
    }

    componentDidMount() {
        // this.fundHistoryRef = firebase.database().ref('fundHistory');
        // this.fundHistoryRef.on('value', (snapshot) => {
        //     console.log(snapshot.val());
        //
        //     this.setState({ transactions: snapshot.val() });
        // });
        //
        // this.fundRef = firebase.database().ref('fundHistory').child('availableFunds');
        // this.fundRef.on('value', (snapshot) => {
        //     console.log(snapshot.val());
        //
        //     this.setState({ availableFunds: snapshot.val() });
        // });

        // Reference available funds
        this.refFund = firebase.database().ref('availableFunds');

        this.refFund.on("value", (snapshot) => {
            console.log(snapshot.val());
            this.setState({availableFunds: snapshot.val()})
        });

        // Reference to users
        this.refUsers = firebase.database().ref('users');

        this.refUsers.on("value", (snapshot) => {
            let totalUsers = Object.keys(snapshot.val()).length;
            this.setState({totalUsers});
        });

        // Reference to block users TODO
        this.refBlock = firebase.database().ref('blockPurchase');
        this.refBlock.on("value", (snapshot) => {
            this.setState({blockPurchase: snapshot.val()});
        });
    }

    handleBlock() {
        console.log("BLOCK: userID: ", this.props.currentUser.uid);
        // console.log("BLOCK: status: ", status);
        console.log("BLOCK ref: ", this.state.blockPurchase);

        let newBlock = this.state.blockPurchase;
        if (newBlock === null) newBlock = {};
        let userVote = newBlock[this.props.currentUser.uid];
        newBlock[this.props.currentUser.uid] = userVote === undefined ? true : null;
        this.refBlock.set(newBlock).catch((err) => {
            console.log(err)
        });
        // this.refBlock.child(this.props.currentUser.uid).on("value", (snapshot) =>{
        //     let status = snapshot.val();
        //
        //     if (status === null){
        //         let newInstance = {};
        //         newInstance[this.props.currentUser.uid] = true;
        //         this.refBlock.set(newInstance)
        //     } else{
        //         let newInstance = {};
        //         newInstance[this.props.currentUser.uid] = null;
        //         this.refBlock.set(newInstance)
        //     }
        // });


    }

    /* TODO */
    handleBuy() {
        this.refFund.set(this.props.handle);
    }

    componentWillUnmount() {
        console.log("Will unmount ?");
        this.refFund.off();
        this.refUsers.off();
        this.refBlock.off()
    }

    render() {
        console.log(this.state.donation);
        //let blockLength = this.state.blockPurchase === undefined || null ? 0 : Object.keys(this.state.blockPurchase).length;
        let blockLength;
        console.log("block length: = ", this.state.blockPurchase);
        if (this.state.blockPurchase === null || !this.state.blockPurchase) {
            blockLength = 0;
        } else {
            blockLength = Object.keys(this.state.blockPurchase).length;
        }
        return (
            <div>
                <h2>Donate your money to your friendly group!</h2>
                <div className="row">

                    <div className={"col-6"}>
                        {/* <!-- monel pool contribution --> */}
                        <label htmlFor="money">Donate to money pool</label>
                        <div className="input-group">

                            {/*Button to buy item*/}
                            <button className="input-group-append btn btn-secondary"
                                    disabled={!this.props.priceTopItem || this.props.priceTopItem > this.state.availableFunds || this.state.blockPurchase / this.state.totalUsers > 0.5}
                                    onClick={() => {
                                        this.handleBuy()
                                    }}>
                                Buy item
                            </button>

                            {/*Button to block purchase*/}
                            <button className="input-group-append btn btn-secondary" onClick={() => this.handleBlock()}>
                                Block purchase
                            </button>

                            {/*Button to donate*/}
                            <button onClick={() => {
                                if (this.state.donation > 0) {
                                    this.handleTransaction(this.state.donation)
                                } else {
                                    alert("Your input should be larger than 0")
                                }
                            }} className="input-group-append btn btn-primary">
                                Donate
                            </button>
                            <input onChange={(e) => this.handleInputChange(e)}
                                   type="number"
                                   name="donation"
                                   className="form-control"
                                   aria-label="Dollar amount (with dot and two decimal places)"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div id="total">{"TOTAL: $" + this.state.availableFunds}</div>
                        <div id="blocks">{"BLOCKS: " + blockLength}</div>

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
// class History extends Component {
//
//     render() {
//         if (!this.props.transactions) return null;
//
//         let allTransactions = Object.keys(this.props.transactions).map((key) => {
//             return <Transaction key={key} transaction={this.props.transactions[key]}/>;
//         });
//
//         return (
//             <div className="trans_history">
//                 {allTransactions}
//             </div>
//         );
//     }
// }

