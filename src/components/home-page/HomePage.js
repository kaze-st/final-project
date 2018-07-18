import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    componentWillUnmount() {
        this.userProfilesRef.off();
    }

    render() {

        if (this.state.commitUsers) {

            let contributions = this.state.commitUsers.map((user) => {
                return <CommitmentRow
                    displayName={user.handle}
                    contribution={user.contribution}
                    id={user.key}
                    item={user.itemName}
                    key={user.key} />
            });

            let total = this.state.commitUsers.reduce((total, user) => {
                if (!isNaN(user.contribution)) {
                    return parseFloat(total) + parseFloat(user.contribution);
                } else {
                    return total;
                }
            }, 0);

            return (
                <div className="col-sm" id="pool">
                    <h2>Fund Pool</h2>
                    <div id="total">{"TOTAL: $" + total + "/wk"}</div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Commitment</th>
                                <th scope="col">WishList Item</th>
                                <th scope="col">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions}
                        </tbody>
                    </table>
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
                <td className="align-middle"><Link to={"/personal-chat/" + this.props.id} className="btn btn-secondary">Message</Link></td>
            </tr>
        );
    }
}


export default HomePage;