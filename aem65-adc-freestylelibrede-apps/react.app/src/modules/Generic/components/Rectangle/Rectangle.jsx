import React from 'react';
import PropTypes from 'prop-types';

const Rectangle = ({children, className, ar}) => {
	return (
		<div className={`adc-square-container ${className}`}>
			<div className={'adc-square'} style={{marginBottom: `${ar * 100}%`}}/>
			<div className={'adc-square-content'}>
				{children}
			</div>
		</div>

	);
};

Rectangle.propTypes = {
	ar: PropTypes.number
};

export default Rectangle;