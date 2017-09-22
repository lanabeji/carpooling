import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Driver from './DriverInfo.js';


class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            username: null,
            password: null,
            type: null,
            profile_pic: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        alert('An username was submitted: ' + this.state.username);
        alert('A password was submitted: ' + this.state.password);
        event.preventDefault();

        try {
            fetch( '/createUsuario', { method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: this.state.name,
                    username: this.state.username,
                    password: this.state.password,
                    tipo: this.state.type,
                    profile_pic: this.state.profile_pic,
                    placa: "",
                    foto:""
                })
            });
            if (response.status === 460) {
                alert('Ya existe un usuario con ese usuario')
            }
            else throw new Error('Respuesta por parte del servidor no manejada en el front')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    
    render() {
        return (
            <div className="register-container">
                <div className="Form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" onChange={this.handleChange}
                                   className="form-control" id="exampleInputName1"
                                   aria-describedby="Name" placeholder="Enter your Name"/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" onChange={this.handleChange} className="form-control"
                                   id="exampleInputUsername1"
                                   aria-describedby="usernameHelp" placeholder="Enter your Username">
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" onChange={this.handleChange} className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Password">
                            </input>
                        </div>
                        <div className="form-group">
                            <label>User type</label>
                            <select name="type" onChange={this.handleChange} className="form-control"
                                    id="exampleFormControlSelect1">
                                <option value="passenger">Passenger</option>
                                <option value="driver">Driver</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Profile picture</label>
                            <input name="profile_pic" onChange={this.handleChange} type="file"
                                   className="form-control-file" id="exampleFormControlFile1">
                            </input>
                        </div>
                        <div id="driverInfo"/>
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

function driverAditionalInfo(props) {
    return <Driver/>;
}

function showAdInfo(props) {
    const type = props.typed;
    if(type=="driver"){
        return <driverAditionalInfo />;
    }
    return null;
}



export default Register;

/**
 * Created by Camilo on 18/09/17.
 */
