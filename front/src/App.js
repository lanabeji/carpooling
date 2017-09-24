import React, {Component} from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import User from './User.js';
import Trips from './Trips.js';
// import PropTypes from 'prop-types';
import './App.css';

class App extends Component {



    constructor(props){
        super(props);

        this.state={
            trips: []
        }
    }

    componentDidMount(){

        fetch('/getViajes').then(response => response.json())
            .then(json => {
                this.setState({
                    trips: json.data
                }, console.log(json));
            });
    }


    render() {
        return (

            <div className="App">
                <h1>AAPrueba</h1>
                {this.state.trips}
            </div>

        );
    }
}

// App.propTypes = {
//
// }
export default App;
