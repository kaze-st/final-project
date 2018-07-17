import React, {Component} from 'react';
import SignInForm from "./SignInForm";
import logo from "../../img/logo.png";

class SignInPage extends Component {

    render() {
        return (
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div id="logo" className="d-flex justify-content-between col">
                            <img src={logo} alt="logo"/>
                        </div>
                    </div>
                </div>

                <div id="content">
                    <div className="row">
                        <div className="container-fluid">

                            <div className="line"></div>

                            <div className="container justify-content-between">
                                <SignInForm handleSignIn={this.props.handleSignIn} handleSignUp={this.props.handleSignUp}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default SignInPage;