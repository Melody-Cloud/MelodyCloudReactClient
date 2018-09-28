import React from "react";

export class WaveformProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {waveformSrc, imageWidth, imageHeight, progressFilterWidth} = this.props;

        const imageStyle = {
            width: imageWidth,
            height: imageHeight,
            overflow: 'hidden',
            background: `url('${waveformSrc}')`,
            backgroundSize: `${imageWidth}px ${imageHeight}px`
        };

        const blurStyle = {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center left',
            filter: 'invert(.8)',
            float: 'left',
            height: imageHeight,
            width: progressFilterWidth,
            marginLeft: -1,
            backgroundSize: `${imageWidth}px ${imageHeight}px`
        };

        return <div id="image" style={imageStyle}>
            <div className="blur" style={blurStyle}/>
        </div>;
    }
}