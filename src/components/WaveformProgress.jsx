import React from "react";
import 'assets/scss/WaveformProgress.scss';
import { keyframes } from 'styled-components'

export class WaveformProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {waveformSrc, imageWidth, imageHeight, progressFilterWidth, animationDuration, isSongPlaying, isActive} = this.props;

        const imageStyle = {
            width: imageWidth,
            height: imageHeight,
            overflow: 'hidden',
            background: `url('${waveformSrc}')`,
            backgroundSize: `${imageWidth}px ${imageHeight}px`,
            // filter: 'blur(2px)'
        };

        const slide = keyframes`
          from {
            width: ${progressFilterWidth}px
          }
        
          to {
            width: ${imageWidth}px
          }
        `;

        const blurStyle = isActive ? {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center left',
            filter: 'blur(5px)',
            float: 'left',
            height: imageHeight,
            width: progressFilterWidth,
            marginLeft: 0,
            backgroundSize: `${imageWidth}px ${imageHeight}px`,
            animation: ((progressFilterWidth > 0) && isSongPlaying) ? `${slide} ${Math.floor(animationDuration)}s linear forwards`: 'none',
        }: {};

        return <div id="image" style={imageStyle}>
            <div id="blur" style={blurStyle}/>
        </div>;
    }
}