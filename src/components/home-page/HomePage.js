import React, {Component} from 'react';

import firebase from 'firebase/app';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.userProfilesRef = firebase.database().ref('users');
        this.userProfilesRef.on('value', (snapshot) => {

            // this is all our user data. look in the console for structure/names/types/etc. the important parts for the pool are the name, item, and price.
            // ill push changes when im done with the item, shouldnt take more than 20 mins but i want you 
            // to start this asap. youre going to want to use a mapping function 
            // (to the effect of: this.state.userProfilesData.map((userData) => <RowInOurTable />)
            // to turn the relevant information from each user into a row in our queue table.
            // look at chen's code (chat files) for examples if you want.
            // dont worry about "commit purchase" yet.
            // text if you have questions <3
            console.log(snapshot.val());
            this.setState({userProfilesData: snapshot.val()});
        });
        
    }

    componentWillUnmount() {
        this.userProfilesRef.off();
    }

    render() {

        return (
            <div>home</div>
        );
    }
}

export default HomePage;