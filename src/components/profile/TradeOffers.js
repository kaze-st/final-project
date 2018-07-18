import React, { Component } from 'react'
import { Button } from 'reactstrap';

/**
 * props:
 * items- tradable items 
 */
export class TradeItemList extends Component {
   
    render() {
        let tradeComponents = this.props.items.map((tradable) => {
            return (
                <TradeItem name={tradable.name} 
                            key={tradable.name}
                            desc={tradable.desc}
                            quantity={tradable.quantity} />
            );
        });

        return (
            <ol>
                {tradeComponents}
            </ol>
        );
    }
}

/**
 * props:
 * name- title of item
 * desc- description of item
 * quantity- how many available
 */
export class TradeItem extends Component {
    render() {
        let name = this.props.name;
        if (this.props.quantity) {
            name += " x" + this.props.quantity;
        }
        return (
            <li>
                <h3>{name}</h3>
                <p>{this.props.desc}</p>
            </li>
        );
    }
}


/**
 * props:
 * howToAdd- callback to add item to list
 */
export class AddTradeItemForm extends Component {

    handleInputChange(e) {
        let field = e.target.name; //which input
        let value = e.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    render() {
        return (
        <form>
            <div className="input-group">
                <label className="input-group">Product Name:</label>
                <input 
                    type="text" 
                    name="name"
                    className="form-control" 
                    aria-label="fill in group name" 
                    placeholder="What is it?" 
                    onChange={(e) => this.handleInputChange(e)}/>
            
                <label className="input-group">Quantity (if applicable):</label>
                <input 
                    type="text" 
                    name="quantity"
                    className="form-control input-group"
                    placeholder="How many?"  
                    onChange={(e) => this.handleInputChange(e)}/>

                <label className="input-group">Description:</label>
                <textarea 
                    className="form-control" 
                    name="desc" 
                    rows="3" 
                    placeholder="What's its condition? Any special terms?"
                    onChange={(e) => this.handleInputChange(e)}></textarea>
            </div>
            <Button color="primary" onClick={(e) => {
                    this.state.id = Math.random().toString(36).substring(7);
                    this.props.howToAdd(e, this.state)}}>
                submit item to trade
            </Button>
        </form>
        );
    }
}