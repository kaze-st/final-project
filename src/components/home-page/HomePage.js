import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {weeks: 0, total: 0};
    }

    componentDidMount() {
        this.userProfilesRef = firebase.database().ref('users');
        this.userProfilesRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            let usersObject = snapshot.val(); //convert snapshot to value
            let usersKeys = Object.keys(usersObject);
            let usersArray = usersKeys.map((key) => { //map array of keys into array of tasks

                let user = usersObject[key]; //access element at that key
                user.key = key;
                
                return user; //the transformed object to store in the array
            });

            this.setState({ commitUsers: usersArray });
        });
    }

    // a week has passed...
    cycle(rate) {
        // update weeks, total
        let newTotal = this.state.total + rate;
        this.setState({weeks: this.state.weeks + 1, total: newTotal});
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
        this.setState({total: this.state.total - topUser.itemCost});

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
        this.setState({commitUsers: newUsers});
        console.log(this.state.commitUsers);

        this.state.commitUsers.forEach((user) => {
            console.log(user)
            let currentUserRef = firebase.database().ref('users').child(user.id);
            currentUserRef.update(user);
        });
        
    }

    componentWillUnmount() {
        this.userProfilesRef.off();
    }

    render() {

        if (this.state.commitUsers) {

            this.state.commitUsers.sort(function(a, b) {
                return a.rank - b.rank;
            });

            let contributions = this.state.commitUsers.map((user) => {
                return <CommitmentRow
                    displayName={user.handle}
                    contribution={user.contribution}
                    id={user.key}
                    item={user.itemName}
                    itemCost={user.itemCost}
                    key={user.key} />
            });

            let rate = this.state.commitUsers.reduce((total, user) => {
                if (!isNaN(user.contribution)) {
                    return parseFloat(total) + parseFloat(user.contribution);
                } else {
                    return total;
                }
            }, 0);

            return (
                <div className="col-sm overflow-y: auto;" id="pool">
                    <h2>Fund Pool</h2>
                    <button onClick={() => this.cycle(rate)}>cycle me!</button>
                    <div id="rate">{"RATE: $" + rate + "/wk"}</div>
                    <div id="total">{"TOTAL: $" + this.state.total}</div>
                    <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Commitment</th>
                                <th scope="col">WishList Item</th>
                                <th scope="col">WishList Cost</th>
                                <th scope="col">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions}
                        </tbody>
                    </table>
                    </div>
                </div>
            );
        }
        else {
            return (<div>Loading... </div>);
        }
    }
}

class CommitmentRow extends Component {

    render() {
        return (
            <tr>
                <td className="align-middle">
                    <Link style={Object.assign(
                        {},
                        { color: "blue" }
                    )} to={"/profile/" + this.props.id}>{this.props.displayName}</Link>
                </td>
                <td className="align-middle">{this.props.contribution}</td>
                <td className="align-middle">{this.props.item}</td>
                <td className="align-middle">{this.props.itemCost}</td>
                <td className="align-middle"><Link to={"/personal-chat/" + this.props.id} className="btn btn-secondary">Message</Link></td>
            </tr>
        );
    }
}


export default HomePage;