/**
 * Created by Camilo on 22/09/17.
 */
import React, {Component} from 'react';

class Trip extends Component {

    // constructor(props){
    //     super(props);
    // }

    render() {
        return (
            <div className="tripContainer">
                <div className="tripCol1">
                    <div>Origen: {this.props.trip.origen}</div>
                    <div>Destino: {this.props.trip.destino}</div>
                </div>
                <div className="tripCol2">
                    <div>Hora salida: {this.props.trip.horaEncuentro}</div>
                    <div>Fecha: {this.props.trip.fecha}</div>
                </div>
            </div>
        );
    }

}

export default Trip;