/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';
import Trip from './Trip.js';

// import PropTypes from 'prop-types';

class Trips extends Component {

    constructor(props) {
        super(props);
    }

    renderTrips(){
        console.log("Se han recibido: "+this.props.trips.length+" registros como PROPS en el TripPrinter")
        if(this.props.trips.length===0){
            return <h3>Nothing to show here! There are no trips available at this time!</h3>
        }
        else{
            return this.props.trips.map((t, i) => {
                return <Trip trip={t} key={i}/>;
            });
        }
    }

    validate(){

    }

    render() {
        return (
            <div className="tripsContainer">
                {this.renderTrips()}
                {this.validate()}
            </div>
        );
    }

}

// Trips.propTypes = {
//     trips: PropTypes.object.isRequired
// }

export default Trips;