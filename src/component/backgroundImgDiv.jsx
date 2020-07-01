import React from 'react';
import styled from "styled-components";

const ColoredDiv = styled.div`
	position: ${props=>props.position};
	z-index: -999;
	width: 100%;
	height: 100%;
	background: linear-gradient(${props=>props.deg}, ${props=>props.color1}, ${props=>props.color2}), url(${props=>props.imgPath});
	background-size: 200%;
	background-position: 50%;
`;

export default class BackgroundImgDiv extends React.Component {
	render () {
		return <ColoredDiv {...this.props}/>
	}
}

// {
//  position: str,
// 	deg: str,
// 	color1: str,
// 	color2: str,
// 	imgPath: str,
// }
