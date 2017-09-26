/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';

// import PropTypes from 'prop-types';

class User extends Component {

    constructor(Props) {
        super(Props);

        this.state = {
            username: "",
            password: "",
            pileName: "",
            profilePic: null,
            type: "passenger",
            plates: "",
            carPicture: null,
            logged: 0,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleReq = this.handleReq.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }



    handleRegister() {
        this.setState({logged: 1});
    }

    handleReq() {

        try {
            fetch('/createUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: this.state.pileName,
                    username: this.state.username,
                    password: this.state.password,
                    tipo: this.state.type,
                    profile_pic: this.state.profilePic,
                    placa: this.state.plates,
                    foto: this.state.carPicture,
                })
            });
            alert('User: ' + this.state.username + ' has been registered succesfully');
            this.setState({logged: 2});
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    handleCancel() {
        this.setState({logged: 0});
    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
    }

    handleLogin() {

        try {
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify({

                    name: this.state.pileName,
                    username: this.state.username,
                    password: this.state.password,
                    tipo: this.state.type,
                    profile_pic: this.state.profilePic,
                    placa: this.state.plates,
                    foto: this.state.carPicture,
                })
            });
            alert('User: ' + this.state.username + ' has logged in');
            this.setState({logged: 2});
        } catch (error) {
            console.log(error)
            alert(error)
        }

    }

    handleLogout(){
        this.setState({
            username: "",
            password: "",
            pileName: "",
            profilePic: null,
            type: "passenger",
            plates: "",
            carPicture: null,
            logged: 0,
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log(name + ": " + value);
    }


    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.name);
        // alert('An username was submitted: ' + this.state.username);
        // alert('A password was submitted: ' + this.state.password);
        var nombre = document.getElementById("inputName").value;


        event.preventDefault();
        try {
            fetch('/createUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: this.state.name,
                    username: "",
                    password: "",
                    tipo: "",
                    profile_pic: this.state.foto,
                    placa: "",
                    foto: "",
                })
            });
            this.setState({
                name: nombre
            });
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }


    validateType() {
        console.log(this.state.type);
        if (this.state.type === "driver") {
            return (
                <div>
                    <div>
                        <label>Plates</label>
                        <input type="text" name="plates" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Your car's photos</label>
                        <input type="file" name="carPicture" onChange={this.handleChange}/>
                    </div>
                </div>
            );
        }
    }

    validate() {

        if (this.state.logged === 0) {
            return (
                <form>
                    <h3>Sign In</h3>
                    <div>
                        <label>UserName</label>
                        <input type="text" name="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="button" value="Sign up" onClick={this.handleRegister}/>
                    </div>
                    <div>
                        <input type="button" value="Log in" onClick={this.handleLogin}/>
                    </div>
                </form>
            );
        }

        else if (this.state.logged === 1) {
            return (
                <form>
                    <h3>Sign up</h3>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Pile name</label>
                        <input type="text" name="pileName" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Profile picture</label>
                        <input type="file" name="profilePic" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Type</label>
                        <select name="type" onChange={this.handleTypeChange}>
                            <option value="passenger">Passenger</option>
                            <option value="driver">Driver</option>
                        </select>
                    </div>
                    {this.validateType()}
                    <div>
                        <input type="button" value="Register" onClick={this.handleReq}/>
                    </div>
                    <div>
                        <input type="button" value="Cancel" onClick={this.handleCancel}/>
                    </div>
                </form>
            )
        }

        else if (this.state.logged === 2) {
            return (
                <form>
                    <div>Welcome, {this.state.pileName}</div>
                    <div><img src={this.state.profilePic} alt={this.state.username+"_Avatar"}/></div>
                    <div>
                        <input type="button" onClick={this.handleLogout}/>
                    </div>
                </form>
            )
        }
    }

    render() {

        return (
            <div className="form">
                {this.validate()}
            </div>
        );

    }

}

export default User;