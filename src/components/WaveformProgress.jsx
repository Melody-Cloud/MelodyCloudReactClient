import React from "react";
import { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import 'assets/scss/WaveformProgress.scss';

export class WaveformProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            waveformImageSource, imageWidth,
            imageHeight, waveformProgressBarWidth,
            animationDuration, isAnimationEnabled, isActive
        } = this.props;

        const imageStyle = {
            width: `${imageWidth}vw`,
            height: imageHeight,
            overflow: 'hidden',
            background: `url('${waveformImageSource}')`,
            backgroundSize: `${imageWidth}vw ${imageHeight}px`,
            // filter: 'blur(2px)'
        };

        const slide = keyframes`
          from {
            width: ${waveformProgressBarWidth}vw
          }
        
          to {
            width: ${imageWidth}vw
          }
        `;

        const blurStyle = isActive ? {
            backgroundImage: `url('${waveformImageSource}')`,
            backgroundPosition: 'center left',
            filter: 'invert(.4)',
            float: 'left',
            height: imageHeight,
            width: `${waveformProgressBarWidth}vw`,
            backgroundSize: `${imageWidth}vw ${imageHeight}px`,
            animation: ((waveformProgressBarWidth > 0) && isAnimationEnabled) ? `${slide} ${Math.floor(animationDuration)}s steps(${animationDuration*7}) forwards`: 'none',
        }: {};

        return <div id="image" style={imageStyle}>
            <div id="blur" style={blurStyle}/>
        </div>;
    }
}

WaveformProgress.propTypes = {
    waveformImageSource: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    waveformProgressBarWidth: PropTypes.number,
    animationDuration: PropTypes.number,
    isAnimationEnabled: PropTypes.bool,
    isActive: PropTypes.bool
};