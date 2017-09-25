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

    componentWillMount(){
        fetch('/getViajes').then(response => response.json())
            .then(json => {
                this.setState({
                    trips: json.data
                }, function () {
                    console.log("Datos cargados: "+json.data.length()+" registros");
                    console.log("Ahora hay: "+this.state.trips.length+" registros en los PROPS (APP)");
                });
            });
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
