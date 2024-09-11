import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../../Generic/components/Circle/Circle';


const CarouselControlWhiteOrbs = ({currentIndex, max, goTo}) => {
	return (
		<div className={'adc-carousel__control adc-carousel__control mb-5'}>
			{new Array(max).fill(0).map((x, i) => (
				<div key={x} onClick={() => goTo(i, true)}>
					<Circle
						className={`adc-carousel__control-item ${i === currentIndex ? 'adc-carousel__control-item--active' : ''}`}/>
				</div>

			))}
		</div>

	);
};
CarouselControlWhiteOrbs.propTypes = {
	currentIndex: PropTypes.number,
	max: PropTypes.number,
	goTo: PropTypes.func
};

CarouselControlWhiteOrbs.defaultProps = {};

export default CarouselControlWhiteOrbs;