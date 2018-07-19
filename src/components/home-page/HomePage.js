import React, {Component} from 'react';
import MoneyForm from './MoneyForm';
import Table from "./Table";
import HelpModal from '../HelpModal';

const PAGE_DESC = "This is the home page. Here, you can see everyone's requested items along with their priority. If you think one is really important (like a medical bill), you can vote it \"urgent\" to help them skip ahead a bit. Otherwise, each new item will be sent to the back of the line. You can pledge money to the pool to help whoever's next in line to afford their item, or vote to block that item if you disapprove of their purchase. Everyone gets a voice.";

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
                <HelpModal name="Home Page" desc={PAGE_DESC} />
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