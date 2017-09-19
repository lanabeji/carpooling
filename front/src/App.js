import React, {Component} from 'react';
import Login from './Login.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Default from './Default.js';
import Register from './Register';
import './App.css';

class App extends Component {
    render() {
        return (

            <div className="App">
                <Navbar/>
                <div className="App-content">
                    <section id="home">
                        <div className="App-content">
                            <Register/>
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default App;
