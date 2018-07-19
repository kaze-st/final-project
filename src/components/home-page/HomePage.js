import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
        this.state = {priorityItem: undefined};
    }



    getPriorityItem(priorityItem) {
        console.log("priorityItem: ", priorityItem);
        this.setState({priorityItem})
    }

    handleBuy(){

        this.setState({priority:undefined});
    }

    render() {

        console.log("HOME PAGE priorityItem: ", this.state.priorityItem);


        return (
            <div>
                {<MoneyForm currentUser={this.props.currentUser} priorityItem={this.state.priorityItem} handleBuyCallBack={() =>{this.handleBuy()}}/>}
                <div className="col-sm overflow-y: auto;" id="pool">
                    <h2>Fund Pool</h2>
                    <Table getPriorityItemCallBack={(priorityItem) => {
                        this.getPriorityItem(priorityItem)
                    }} currentUser={this.props.currentUser}/>
                </div>
            </div>
        );

        return (<div>Loading... </div>);

    }
}





export default HomePage;