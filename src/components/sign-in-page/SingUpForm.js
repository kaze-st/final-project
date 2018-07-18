import React, {Component} from 'react';

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            'handle': undefined,
            'avatar': '' //default to blank value;
        }
    }

    handleInputChange(event) {
        let field = event.target.name; //which input
        let value = event.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    //handle signUp button
    signUpChange(event) {
        console.log("sign up called");
        event.preventDefault(); //don't submit
        let avatar = this.state.avatar || 'img/no-user-pic.png'; //default to local pic
        this.props.handleSignUp(this.state.email, this.state.password, this.state.handle, avatar);
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

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Username</label>
                    <input className="form-control"
                           id="handle"
                           name="handle"
                           onChange={(event) => {
                               this.handleInputChange(event)
                           }}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Avatar</label>
                    <input className="form-control"
                           id="avatar"
                           name="avatar"
                           placeholder="http://www.example.com/my-picture.jpg"
                           onChange={(event) => {
                               this.handleInputChange(event)
                           }}/>
                </div>

                <button type="submit" className="btn btn-success" onClick={(event) => {
                    this.signUpChange(event)
                }}>Sign Up
                </button>
            </form>);
    }
}

export default SignUpForm;