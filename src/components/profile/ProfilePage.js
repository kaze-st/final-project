import React, {Component} from 'react';


/**
 * props:
 * currentUID - uid of the currently logged in user
 */
class ProfilePage extends Component {

    render() {
        let content = null;
        //if (this.props.currentUID === )
        return (
            <div class="wrapper">
        <main>
            <div id="logo" class="d-flex justify-content-between">
                <img src="../img/logo.png" alt="logo" />
            </div>
            <div id="content">
                <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
                    <div class="container-fluid">

                        <button type="button" id="sidebarCollapse" class="btn">
                            <i class="fas fa-align-justify"></i>
                        </button>
                        <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="fas fa-align-justify"></i>
                        </button>
                    </div>
                </nav>
                {/* <!-- profile image --> */}
                <div id="profile" class="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            {/* <!-- start avatar and bio --> */}
                            <form>
                                <div class="im-g">
                                    <img src="/img/profile.png" alt="" />
                                </div>
                                <div>
                                    <button type="button" class="btn btn-outline-info">Change Profile Image</button>
                                </div>
                                <div class="form-group">
                                    <label for="personal information">Personal Bio</label>
                                    <textarea class="form-control" id="bio" rows="3"></textarea>
                                </div>
                            </form>
                            {/* <!-- end avatar and bio --> */}
                        </div>

                        <div class="col-6">
                            <div class="first-line agileits">
                                {/* <!-- name --> */}
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        <label for="firstname">First Name</label>
                                        <input type="text" class="form-control" placeholder="First name" aria-label="fill in first name" />
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label for="lastname">Last Name</label>
                                        <input type="text" class="form-control" placeholder="Last name" aria-label="fill in last name" />
                                    </div>
                                </div>
                                {/* <!-- monel pool contribution --> */}
                                <label for="Remaining">Set weekly money pool contribution</label>
                                <div class="input-group">
                                    <div class="input-group-append">
                                        <span class="input-group-text">$10.00 &le; </span>
                                    </div>
                                    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                </div>
                                {/* <!-- trading --> */}
                                <div class="form-group">
                                    <label for="goods/services">Goods / Services to Trade</label>
                                    <textarea class="form-control" id="trading" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line"></div>


                <footer class="container text-center">
                    <small>API from
                        <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html">amazon api</a>
                    </small>
                    <small>&copy; 2018 Alissa Adornato &amp; Emily Ding &amp; Hao Chen &amp; William Fu</small>
                </footer>
            </div>
        </main>
    </div>
        );
    }
}

export default ProfilePage;