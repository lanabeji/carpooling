/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';
import Trip from './Trip.js';

class Trips extends Component {


    renderTrips() {

            if (this.props.trips.length === 0) {
                return <h3>Nothing to show here! There are no trips available at this time!</h3>
            }
            else {
                return this.props.trips.map((t, i) => {
                    return <Trip trip={t} key={i}/>;
                });
            }

    }


    render() {
        return (
            <div className="tripsContainer">
                {this.renderTrips()}
            </div>
        );
    }

}

// Trips.propTypes = {
//     trips: PropTypes.object.isRequired
// }

export default Trips;