import React, {Component} from 'react';
import firebase from 'firebase/app';

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

            usersArray.forEach( (user) => {
                if (user.tradeOffers) {
                   
                    if (user.key == this.props.match.params.uid) {
                        user.tradeOffers.forEach( (offer) => {
                            myOffers.push(offer);
                        });
                    }
                    else {
                        // TODO: not ideal.  it should only showing items from a particular user
                        user.tradeOffers.forEach( (offer) => {
                            offer.key = user.key;
                            offer.ownerName = user.name;
                            otherOffers.push(offer);
                        });
                    }
                }

            });

            this.setState({loading: false, myOffers: myOffers, otherOffers: otherOffers});
        });
    }

    componentWillUnmount() {
      
    }

    render() {

        if (this.state.loading) {
            return <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
            </div>
        }

        let myItemRows = this.state.myOffers.map((offer)=> {
            return <div className="card my-1" key={offer.id}>
                        <div className="card-body">
                            <h5 className="card-title d-inline align-middle">{offer.name}</h5>
                            <p className="card-text d-inline align-middle">{" x "+offer.quantity}</p>
                            <a href="#" className="btn btn-danger d-inline float-right">X</a>
                        </div>
                    </div>
        });

        return (
            <div className="row mx-auto">
           
            <div className="col mx-auto">
            <div id="myItems">
                    <h2>My Items</h2>
                    <div id="myItemViewer" className="bg-white p-1 border border-dark rounded">                        
                        {myItemRows}
                    </div>
                </div>
                
                <div id="theirItems">
                    <h2>Their Items</h2>
                    <div id="theirItemViewer" className="bg-white p-1 border border-dark rounded">
                        <div className="card my-1">
                            <div className="card-body">
                                <h5 className="card-title d-inline align-middle">ITEM NAME </h5>
                                <p className="card-text d-inline align-middle">x9999</p>
                                <a href="#" className="btn btn-danger d-inline float-right">X</a>
                            </div>
                        </div>
                        <div className="card my-1">
                            <div className="card-body">
                                <h5 className="card-title d-inline align-middle">ITEM NAME </h5>
                                <p className="card-text d-inline align-middle">x9999</p>
                                <a href="#" className="btn btn-danger d-inline float-right">X</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="button" className="btn btn-success btn-block">
                    <h3>Commit TRADE</h3>
                </button>
            </div>
        </div>
        );
    }
}

export default TradePage;