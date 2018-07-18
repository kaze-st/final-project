import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        

        this.userProfilesRef = firebase.database().ref('users');
        this.userProfilesRef.on('value', (snapshot) => {

            
            // this is all our user data. look in the console for structure/names/types/etc. 
            // the important parts for the pool are the name, item, and price.
            // ill push changes when im done with the item, shouldnt take more than 20 mins but i want you 
            // to start this asap. youre going to want to use a mapping function 
            // (to the effect of: this.state.userProfilesData.map((userData) => <RowInOurTable />)
            // to turn the relevant information from each user into a row in our queue table.
            // look at chen's code (chat files) for examples if you want.
            // dont worry about "commit purchase" yet.
            // text if you have questions <3
            console.log(snapshot.val());
            
            let contributions = [];
            let total = 0;
            let usersObject = snapshot.val(); //convert snapshot to value
            let usersKeys = Object.keys(usersObject);
            let usersArray = usersKeys.map((key) => { //map array of keys into array of tasks
            
                let user = usersObject[key]; //access element at that key
                user.key = key;
                return user; //the transformed object to store in the array
            });

            usersArray.forEach( (user) => {
                if (user.contribution) {
                    
                    contributions.push(user);
                }

            });

            this.setState({totalContribution: total, commitUsers: contributions});
        });
        
    }

    componentWillUnmount() {
        this.userProfilesRef.off();
    }

    render() {

        if (this.state.commitUsers) {

            let contributions = this.state.commitUsers.map((user)=> {
                return <CommitmentRow 
                    name={user.name}   
                    contribution={user.contribution} 
                    id={user.key}
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
                                <th scope="col"></th>
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
            return(<div>Loading... </div>);
        }
    }
}

class CommitmentRow extends Component {
    
    render() {
        console.log(this.props);
        return (
        
            <tr>
                <td className="align-middle"><Link to={"/profile/" + this.props.id}>{this.props.id}</Link></td>
                <td className="align-middle">{this.props.contribution}</td>
                <td className="align-middle"><Link to="/personal-chat" className="btn btn-secondary">Message</Link></td>
            </tr>
        
        );
    }
}


export default HomePage;