import React from "react";

export class Waveform extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {waveformSrc, imageWidth, imageHeight, progressFilterWidth} = this.props;

        const imageStyle = {
            width: imageWidth,
            height: imageHeight,
            overflow: 'hidden',
            backgroundImage: `url('${waveformSrc}')`,
        };

        const blurStyle = {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center left',
            filter: 'invert(.8)',
            float: 'left',
            height: '100%',
            width: progressFilterWidth,
            marginLeft: -1,
        };

        return <div id="image" style={imageStyle}>
            <div className="blur" style={blurStyle}/>
        </div>;
    }
}