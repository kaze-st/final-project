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



    // log the donation into the database
    // enters a new transaction into the database

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



    }

    /* TODO */
    handleBuy() {
        let subtract = this.state.availableFunds - parseFloat(this.props.priorityItem.price);
        this.refFund.set(subtract).catch((err) => {
            console.log(err)
        });

        firebase.database().ref('wishlist').child(this.props.priorityItem.uid).remove()
            .then(() => {
                this.cycle();
                this.props.handleBuyCallBack();
            });



    }

    cycle() {
        let listRef = firebase.database().ref('wishlist');

        listRef.once('value').then((snapshot) => {
            let wishes = snapshot.val();
            Object.keys(wishes).forEach((index) => {
                let wish = wishes[index];
                wish.urgency -= 1;
            });

            listRef.update(wishes);
        });
    }

    componentWillUnmount() {
        this.refFund.off();
        this.refUsers.off();
        this.refBlock.off()
    }

    render() {
        console.log(this.state.donation);
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
                                    disabled={!this.props.priorityItem
                                    || parseFloat(this.props.priorityItem.price) > this.state.availableFunds
                                    || this.state.blockPurchase / this.state.totalUsers > 0.5
                                    || this.props.priorityItem.uid !== this.props.currentUser.uid}
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


