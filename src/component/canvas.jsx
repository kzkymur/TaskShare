import React from 'react';
import styled from "styled-components";

const StyledCanvas = styled.canvas`
    position: ${props=>props.position};
	z-index: -999;
	${props=>props.css};
`

export default class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
		this.alpha = this.props.alpha;
    }

    componentDidMount () {
        // fps, 各種managerのsetup
		this.fps = this.props.fps;
        this.Anim = new this.props.animation(this.canvasRef);
		this.alpha = this.props.alpha;
        this.count = 0;
		this.alphaTansition;

        // rendering開始
		this.startRendering();
		this.componentDidUpdate();
    }

	componentDidUpdate(){
		switch(this.props.animationType){
			case 'alphaTransition' :{
				this.smoothlyAlphaTransition();
				break;
			}
			case 'close':{
				break;
			}
		}
	}

	componentWillUnmount(){
		clearInterval(this.rendering);
		clearInterval(this.alphaTansition);
	}

	cancelRendering = () => {
		clearInterval(this.rendering);
	}
	startRendering = () => {
        this.rendering = setInterval(()=>{
            this.Anim.rendering(this.count, this.props.widthFunc(), this.props.heightFunc(), this.alpha);
            this.count++;
        }, 1000/this.fps);
	}
	smoothlyAlphaTransition = () => {
		clearInterval(this.alphaTansition);
		this.oldAlpha = this.alpha;
		this.newAlpha = this.props.newAlpha;
		this.alphaTansition = setInterval(()=>{
			this.alpha += (this.newAlpha - this.oldAlpha) / this.props.requiredCount;
		}, parseInt(1000/this.fps)); 

		setTimeout(()=>{
			clearInterval(this.alphaTansition);
		}, parseInt(1000/this.fps)*this.props.requiredCount);
	}

	render () {
		return <StyledCanvas ref={this.canvasRef} {...this.props}/>
	}
}
