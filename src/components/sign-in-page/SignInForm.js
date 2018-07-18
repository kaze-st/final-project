import React, {Component} from 'react';

class SignInForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,

        }
    }

    handleInputChange(event) {
        let field = event.target.name; //which input
        let value = event.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }



    //handle signIn button
    signInChange(event) {
        console.log("sign in called");
        event.preventDefault(); //don't submit
        this.props.handleSignIn(this.state.email, this.state.password);
    }

    render() {
        return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input  className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        aria-describedby="emailHelp"
                       placeholder="Enter email" onChange={(event) => {
                    this.handleInputChange(event)
                }}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input className="form-control"
                       id="password"
                       type="password"
                       name="password"
                       onChange={(event) => {
                           this.handleInputChange(event)
                       }}/>
            </div>



            <button type="submit" style={{marginRight: '10px'}} className="btn btn-success" onClick={(event) => {
                this.signInChange(event)
            }}>Sign in
            </button>

        </form>);
    }
}

export default SignInForm;