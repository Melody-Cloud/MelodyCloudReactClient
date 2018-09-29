import React from "react";
import 'assets/scss/WaveformProgress.scss';
import { keyframes } from 'styled-components'

export class WaveformProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {waveformSrc, imageWidth, imageHeight, progressFilterWidth, animationDuration, isActive} = this.props;

        const imageStyle = {
            width: imageWidth,
            height: imageHeight,
            overflow: 'hidden',
            background: `url('${waveformSrc}')`,
            backgroundSize: `${imageWidth}px ${imageHeight}px`,
        };

        const slide = keyframes`
          from {
            width: ${progressFilterWidth}px
          }
        
          to {
            width: ${imageWidth}px
          }
        `;

        const blurStyle = {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center left',
            filter: 'grayscale(100%)',
            float: 'left',
            height: imageHeight,
            width: progressFilterWidth,
            marginLeft: -1,
            backgroundSize: `${imageWidth}px ${imageHeight}px`,
            animation: ((progressFilterWidth > 0) && isActive) ? `${slide} ${Math.floor(animationDuration)}s linear forwards`: 'none',
        };

        return <div id="image" style={imageStyle}>
            <div id="blur" style={blurStyle}/>
        </div>;
    }
}