import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * props:
 * uid- currently signed in user
 * logout- logout function for this user
 */
class NavBar extends Component {
    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>weFund</h3>
                    <strong>WF</strong>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <NavLink to="/home" activeClassName="sidebar.active">
                            <i className="fas fa-home"></i>
                            Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/profile/" + this.props.uid} activeClassName="sidebar.active">
                            <i className="fas fa-image"></i>
                            My Profile
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/trade/" + this.props.uid} activeClassName="sidebar.active">
                            <i className="fas fa-exchange-alt"></i>
                            Trade
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to="/chat" activeClassName="sidebar.active">
                            <i className="fas fa-paper-plane"></i>
                            Group Chat
                    </NavLink>
                </li>
                <li>
                <NavLink to={"/personal-chat/" + this.props.uid} activeClassName="sidebar.active">
                    <i className="fas fa-comments"></i>
                    Personal Chat
                </NavLink>
            </li>

                <li>
                    <NavLink to={"/about"} activeClassName="sidebar.active">
                        <i className="fas fa-info-circle"></i>
                        About
                    </NavLink>
                    </li>
                </ul>

                <ul className="list-unstyled">
                    <li>
                        <a onClick={this.props.logout} className="logOut">Log Out</ a>
                    </li>
                </ul>

                <footer class="container text-center">
                    <small>&copy; 2018 Alissa Adornato &amp; Emily Ding &amp; William Fu &amp; Hao Chen</small>
                </footer>
            </nav>
        );
    }
}

export default NavBar;