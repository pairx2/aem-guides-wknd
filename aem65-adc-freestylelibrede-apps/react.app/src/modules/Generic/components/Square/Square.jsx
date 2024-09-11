import React from 'react';
import PropTypes from 'prop-types';

const Square = ({children, className, style}) => {
	return (
		<div className={`adc-square-container ${className}`} style={style}>
			<div className={'adc-square'}/>
			<div className={'adc-square-content'}>
				{children}
			</div>
		</div>

	);
};

Square.propTypes = {
	style: PropTypes.object
};

export default Square;