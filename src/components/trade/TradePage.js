import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TradeModal from "./TradeModal";
import HelpModal from "../HelpModal";

import firebase from 'firebase/app';

const PAGE_DESC = "This is the trading page. Everyone can put up things they don't want anymore, or services like babysitting. Start a chat with someone if you're interested in their offer!";

class TradePage extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    // Life cycle events
    componentDidMount() {

        this.userProfilesRef = firebase.database().ref('users');

        this.userProfilesRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            let myOffers = [];
            let otherOffers = [];

            let usersObject = snapshot.val(); //convert snapshot to value
            let usersKeys = Object.keys(usersObject);
            let usersArray = usersKeys.map((key) => { //map array of keys into array of tasks
                let user = usersObject[key]; //access element at that key
                user.key = key;
                return user; //the transformed object to store in the array
            });

            usersArray.forEach((user) => {
                if (user.tradeOffers) {

                    if (user.key === this.props.match.params.uid) {
                        Object.keys(user.tradeOffers).forEach((index) => {
                            let offer = user.tradeOffers[index];
                            offer.key = user.id + offer.index;
                            myOffers.push(offer);
                        });
                    }
                    else {
                        Object.keys(user.tradeOffers).forEach((index) => {
                            let offer = user.tradeOffers[index];
                            offer.key = user.id + offer.index;
                            offer.id = user.id + offer.index;
                            offer.ownerName = user.name;
                            otherOffers.push(offer);
                        });
                    }
                }
            });

            this.setState({ loading: false, myOffers: myOffers, otherOffers: otherOffers });
        });
    }

    componentWillUnmount() {
        this.userProfilesRef.off();
    }

    render() {

        if (this.state.loading) {
            return <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
            </div>
        }

        let myItemRows = this.state.myOffers.map((offer) => {

            return <div className="card my-1">
                <div className="card-body">
                    <h5 className="card-title d-inline align-middle">{offer.name}</h5>
                    <p className="card-text d-inline align-middle">{" x " + offer.quantity}</p>
                </div>
            </div>
        });

        let theirItemRows = this.state.otherOffers.map((offer) => {
            return <div className="card my-1" key={offer.id}>
                <div className="card-body">
                    <h5 className="card-title d-inline align-middle">{offer.name}</h5>
                    <p className="card-text d-inline align-middle">{" x " + offer.quantity}</p>
                    <TradeModal key={offer.id} name={offer.name} desc={offer.desc} offererId={offer.id} />
                </div>
            </div>
        });

        return (

            <div className="row mx-auto">
                <div className="col mx-auto">
                    <h5 className="card-title d-inline align-middle"><strong>Note: </ strong>
                        Keep yourself online to store your <strong className="bg-white p-1 border rounded">Items</strong> available.
                     Click the <strong className="bg-white p-1 border rounded">Details</strong> to ask for trading!</h5>
                    <HelpModal name="Trading Page" desc={PAGE_DESC} />
                    <div id="myItems">
                        <h2>My Items</h2>
                        <div id="myItemViewer" className="bg-white p-1 border border-dark rounded">
                            {myItemRows.length === 0 ? <p>None. Add items from <Link style={Object.assign(
                                {},
                                { color: "blue" }
                            )} to={"/profile/" + this.props.match.params.uid}>your profile!</Link></p> : myItemRows}
                        </div>
                    </div>

                    <div id="theirItems">
                        <h2>Their Items</h2>
                        <div id="theirItemViewer" className="bg-white p-1 border border-dark rounded">
                            {theirItemRows.length === 0 ? <p>No one has goods or services to trade right now. Check back later!</p> : theirItemRows}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradePage;
