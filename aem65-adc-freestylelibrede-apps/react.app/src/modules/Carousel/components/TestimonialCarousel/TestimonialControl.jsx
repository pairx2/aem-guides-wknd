import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';


const TestimonialControl = ({currentIndex, max, next, prev, canIncrement, canDecrement, itemsToShow,currentBreakpoint,breakpoints}) => {
	const index = (currentIndex !== max ? (currentIndex + 1) : currentIndex);
	return (
		<if condition={(breakpoints[currentBreakpoint] === breakpoints.mobile && max > 1) ||(breakpoints[currentBreakpoint] !== breakpoints.mobile && max > 3)}>
			<div className={'adc-testimonial-carousel__control d-flex align-items-center justify-content-center mxb-2'}>
				<Icon image={'arrow-left-thin'} onClick={canDecrement && prev} className={'mr-2'}
					size={Icon.SIZE.HUGE}/>
				<span>{breakpoints[currentBreakpoint] === breakpoints.mobile?Math.ceil(index / itemsToShow):Math.round((currentIndex + 2) / itemsToShow)}<span className={'mx-2'}>{'/'}</span>{Math.ceil(max / itemsToShow)}</span>
				<Icon image={'arrow-right-thin'} onClick={canIncrement && next} className={'ml-2'}
					size={Icon.SIZE.HUGE}/>
			</div>
		</if>
	);
};
TestimonialControl.propTypes = {
	currentIndex: PropTypes.number,
	max: PropTypes.number,
	next: PropTypes.func,
	prev: PropTypes.func,
	itemsToShow: PropTypes.number,
	canIncrement: PropTypes.bool,
	canDecrement: PropTypes.bool
};

export default TestimonialControl;