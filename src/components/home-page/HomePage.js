import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoneyForm from './MoneyForm';
import firebase from 'firebase/app';
import Table from "./Table";

/**
 * props:
 * currId- id of current user
 */
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    // componentDidMount() {
    //     this.userProfilesRef = firebase.database().ref('wishlist');
    //
    //     this.userProfilesRef.on('value', (snapshot) => {
    //         console.log(snapshot.val());
    //
    //         let usersObject = snapshot.val(); //convert snapshot to value
    //         let usersKeys = Object.keys(usersObject);
    //         let usersArray = usersKeys.map((key) => { //map array of keys into array of tasks
    //
    //             let user = usersObject[key]; //access element at that key
    //             user.key = key;
    //
    //             return user; //the transformed object to store in the array
    //         });
    //
    //         this.setState({ commitUsers: usersArray });
    //     });
    // }

    // componentWillUnmount() {
    //     this.userProfilesRef.off();
    // }

    render() {





            /*TODO Alissa pass in the price of the most expensive item*/
            return (
                <div>
                    {<MoneyForm currentUser={this.props.currentUser} priceTopItem={undefined}/>}
                <div className="col-sm overflow-y: auto;" id="pool">
                    <h2>Fund Pool</h2>
                    <Table currentUser={this.props.currentUser}/>
                </div>
                </div>
            );

            return (<div>Loading... </div>);

    }
}


// /**
//  * props:
//  * user- user object
//  * currId- current user id
//  */
// class CommitmentRow extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {};
//     }
//
//     handleUrgency(e) {
//         e.preventDefault();
//
//         let urgencyVotes = firebase.database().ref('wishlist').child(this.props.user.uid);
//
//         let oldVotes = this.state.urgencyVotes;
//         oldVotes === undefined ? oldVotes = {} : oldVotes;
//         oldVotes[this.props.currId] = true;
//         urgencyVotes.update({urgencyVotes: oldVotes});
//     }
//
//     render() {
//         /**
//          * user info: urgency, handle, uid, item stats
//          */
//         return (
//             <tr>
//                 <td className="align-middle">
//                     <Link to={"/profile/" + this.props.user.uid}>{this.props.user.handle}</Link>
//                 </td>
//                 <td className="align-middle"><span><button onClick={(e) => { this.handleUrgency(e)}} className="btn btn-primary">urgent</button></span>{this.props.user.urgency}</td>
//                 <td className="align-middle">{this.props.user.name}</td>
//                 <td className="align-middle">{this.props.user.price}</td>
//                 <td className="align-middle">{this.props.user.desc}</td>
//                 <td className="align-middle"><Link to={"/personal-chat/" + this.props.user.uid} className="btn btn-primary">Message</Link></td>
//             </tr>
//         );
//     }
// }


export default HomePage;