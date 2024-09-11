import React from 'react';
import Square from '../../../Generic/components/Square/Square';
import PropTypes from 'prop-types';


const EnlargedImage = ({focus, image}) => {
	const style = {
		top: '0px',
		left: '430px',
		backgroundImage: `url(${image.url})`,
		backgroundColor: 'white',
		backgroundSize: '200%',
		backgroundPosition: focus,
		backgroundRepeat: 'no-repeat'
	};
	return (
		<Square className={'adc-enlarged-image'} style={style}/>
	);
};
EnlargedImage.propTypes = {
	focus: PropTypes.string,
	image: PropTypes.shape({
		url: PropTypes.string
	})
};

EnlargedImage.defaultProps = {};

export default EnlargedImage;