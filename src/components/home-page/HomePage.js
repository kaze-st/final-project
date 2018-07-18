import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class HomePage extends Component {

    render() {
        return (
            <div class="col-sm" id="pool">
            <h2>Fund Pool</h2>
            <div id="total">TOTAL: $555555.99/wk</div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Commitment</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" class="align-middle">1</th>
                            <td class="align-middle">Person A</td>
                            <td class="align-middle">$$$ Wk</td>
                            <td class="align-middle"><Link to="/personal-chat" class="btn btn-secondary">Message</Link></td>
                        </tr>
                        <tr>
                            <th scope="row" class="align-middle">1</th>
                            <td class="align-middle">Person A</td>
                            <td class="align-middle">$$$ Wk</td>
                            <td class="align-middle"><Link to="/personal-chat" class="btn btn-secondary">Message</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HomePage;