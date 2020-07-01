import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	background: ${props=>props.background1};
	cursor: pointer;
	transition: all .5s;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
	&:hover{
		background: ${props=>props.background2};
	}
`;
const Text = styled.p`
	position: absolute;
	display: block;
	top: 50%;
	left: 50%;
	transform : translate(-50%,-50%);
	text-align: center;
`;

export default class Button extends React.Component{
	handleClick = () => {
		this.props.handleClick();
	}
	render(){
		return (
			<Container {...this.props} onClick={this.handleClick}>
				<Text>{this.props.text}</Text>
			</Container>
		);
	}
}

// {
// 	background1: str,
// 	background2: str,
// 	text: str,
// 	handleClicke: void(void)
// }
