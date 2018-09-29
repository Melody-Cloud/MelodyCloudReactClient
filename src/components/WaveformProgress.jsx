import React from "react";
import 'assets/scss/WaveformProgress.scss';
import injectStyle from "../utils/inject-style";
import styled, { keyframes } from 'styled-components'

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

        const slide = keyframes`
          from {
            width: ${progressFilterWidth}px
          }
        
          to {
            width: ${progressFilterWidth+1}px
          }
        `;

        const blurStyle = {
            backgroundImage: `url('${waveformSrc}')`,
            backgroundPosition: 'center left',
            filter: 'blur(2px)',
            float: 'left',
            height: imageHeight,
            width: progressFilterWidth,
            marginLeft: -1,
            backgroundSize: `${imageWidth}px ${imageHeight}px`,
            // animationTimingFunction: 'ease-out',
            animation: (progressFilterWidth > 0) ? `${slide} .2s forwards`: null,
        };

        return <div id="image" style={imageStyle}>
            <div className="blur" style={blurStyle}/>
        </div>;
    }
}