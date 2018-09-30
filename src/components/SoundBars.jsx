import React from "react";
import 'assets/scss/SoundBars.scss';

class SoundBars extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sound-bars">
                <div id="bars">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        );
    }
}

export default SoundBars