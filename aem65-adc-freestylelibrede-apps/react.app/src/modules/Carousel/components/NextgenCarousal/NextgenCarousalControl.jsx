import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';


const NextgenCarousalControl = ({ currentIndex, max, next, prev, canIncrement, canDecrement, currentBreakpoint, breakpoints ,goTo}) => {
	return (
		<if condition={(breakpoints[currentBreakpoint] === breakpoints.mobile) || (breakpoints[currentBreakpoint] !== breakpoints.mobile)}>
			<div className={'adc-nexgen-carausel__control'}>
				<Icon image={canDecrement ? 'left' : 'left-disabled'} onClick={canDecrement && prev} className={'mr-2'}
					size={Icon.SIZE.LARGE} />
				<ol class="">
					{(() => {
						let td = [];
						for (let i = 1; i < max - 2; i++) {
							td.push(<li class={currentIndex === i ? "adc-nexgen-carausel-controller-indicator-active" : "adc-nexgen-carausel-controller-indicator"} onClick={() => goTo(i)}></li>);
						}
						return td;
					})()}

				</ol>
				<Icon image={canIncrement ? 'right' : 'right-disabled'} onClick={canIncrement && next} className={'ml-2'}
					size={Icon.SIZE.LARGE} />
			</div>
		</if>
	);
};
NextgenCarousalControl.propTypes = {
	currentIndex: PropTypes.number,
	max: PropTypes.number,
	next: PropTypes.func,
	prev: PropTypes.func,
	canIncrement: PropTypes.bool,
	canDecrement: PropTypes.bool,
	goTo: PropTypes.func
};

export default NextgenCarousalControl;