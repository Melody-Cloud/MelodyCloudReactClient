import React from "react";

export class Waveform extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {waveformSrc} = this.props;

        const imageStyle = {
            width: 1400,
            height: 300,
            overflow: 'hidden',
            backgroundImage: `url('${waveformSrc}')`,
        };

        const blurStyle = {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center right',
            filter: 'blur(1px)',
            float: 'right',
            height: '100%',
            width: 360,
            marginRight: -1,
        };

        return <div id="image" style={imageStyle}>
            <div className="blur" style={blurStyle}/>
        </div>;
    }
}