import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

import InputBox from './inputBox.jsx';

const TitleContainer = styled.div`
	position: absolute;
	display: block;
	width: 96.3%;
	left: 3.7%;
	height: 15%;
	font-size: 50%;
`;
const Title = styled.p`
	position: absolute;
	display: block;
	width: 100%;
	top: 20%;
	height: 80%;
`;
const Form = styled.form`
	position: relative;
	display: block;
	top: 15%;
	height: 100%;
`;
const InputBoxesContainer = styled.div`
	position: relative;
	display: block;
	left: 11.11%;
	width: 81.48%;
	height: 65%;
`;
const InputBoxContainerFrame = styled.div`
	position: relative;
	display: block;
	width: 100%;
	height: ${props => props.height};
`;
const InputBoxContainer = styled.div`
	position: absolute;
	display: block;
	width: 100%;
	top: ${props => props.top};
	height: ${props => props.height};
`;
const SubmitButtonContainer = styled.div`
	position: absolute;
	left: 74.07%;
	width: 18.51%;
	height: 20%;
	display: block;
`;
const SubmitButton = styled.input`	
	position: absolute;
	width: 100%;
	height: 50%;
	display: block;
	background: rgb(100, 100, 255);
	border: none;
	color: white;
	text-align: center;
	text-decoration: none;
	font-size: 15%;
`;

export default class SignForm extends React.Component{
	constructor(){
		super();
		this.inputRefs = {};
	}

	handleClick = () => {
		let inputItems = {}
		let inputBox;
		for(let key in this.inputRefs){
			inputBox = this.inputRefs[key].current;
			inputItems[inputBox.name] = inputBox.value;
		}
		let canSend = this.props.checkFunc(inputItems);
		if(canSend){
			let params = new URLSearchParams();
			for(let key in this.inputRefs){
				inputBox = this.inputRefs[key].current;
				params.append(inputBox.name, inputBox.value);
			}
			params = this.props.paramsAppendFunc ? this.props.paramsAppendFunc(params) : params;
			axios.post(this.props.axiosUrl, params)
			.then(result => {
				this.props.postFunc(result);
			})
			.catch(error => {alert(error)});
		}	
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}


	render () {
		const childrenLength = this.props.children.length;
		const inputBoxContainerFrameProps = {
			height: 100 / childrenLength + '%',
		};
		const InputBoxContainerProps = {
			height: 10*childrenLength/0.65 + '%',
			top: 100 - 10*childrenLength/0.65 + '%',
		}
		let inputTitle, newInputChild;
		return (
			<React.Fragment>
				<TitleContainer>
					<Title>{this.props.title}</Title>
				</TitleContainer>
				<Form onSubmit={this.handleSubmit}>
				<InputBoxesContainer>
					{React.Children.map(this.props.children, (inputChild)=>{
						let inputTitle = inputChild.props.inputTitle;
						this.inputRefs[inputTitle] = React.createRef();
						newInputChild = (
							<InputBoxContainerFrame {...inputBoxContainerFrameProps} key={inputTitle}>
								<InputBoxContainer {...InputBoxContainerProps}>
									<InputBox ref={this.inputRefs[inputTitle]} {...inputChild.props}/>
								</InputBoxContainer>
							</InputBoxContainerFrame>
						);
						return React.cloneElement(newInputChild);
					})}
				</InputBoxesContainer>
				<SubmitButtonContainer>
					<SubmitButton type="submit" onClick={this.handleClick} value={this.props.title}/>
				</SubmitButtonContainer>
				</Form>
			</React.Fragment>
		);
	}
}

// {
// 	title: str,
// 	children: InputBox[],
// 	checkFunc: bool func(obj),
// 	postFunc: void func(obj),
// 	paramsAppendFunc: URLSearchParams(URLSearchParams),
// 	alertMessage: str,
// 	axiosUrl: str,
// }

