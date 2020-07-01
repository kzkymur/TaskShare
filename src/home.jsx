import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';

import Button from './component/button.jsx';
import Task from './component/task.jsx';
import CheckBox from './component/checkbox.jsx';
import SignForm from './component/signForm.jsx';
import InputBox from './component/inputBox.jsx';
import * as u from './utils.js';

const customModalStyles = {
	content : {
		position: 'relative',
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		width: '700px',
		height: '500px',
		fontSize: '100px',
	},
	overlay: {zIndex: 1000}
};

Modal.setAppElement('#root');

const HeadlineContainer = styled.div`
	position: relative;
	display: block;
	width: 96.92%;
	left: 1.54%;
	height: 19.44%;
`;

const UserNameContainer = styled.div`
	position: relative;
	display: block;
	float: left;
	background: white;
	width: 25%;
	top: 16.67%;
	height: 50%;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
`;
const UserName = styled.p`
	position: absolute;
	display: block;
	top: 50%;
	transform: translateY(-50%);
	left: 10%;
	font-size: 40px;
`;
const ButtonContainer = styled.div`
	position: relative;
	display: block;
	float: left;
	background: white;
	left: 1.67%;
	width: 10%;
	top: 16.67%;
	height: 50%;
	font-size: 40px;
`;
const SignOutContainer = styled.div`
	position: relative;
	display: block;
	float: right;
	background: black;
	width: 10%;
	top: 16.67%;
	height: 50%;
	font-size: 40px;
	color: white
`;

const TasksContainer = styled.div`
	position: relative;
	display: block;
	width: 98.46%;
	left: 1.54%;
	height: 80.56%;
`;
const TaskContainer = styled.div`
	position: relative;
	width: ${props=>props.width};
	height: ${props=>props.height};
	font-size: ${props=>props.fontSize};
	font-family: sans-serif;
	float: left;
`;

const getWidthDivdNum = (index) => {
	if(index==0){
		return 2;
	}else if(index<3){
		return 4;
	}else{
		return 8;
	}
}
const getHeightDivdNum = (index) => {
	if(index==0){
		return 1;
	}else if(index<3){
		return 2;
	}else{
		return 4;
	}
}

class Home extends React.Component {
	constructor(){
		super();
		this.state = {showModal: false}
	}
	closeModal = () => {
		this.setState({
			showModal: false,
			modalContent: null,
		})
	}
	render() {
		const addProps = {
			background1: '#ff5752',
			background2: '#ff2b24',
			text: 'Add',
			handleClick: ()=>{
				let formProps = {
					title: 'Add',
					checkFunc: ()=>{return true;},
						postFunc: (result)=>{
						this.closeModal()
						this.props.reload(result.data);
					},
					axiosUrl: "http://turkey.slis.tsukuba.ac.jp/~s1911441/addTask.php",
						paramsAppendFunc: (params)=>{
						params.append('userId', this.props.reducer.userId);
						return params;
					}
				}
				let inputPropses = [
					{
						inputTitle: 'title',
						inputType: 'text',
						inputName: 'title',
					},
					{
						inputTitle: 'deadline',
						inputType: 'text',
						inputName: 'deadline',
						inputPlaceholder: 'YYYY-MM-DD HH:MM'
					},
				]
				this.setState({
					showModal: true,
					modalContent: (
						<SignForm {...formProps}>
							<InputBox{...inputPropses[0]}/>
							<InputBox{...inputPropses[1]}/>
						</SignForm>
					)
				})
			}
		}
		const shareProps = {
			background1: '#5493ff',
			background2: '#196eff',
			text: 'share',
			handleClick: ()=>{
			}
		}
		const historyProps = {
			background1: '#b6ff47',
			background2: '#aiff1r',
			text: 'history',
			handleClick: ()=>{
			}
		}
		const displayProps = {
			background1: '#ffbc47',
			background2: '#ffae21',
			text: 'display',
			handleClick: ()=>{
			}
		}
		const signOutProps = {
			background1: '#000',
			background2: '#222',
			text: 'SignOut',
			handleClick: ()=>{
				console.log('signOut');
				this.props.signOut();
			}
		}

		let i = 0;
		let margin = 1.58;
		return (
			<React.Fragment>
				<HeadlineContainer>
					<Modal isOpen={this.state.showModal} style={customModalStyles}>
						<button onClick={this.closeModal}>close</button>
						{this.state.modalContent}
					</Modal>
					<UserNameContainer>
						<UserName>{this.props.reducer.userName}</UserName>
					</UserNameContainer>
					<ButtonContainer>
						<Button{...addProps}/>
					</ButtonContainer>
					{/*
					<ButtonContainer>
						<Button{...shareProps}/>
					</ButtonContainer>
					<ButtonContainer>
						<Button{...historyProps}/>
					</ButtonContainer>
					<ButtonContainer>
						<Button{...displayProps}/>
					</ButtonContainer>
					*/}
					<SignOutContainer>
						<Button{...signOutProps}/>
					</SignOutContainer>
				</HeadlineContainer>
				<TasksContainer>
						{this.props.reducer.tasks.map(task=>{
							let widthDivNum = getWidthDivdNum(i);
							let heightDivNum = getHeightDivdNum(i);
							let taskWidth = 100/widthDivNum;
							let taskHeight = 100/heightDivNum;
							let taskContainerProps = {
								width: taskWidth+'%',
								height: taskHeight+'%',
								fontSize: 70/heightDivNum+'px',
							};
							let taskProps = u.objectJoiner(
								{
									width: (100-margin*widthDivNum)+'%',
									height: (100-margin*heightDivNum)+'%',
									color: 'c5f536',
								},
								task,
							);
							i++;
							return(
									<TaskContainer key={task.taskId}{...taskContainerProps}>
										<Task {...taskProps}/>
									</TaskContainer>
							);
						})}
				</TasksContainer>
			</React.Fragment>
		);
	}
}

const action = {
	signOut: () => {
		return {
			type: 'SIGNOUT',
		}
	},
	reload: (newTasks) => {
		return{
			type: 'RELOAD',
			tasks: newTasks,
		}
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		signOut: ()=>{ dispatch(action.signOut()) },
		reload: newTasks=>{ dispatch(action.reload(newTasks)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

