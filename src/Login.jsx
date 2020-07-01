import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import * as u from './utils.js';

import SignForm from './component/signForm.jsx';
import InputBox from './component/inputBox.jsx';

function isObject( obj ) {
  return Object.prototype.toString.call( obj ) === "[object Object]"
}

const FontSizingWrapper = styled.div`
	font-size: 100px;
`;

const TitleContainer = styled.div`
	position: relative;
	display: block;
	width: 100%;
	height: 27.78%;
	text-align: center;
`;
const Title = styled.p`
	position: relative;
	display: inline-block;
	padding: 0 5% 0 5%;
	background: white;
	top: 40%;
	font-size: 100%;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
	border-bottom: solid 1px black;
`;

const SignInFormContainerFrame = styled.div`
	position: relative;
	width: 50%;
	height: 55.56%;
	float: left;
`;
const formContainerCss = css`
	position: relative;
	width: 84.38%;
	height: 90.81%;
	top: 9.09%;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
`;
const SignInFormContainer = styled.div`
	${formContainerCss};
	left: 12.5%;
	right: 3.13%;
	background: rgb(255, 200, 200);
`;

const signInEmailProps = {
	inputTitle: "Email Adress",
	inputType: "email",
	inputName: "mail",
	inputPlaceholder: ""
};
const signInPasswordProps = {
	inputTitle: "Password",
	inputType: "password",
	inputName: "password",
	inputPlaceholder: ""
};

const SignUpFormContainerFrame = styled.div`
	position: relative;
	width: 50%;
	height: 55.56%;
	float: left;
`;
const SignUpFormContainer = styled.div`
	${formContainerCss};
	right: 12.5%;
	left: 3.13%;
	background: rgb(200, 255, 200);
`;

const signUpEmailProps = {
	inputTitle: "Email Adress",
	inputType: "email",
	inputName: "mail",
	inputPlaceholder: ""
};
const signUpUserNameProps = {
	inputTitle: "User Name",
	inputType: "text",
	inputName: "userName",
	inputPlaceholder: ""
};
const signUpPasswordProps = {
	inputTitle: "Password",
	inputType: "password",
	inputName: "password",
	inputPlaceholder: ""
};
const signUpConfirmPasswordProps = {
	inputTitle: "Confirm Password",
	inputType: "password",
	inputName: "confirmPassword",
	inputPlaceholder: ""
};

class SignInPage extends React.Component {
	render() {
		const signInFormProps = {
			title: 'Sign In',
			checkFunc: inputItems=>{
				for(let key in inputItems){
					if(inputItems[key]=='') return false;
				}
				return true;
			},
			postFunc: result=>{
				if(isObject(result.data[0])){
					this.props.signIn(result.data[0]);
				} else {
					alert("ログインに失敗しました");
				}
			},
			axiosUrl: "http://turkey.slis.tsukuba.ac.jp/~s1911441/identifyUser.php",
		};
		const signUpFormProps = {
			title: 'Sign Up',
			checkFunc: (inputItems)=>{
				for(let key in inputItems){
					if(inputItems[key]=='') return false;
				}
				if(inputItems['password'] != inputItems['confirmPassword']){
					alert("password と confirmPassword が異なります！")
					return false;
				}
				return true;
			},
			postFunc: result=>{
				if(isObject(result.data[0])){
					this.props.signIn(result.data[0]);
				} else {
					alert("そのメールアドレスは既に登録されています。");
				}
			},
			axiosUrl: "http://turkey.slis.tsukuba.ac.jp/~s1911441/signUp.php",
		};
		return (
			<FontSizingWrapper>
				<TitleContainer>
					<Title>Task Share!</Title>
				</TitleContainer>
				<SignInFormContainerFrame>
					<SignInFormContainer>
						<SignForm {...signInFormProps}>
							<InputBox {...signInEmailProps}/>
							<InputBox {...signInPasswordProps}/>
						</SignForm>
					</SignInFormContainer>
				</SignInFormContainerFrame>
				<SignUpFormContainerFrame>
					<SignUpFormContainer>
						<SignForm {...signUpFormProps}>
							<InputBox {...signUpEmailProps}/>
							<InputBox {...signUpUserNameProps}/>
							<InputBox {...signUpPasswordProps}/>
							<InputBox {...signUpConfirmPasswordProps}/>
						</SignForm>
					</SignUpFormContainer>
				</SignUpFormContainerFrame>
			</FontSizingWrapper>
		);
	}
}

const action = {
    signIn: (userData) => {
        return {
            type: 'SIGNIN',
			userName: userData.userName,
			userId: userData.userId,
			tasks: userData.tasks,
        }
	},
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		signIn: (userData)=>{
			let params = new URLSearchParams();
			params.append('userId', userData.userId);
			axios.post('http://turkey.slis.tsukuba.ac.jp/~s1911441/getHomeTask.php', params)
			.then(result=>{
				let userDataAndTask = u.objectJoiner(
					{
						tasks:result.data,
					},
					userData,
				);
				dispatch(action.signIn(userDataAndTask))
			})
			.catch((e)=>{
				throw(e);
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
