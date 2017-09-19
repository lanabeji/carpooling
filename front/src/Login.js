import React, {Component} from 'react';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = null;
    }

    render() {
        return (
            <div className="login-container">
                <div className="Form-container">
                    <form>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email">
                            </input>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your
                                email with anyone else.
                            </small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="Password">
                            </input>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input">
                                </input>
                                Check me out
                            </label>
                        </div>
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Login;
