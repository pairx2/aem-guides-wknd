import React, {Component} from 'react';
import {connect} from 'react-redux';
import Rectangle from '../../../Generic/components/Rectangle/Rectangle';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import Icon from '../../../Generic/components/Icon/Icon';

const mapDispatchToProps = {
	closeModalAction
};

export default connect(null, mapDispatchToProps) (class  VideoModal  extends Component{

	state = {
		videoStarted: false,
		playedQuarter: false,
		playedHalf: false,
		playedThreeQuarter: false
	};

	static propTypes = {
		videoId: PropTypes.string,
		closeModalAction: PropTypes.func
	};

	videoPlay = () => {
		this.setState({
			videoStarted: true
		});
	};

	handleProgress= (progress) => {
		const {playedQuarter, playedHalf, playedThreeQuarter} = this.state;
		const perValue = progress.played * 100;
		if(Math.round(perValue) > 25 && !playedQuarter){
			this.setState({playedQuarter: true});
		} else if(Math.round(perValue) > 50  && !playedHalf){
			this.setState({playedHalf: true});
		} else if(Math.round(perValue) > 75  && !playedThreeQuarter){
			this.setState({playedThreeQuarter: true});
		}
	};

	render(){
		const {videoId, closeModalAction} = this.props;
		return (
			<Rectangle ar={0.6}>
				<span className="adc-modal-video__close-icon"><Icon className={'c-pointer'} image={'close-white'} size={Icon.SIZE.SMALL} onClick={closeModalAction}/></span>
				<ReactPlayer url={'https://www.youtube.com/watch?v=' + videoId} playing width="100%" height="100%" controls
					onPlay={this.videoPlay} onProgress={this.handleProgress}/>
			</Rectangle>
		);
	}
});