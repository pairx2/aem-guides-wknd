import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {isIE} from '../../../../utils/browserCompatibilityUtils';

const Image = ({src, alt, fit, position, className, renditions}) => {
	const [supportsObjectFit, setSupportsObjectFit] = useState(true);
	useEffect(() => {
		setSupportsObjectFit(('object-fit' in document.body.style));
	});
	const mediaMapping = {
		'48_48': '(max-width: 200px)',
		'140_100': '(max-width: 400px)',
		'319_319': '(max-width: 600px)',
		'1280_1280': '(max-width: 800px)',
	};

	return (
		supportsObjectFit && !isIE ?
			<picture>
				{renditions && Object.keys(mediaMapping).map((key) => <source key={key} media={mediaMapping[key]}
																					 srcSet={renditions[key]}/>)}
				<img className={`w-100 lazyload adc-image adc-image--${fit} adc-image--${position} ${className || ''}`}
						 data-src={src || renditions['original']} src={src || renditions['original']} alt={alt}/>
			</picture> :
			<div>
				<img src={src || renditions['original']}
				className={`w-100 adc-image adc-image--${fit} adc-image--${position} ${className || ''}`} />
			</div>

	);};

Image.FIT = {
	CONTAIN: 'contain',
	COVER: 'cover'
};

Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	fit: PropTypes.oneOf(['contain', 'cover']),
	position: PropTypes.string,
	renditions: PropTypes.array
};

Image.defaultProps = {
	fit: Image.FIT.CONTAIN,
	position: 'center'
};


export default Image;