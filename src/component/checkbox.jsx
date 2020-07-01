import React from 'react';
import styled, { css } from "styled-components";

const Container = styled.div`
	width: ${props=>props.width};
	height: ${props=>props.height};
	background: white;
	overflow: hidden;
`;
const InputCheckBox = styled.input.attrs({
    type: 'checkbox',
})`display: none`;

const PseudoCss = css`
	position: absolute;
	width: 100%;
	height: 100%;
	display: block;
	transition: all 0.7s;
	z-index: -10;
`;
const Switcher = styled.div`
	position: absolute;
	width: 50%;
	height: 100%;
	left: 0;
	background: blue;
	display: block;
	transition: all 0.7s ease;
	&::before{
		${PseudoCss};
		left: 0;
		content: "ON";
		line-height: 270%;
		color: red;
	}
	&::after{
		${PseudoCss};
		left: 100%;
		content: "OFF";
		line-height: 270%;
		color: blue;
	}
`;
const checkCss = css`
	${Switcher}{
		background: red;
		left: 50%;
		&:: before{
			left: -100%;
		}
		&::after{
			left: 0;
		}
	}
`;
const Label = styled.label`
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	cursor: pointer;
	text-align: center;
	z-index: 1;
	${props=>props.checked ? checkCss : null};
`;

export default class CheckBox extends React.Component{
	constructor(props){
		super(props);
		this.inputId = this.props.inputId;
		this.inputRef = React.createRef();
		this.state = {
			checked: this.props.checked,
		}
	}

	handleChange = () => {
		let newChecked = !this.state.checked;
		this.setState({
			checked: newChecked,
		});	
		this.props.updateFunc(newChecked);
	}

	render(){
		return (
			<Container {...this.props}>
				<InputCheckBox id={this.inputId} ref={this.inputRef} onChange={this.handleChange} value={this.state.checked}/>
				<Label  for={this.inputId} {...this.state}>
					<Switcher {...this.props}/>
				</Label>
			</Container>
		);
	}
};

// {
//  inputId: str, (unique)
// 	width: str,
// 	height: str[px], 
// 	checked: bool, (デフォルト値),
// 	updateFunc: void(bool),
// }
