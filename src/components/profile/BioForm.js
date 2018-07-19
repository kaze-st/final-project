

export default class BioForm extends Component {
    render() {
        return (
            <div>
                
                            {/* <!-- start avatar and bio --> */}

                            <form>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="firstname">Profile Picture URL</label>
                                        <input onChange={(e) => this.handleInputChange(e)}
                                            type="text"
                                            name="avatar"
                                            className="form-control"
                                            placeholder="Url here"
                                            aria-label="fill in profile picture URL" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="personal information">Personal Bio</label>
                                        <textarea className="form-control"
                                            name="bio"
                                            rows="3"
                                            onChange={(e) => this.handleInputChange(e)}></textarea>
                                    </div>
                                </div>
                            </form>
                            {/* <!-- end avatar and bio --> */}
                            
                            <div className="first-line agileits">
                                {/* <!-- name --> */}
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input onChange={(e) => this.handleInputChange(e)}
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Full name"
                                        aria-label="fill in name" />
                                </div>
                            </div>
                            <Button color="primary" onClick={(e) => { this.updateWishList(e) }}>
                                submit item
                            </Button>
            </div>
        );
    }
}