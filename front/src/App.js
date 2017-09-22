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


    render() {
        return (

            <div className="App">
                <Navbar/>
                <div className="App-content">
                    <section id="home">
                        <div className="App-content">
                            <User/>
                            <Trips trips={this.state.trips}/>
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>

        );
    }
}

// App.propTypes = {
//
// }
export default App;
