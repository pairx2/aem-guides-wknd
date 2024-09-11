import React from 'react';
import Square from '../Square/Square';

const Circle = ({children, className}) => {
	return (
		<Square className={`${className} adc-circle`}>
			{children}
		</Square>

	);
};

export default Circle;