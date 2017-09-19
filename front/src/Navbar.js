import React, {Component} from 'react';

class navBar extends Component {


    render() {
        return (
            <div className="navig">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <a className="navbar-brand" href="#">Carpooling</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item  active">
                                <a className="nav-link" href="in.html">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="in.html">About <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="in.html">Contact <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}



export default navBar;