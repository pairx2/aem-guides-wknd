import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../../Generic/components/Circle/Circle';

const getOrbArray = (itemsToShow, max) => {
	return new Array(max - itemsToShow + 1).fill(0);
};

const CarouselControlBlueOrbs = ({currentIndex, itemsToShow, max, goTo}) => {
	return (
		<div className={'adc-carousel__control adc-carousel__control adc-carousel__control--blue'}>
			{getOrbArray(itemsToShow,max).map((x, i) => (
				<div key={x} onClick={() => goTo(i)}>
					<Circle
						className={`adc-carousel__control-item ${i === currentIndex ? 'adc-carousel__control-item--active' : ''}`}/>
				</div>

			))}
		</div>

	);
};
CarouselControlBlueOrbs.propTypes = {
	currentIndex: PropTypes.number,
	itemsToShow: PropTypes.number,
	max: PropTypes.number,
	goTo: PropTypes.func
};

CarouselControlBlueOrbs.defaultProps = {};

export default CarouselControlBlueOrbs;