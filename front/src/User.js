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
    }

    handleFileUpload(){

    }

    handleSubmit(){

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
                        <div>Please insert your name</div>
                        <input type="text" >
                        <input type="file" onChange={this.handleFileUpload} />
                        <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
                    </form>
                </div>
            );
        }
    }

}

export default User;