import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import BackgroundImgDiv from './component/backgroundImgDiv.jsx';
import LoginPage from './Login.jsx';
import Home from './home.jsx';

const backgroundImgDivProps = {
	position: 'fixed',
	deg: '0deg',
	color1: 'rgba(1,1,1,0)',
	color2: 'rgba(1,1,1,0)',
	imgPath: './src/jpg/corkBoard.jpg',
}
class App extends React.Component {
	render() {
		let content;
		switch(this.props.reducer.pageState){
			case 'preSignIn': {
				content = (
					<LoginPage/>
				);
				break;
			}
			case 'home': {
				content = (
					<Home/>
				);
				break;
			}
			default:{
				content = (
					<Home/>
				);
				break;
			}
		}
		return (
			<React.Fragment>
				<BackgroundImgDiv {...backgroundImgDivProps}/>
				{content}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);
