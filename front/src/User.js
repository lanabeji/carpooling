/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class User extends Component {

    constructor(Props) {
        super(Props);

        this.state = {
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
            fetch( '/createUsuario', { method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: this.state.name,
                    username: "",
                    password: "",
                    tipo: "",
                    profile_pic:this.state.foto ,
                    placa: "",
                    foto:"",
                })
            });
            this.setState({
                name: value
            });
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    render() {
        if (this.state.name != "" && this.state.foto != "") {
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
                    <form action="/action_page.php">
                        <div className="formName">
                            <div>insert your name</div>
                            <input name="name" id="inputName" placeholder="Somebody"/>
                        </div>
<<<<<<< Updated upstream
                        <div>
                            <input type="file" id="fotoI" onChange={this.handleFileUpload}/>
=======
                        <div className="formImage">
                            <input type="file" name="file" id="file" className="inputFile" onChange={this.handleFileUpload}/>
                            <label for="file">Choose a file</label>
                        </div>
                        <div className="formSubmit">
>>>>>>> Stashed changes
                            <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
                        </div>
                    </form>
                </div>
            );
        }
    }

}

export default User;