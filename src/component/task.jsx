import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import axios from 'axios';

import CheckBox from './checkbox.jsx';
import Button from './button.jsx';

const Frame = styled.div`
	position: absolute;
	width: ${props=>props.width};
	height: ${props=>props.height};
	background: ${props=>'#'+props.color};
	overflow: hidden;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
`;
const TitleContainer = styled.div`
	position: absolute;
	width: 93.34%;
	height: 10%;
	top: 3.33%;
	left: 3.33%;
	bottom: 3.33%;
	right: 3.33%;
`;

const Title = styled.p`
	font-size: 100%;
	white-space: nowrap;
`;
// const TitleInput = styled.input`
// 	border: none;
// `;
// タイトル簡単に変えれたらいいいよね

const ContentsContainer = styled.div`
	position: absolute;
	width: 90%;
	height: 76.67%;
	top: 20%;
	left: 6.67%;
	bottom: 3.33%;
	right: 3.33%;
`;
const ContentContainerOutline = styled.div`
	position: relative;
	width: 100%;
	height: 18.18%;
`;
const ContentText = styled.p`
	font-size: 50%;
	float: left;
	line-height: 100%;
`;
const Timer = styled.p`
	font-size: 40%;
	float: right;
`;
const ContentContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 50%;
	bottom: 50%;
`;

const CheckBoxContainer = styled.div`
	width: 20%;
	top: 40%;
	height: 100%;
	float: right;
	font-size: 30%;
`;

const OthersButtonContainer = styled.div`
	font-size: 30%;
	position: relative;
	display: block;
	width: 20%;
	height: 50%;
	float: left;
`;
const DeleteButtonContainer = styled.div`
	color: white;
	font-size: 30%;
	position: relative;
	display: block;
	width: 20%;
	height: 50%;
	float: right;
`;

class Task extends React.Component{
	constructor () {
		super();
		this.state={
			remaining: 0,
		};
	}
	DateToHHMMSS = (DateStr) => {
		const DateList = DateStr.split(/[-,' ',:]/g).map(str=>Number(str));
		const DateObject = new Date(DateList[0],DateList[1],DateList[2],DateList[3],DateList[4],DateList[5]);
		return DateObject.getFullYear() + "年" + 
				DateObject.getMonth()  + "月" + 
				DateObject.getDate() + "日" + 
				DateObject.getHours() + "時" + 
				DateObject.getMinutes() + "分";
	}
	calcRemaining = () => {
		const now = new Date();
		// 来年の1月1日
		const DateList = this.props.deadline.split(/[-,' ',:]/g).map(str=>Number(str));
		const deadline = new Date(DateList[0],DateList[1],DateList[2],DateList[3],DateList[4],DateList[5]);
		// 秒数差
		const diff = (deadline.getTime() - now.getTime()) / 1000;
		// 日時の計算と端数切り捨て
		const hoursLeft = Math.floor(diff / (60 * 60))-720;
		let minitesLeft = (Math.floor(diff / 60)) % 60;
		let secondsLeft = Math.floor(diff) % 60;
		// 二桁表示
		minitesLeft = ("0" + minitesLeft).slice(-2);
		secondsLeft = ("0" + secondsLeft).slice(-2);
		this.setState({
			remaining: hoursLeft+":"+minitesLeft+":"+secondsLeft,
		});
	}
	componentDidMount(){
		this.calcRemaining();
		setInterval(this.calcRemaining, 0.5*1000);
	}
	render(){
		const publicCheckboxProps = {
			width: '100%',
			height: '100%',
			checked: Number(this.props.isPublic),
			inputId: this.props.taskId+'public',
			updateFunc: (value)=>{
				let params = new URLSearchParams();
				params.append('rprsntId', Number(this.props.rprsntId));
				params.append('isPublic', Number(value));
				axios.post("http://turkey.slis.tsukuba.ac.jp/~s1911441/updateIsPublic.php", params)
				.then(result => {
				})
				.catch(error => {console.log(error)});
			}
		}
		const doneCheckBoxProps = {
			width: '100%',
			height: '100%',
			checked: false,
			inputId: this.props.taskId+'done',
			updateFunc: (value)=>{
				let params = new URLSearchParams();
				params.append('taskId', this.props.taskId);
				params.append('done', value);
				axios.post("http://turkey.slis.tsukuba.ac.jp/~s1911441/done.php", params)
				.then(result => {
					setTimeout(this.props.removeTask, 1000, this.props.taskId);
				})
				.catch(error => {console.log(error)});
			}
		}
		const othersButtonProps = {
			background1: 'white',
			background2: '#d0d0d0',
			text: 'Others',
			handleClick: ()=>{}
		}
		const deleteButtonProps = {
			background1: 'black',
			background2: '#404040',
			text: 'delete',
			handleClick: ()=>{
				let params = new URLSearchParams();
				params.append('taskId', this.props.taskId);
				axios.post("http://turkey.slis.tsukuba.ac.jp/~s1911441/taskDelete.php", params)
				.then(result => {
					this.props.removeTask(this.props.taskId);
				})
				.catch(error => {console.log(error)});
			}
		}

		return (
			<Frame {...this.props}>
				<TitleContainer>
					<Title>{this.props.title}</Title>
				</TitleContainer>
				<ContentsContainer>
					<ContentContainerOutline>
						<ContentContainer>
							<ContentText>{'Deadline'}</ContentText>
							<Timer>{this.DateToHHMMSS(this.props.deadline)}</Timer>
						</ContentContainer>
					</ContentContainerOutline>

					<ContentContainerOutline>
						<ContentContainer>
							<ContentText>{'Remaining'}</ContentText>
							<Timer>{this.state.remaining}</Timer>
						</ContentContainer>
					</ContentContainerOutline>

					{/*<ContentContainerOutline>
					   <ContentContainer>
					   <ContentText>{'Color'}</ContentText>
					   </ContentContainer>
					   </ContentContainerOutline>

					   <ContentContainerOutline>
					   <ContentContainer>
					   <ContentText>{'Public'}</ContentText>
					   <CheckBoxContainer>
					   <CheckBox{...publicCheckboxProps}/>
					   </CheckBoxContainer>
					   </ContentContainer>
					   </ContentContainerOutline>
					   */}

					<ContentContainerOutline>
						<ContentContainer>
							<ContentText>{'Done'}</ContentText>
							<CheckBoxContainer>
								<CheckBox{...doneCheckBoxProps}/>
							</CheckBoxContainer>
						</ContentContainer>
					</ContentContainerOutline>
					<ContentContainerOutline>
						{/*
							<OthersButtonContainer>	
							<Button {...othersButtonProps}/>
							</OthersButtonContainer>
							*/}
						<DeleteButtonContainer>
							<Button {...deleteButtonProps}/>
						</DeleteButtonContainer>
					</ContentContainerOutline>
				</ContentsContainer>
			</Frame>
		);
	}
}

const action = {
    removeTask: (taskId) => {
        return {
            type: 'REMOVE_TASK',
			taskId: taskId,
        }
	},
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		removeTask: (taskId)=>{
			dispatch(action.removeTask(taskId));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);

// {
// 	width: str,
// 	height: str,
// 	background: str,
// 	taskId: int,
// 	title: str,
// 	deadline: Date,
// 	isPublic: bool,
// }
