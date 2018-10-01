import React from "react";
import 'assets/scss/WaveformProgress.scss';
import { keyframes } from 'styled-components'

export class WaveformProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {waveformSrc, imageWidth, imageHeight, progressFilterWidth, animationDuration, isSongPlaying, isActive, howManySteps} = this.props;

        const imageStyle = {
            width: `${imageWidth}vw`,
            height: imageHeight,
            overflow: 'hidden',
            background: `url('${waveformSrc}')`,
            backgroundSize: `${imageWidth}vw ${imageHeight}px`,
            // filter: 'blur(2px)'
        };

        const slide = keyframes`
          from {
            width: ${progressFilterWidth}vw
          }
        
          to {
            width: ${imageWidth}vw
          }
        `;

        const blurStyle = isActive ? {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center left',
            filter: 'invert(.4)',
            float: 'left',
            height: imageHeight,
            width: progressFilterWidth,
            // marginLeft: '-1px',
            backgroundSize: `${imageWidth}vw ${imageHeight}px`,
            animation: ((progressFilterWidth > 0) && isSongPlaying) ? `${slide} ${Math.floor(animationDuration)}s steps(${animationDuration*7}) forwards`: 'none',
        }: {};

        return <div id="image" style={imageStyle}>
            <div id="blur" style={blurStyle}/>
        </div>;
    }
}