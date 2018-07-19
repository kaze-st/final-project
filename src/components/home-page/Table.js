import React, {Component} from "react";
import firebase from "firebase/app";
import {Link} from 'react-router-dom';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = ({commitUsers: []});
    }

    componentDidMount() {
        this.userProfilesRef = firebase.database().ref('wishlist');


        this.userProfilesRef.on('value', (snapshot) => {


            let usersObject = snapshot.val(); //convert snapshot to value
            let usersKeys = Object.keys(usersObject);
            let usersArray = usersKeys.map((key) => { //map array of keys into array of tasks

                return usersObject[key]; //access element at that key

            });
            usersArray.sort((a, b) => {
                return this.getWeighedUrgency(a) - this.getWeighedUrgency(b);
            });
            this.setState({commitUsers: usersArray}, () => this.props.getPriorityItemCallBack(usersArray[0]));
        });
    }

     getWeighedUrgency(item) {
        let votes = 0;
        if (item.urgencyVotes !== null && item.urgencyVotes !== undefined){
            votes = Object.keys(item.urgencyVotes).length;
        }
        return (item.urgency - votes );
    }

    componentWillUnmount() {
        this.userProfilesRef.off();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        this.state.commitUsers.sort((a, b) => {
            return this.getWeighedUrgency(a) - this.getWeighedUrgency(b);
        });

        if (prevState.commitUsers[0] !== this.state.commitUsers[0]){
            console.log("previous priority: ", prevState.commitUsers[0], " this priority: ", this.state.commitUsers[0]);
            this.props.getPriorityItemCallBack(this.state.commitUsers[0]);
        }
    }

    render() {



        let contributions = this.state.commitUsers.map((item) => {
            console.log(typeof item.price);
            return <CommitmentRow
                currentUser={this.props.currentUser}

                key={item.id}
                item={item}/>
        });



        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Urgency count</th>
                        <th scope="col">Urgency Press</th>
                        <th scope="col">WishList Item</th>
                        <th scope="col">WishList Cost</th>
                        <th scope="col">Description</th>
                        <th scope="col">Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contributions}
                    </tbody>
                </table>
            </div>);
    }


}

/**
 * props:
 * user- user object
 * currId- current user id
 */
class CommitmentRow extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    handleUrgency(e) {
        e.preventDefault();

        // let urgencyVotes = firebase.database().ref('wishlist').child(this.props.item.id);

        let oldVotes = this.props.item.urgencyVotes;
        let currentVotes = oldVotes === undefined ?  {} : oldVotes;
        let currentUserVote =  currentVotes[this.props.currentUser.uid];
        currentVotes[this.props.currentUser.uid] = currentUserVote === undefined ? true: null;
        firebase.database().ref('wishlist').child(this.props.item.uid).child("urgencyVotes").set(currentVotes).catch((err) =>{alert(err.message)});
    }

    render() {
        /**
         * user info: urgency, handle, uid, item stats
         */
        console.log(this.props.item.urgencyVotes);
        let votes = 0;
        if (this.props.item !== null && this.props.item.urgencyVotes !== undefined){
            votes = Object.keys(this.props.item.urgencyVotes).length;
        }

        return (
            <tr>
                <td className="align-middle">
                    <Link to={"/profile/" + this.props.item.uid}>{this.props.item.handle}</Link>
                </td>
                <td className="align-middle">{votes}</td>
                <td className="align-middle"><span><button onClick={(e) => {
                    this.handleUrgency(e)
                }} className="btn btn-primary">Urgent</button></span></td>

                <td className="align-middle">{this.props.item.name}</td>
                <td className="align-middle">{this.props.item.price}</td>
                <td className="align-middle">{this.props.item.desc}</td>
                <td className="align-middle"><Link to={"/personal-chat/" + this.props.item.uid} className="btn btn-primary">Message</Link></td>
            </tr>
        );
    }
}