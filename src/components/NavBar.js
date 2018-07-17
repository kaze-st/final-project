import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

/**
 * props:
 * handle- currently signed in user
 * logout- logout function for this user
 */
class NavBar extends Component {
    render() {
        return (
            <nav id="sidebar">
            <div class="sidebar-header">
                <h3>weFund</h3>
                <strong>WF</strong>
            </div>

            <ul class="list-unstyled components">
                <li class="active">
                    <NavLink to="/home" activeClassName="sidebar.active">
                        <i class="fas fa-home"></i>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/profile/" + this.props.handle} activeClassName="sidebar.active">
                        <i class="fas fa-image"></i>
                        My Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trade" activeClassName="sidebar.active">
                        <i class="fas fa-exchange-alt"></i>
                        Trade
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat" activeClassName="sidebar.active">
                        <i class="fas fa-paper-plane"></i>
                        Group Chat
                    </NavLink>
                </li>
            </ul>

            <ul class="list-unstyled">
                <li>
                    <a onClick={this.props.logout} class="logOut">Log Out</a>
                </li>
            </ul>
        </nav>
        );
    }
}

export default NavBar;