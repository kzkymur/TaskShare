import React from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
`;
const InputName = styled.p`
	line-height: 0.6em;
	font-size: 25%;
	position: absolute;
	display: block;
	width: 100%;
	height: 50%;
`;
const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	height: 50%;
	top: 50%;
	font-size: 15%;
	position: absolute;
	display: block;
	transition: 0.3s;
	letter-spacing: 1px;
	outline: none;
	background: #ddd;
	border: 0px solid blue;
	&:focus {
		border: 2px solid blue;
	}
`;

export default class InputBox extends React.Component{
	constructor(props){
		super(props);
		this.value = '';
		this.name = this.props.inputName;
	}
	handleChange = (event) => {
		this.value = event.target.value;
	}
	render(){
		return (
			<InputContainer>
				<InputName>{this.props.inputTitle}</InputName>
				<Input type={this.props.inputType} onChange={this.handleChange} placeholder={this.props.inputPlaceholder}/>
			</InputContainer>
		);
	}
}

// {
//  inputTitle: str,
// 	inputType: str,
// 	inputName: str,
// 	inputPlaceholder: str,
// }
