import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
            <div class="col-sm" id="pool">
            <h2>Fund Pool</h2>
            <div id="total">TOTAL: $555555.99/wk</div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Commitment</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" class="align-middle">1</th>
                            <td class="align-middle">Person A</td>
                            <td class="align-middle">$$$ Wk</td>
                            <td class="align-middle"><Link to="/personal-chat" class="btn btn-secondary">Message</Link></td>
                        </tr>
                        <tr>
                            <th scope="row" class="align-middle">1</th>
                            <td class="align-middle">Person A</td>
                            <td class="align-middle">$$$ Wk</td>
                            <td class="align-middle"><Link to="/personal-chat" class="btn btn-secondary">Message</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HomePage;