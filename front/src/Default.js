import React, {Component} from 'react';

class Default extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Default-container">
                <div className="Form-container">
                    <form>
                        <button type="submit" className="btn btn-danger boton">Register</button>
                        <button type="submit" className="btn btn-danger boton">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Default;/**
 * Created by Camilo on 18/09/17.
 */
