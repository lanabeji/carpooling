/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class User extends Component {

    constructor(Props) {
        super(Props);

        this.state = {
            logged: false,
            name: "",
            foto: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload(event) {

        // var selectedFile = document.getElementById('fotoI').files[0];
        var selectedFile = event.target.value;
        this.setState({
            foto: selectedFile
        });
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

    validate() {

        if (this.state.logged === false) {
            return (
                <form action="/action_page.php">
                    <h3> Sign in with your plat </h3>
                    <div className="formName">
                        <div>insert your name</div>
                        <input name="name" id="inputName" placeholder="Somebody"/>
                    </div>
                    <div>
                        <input type="file" id="fotoI" onChange={this.handleFileUpload}/>
                    </div>
                    <div className="formSubmit">
                        <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
                    </div>
                </form>
            );
        }
        else {
            return (
                <h1> You've been logged!</h1>
            )
        }
    }

    render() {
        if (this.state.name !== "" && this.state.foto !== "") {
            return (
                <div className="userContainer">
                    <img src={this.state.foto} alt={this.state.name + "userProfile"}/>
                    <div className="userName">{this.state.name}</div>
                </div>
            );
        }
        else {
            return (
                <div className="form">
                    {this.validate()}
                </div>
            );
        }
    }

}

export default User;