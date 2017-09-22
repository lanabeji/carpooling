/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Trips extends Component{

    constructor(Props){
        super(Props);

        this.state = {
            date: new Date(),
            trips: {}
        }
    }

    render(){
        return(<div className="tripsContainer">

        </div>);
    }

}

App.propTypes = {
    trips: PropTypes.object.isRequired
}

export default Trips;