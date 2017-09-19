import React, {Component} from 'react';

class Driver extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
                <div >
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Plate number</label><br/>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <form>
                            <div className="form-group">
                                <label for="exampleFormControlFile1">Profile picture</label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile1">
                                </input>
                            </div>
                        </form>
                    </form>
                </div>
        );
    }
}

export default Driver;

/**
 * Created by Camilo on 18/09/17.
 */
