import React, {Component} from 'react';

class SignInForm extends Component {

    render() {
        return (<form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Username</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Username"/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Avatar</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Avatar"/>
            </div>

            <button type="submit" style={{marginRight: '10px'}} className="btn btn-success">Sign in</button>
            <button type="submit" className="btn btn-success">Sign Up</button>
        </form>);
    }
}

export default SignInForm;