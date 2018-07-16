import React, {Component} from 'react';
import {Route, Link, Redirect, NavLink} from 'react-router-dom';

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
                    <NavLink to="/home" activeClassName="activeLink">
                        <i class="fas fa-home"></i>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/profile/" + this.props.handle} activeClassName="activeLink">
                        <i class="fas fa-image"></i>
                        My Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trade" activeClassName="activeLink">
                        <i class="fas fa-paper-plane"></i>
                        Trade [gimmie an icon for this]
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat" activeClassName="activeLink">
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