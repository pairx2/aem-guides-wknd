import React from 'react';
import PropTypes from 'prop-types';


const Col = ({ width, sm, md, lg, xl, offset, offsetSm, offsetMd, offsetLg, offsetXl, children, className }) => {
	let smClass = sm ? ` col-sm-${sm}` : '';
	let mdClass = md ? ` col-md-${md}` : '';
	let lgClass = lg ? ` col-lg-${lg}` : '';
	let xlClass = xl ? ` col-xl-${xl}` : '';
	let offsetClass = offset ? ` offset-${offset}` : '';
	let offsetSmClass = offsetSm ? ` offset-sm-${offsetSm}` : '';
	let offsetMdClass = offsetMd ? ` offset-md-${offsetMd}` : '';
	let offsetLgClass = offsetLg ? ` offset-lg-${offsetLg}` : '';
	let offsetXlClass = offsetXl ? ` offset-xl-${offsetXl}` : '';
	return (
		<div
			className={`col-${width}` + smClass + mdClass + lgClass + xlClass + offsetClass + offsetSmClass + offsetMdClass + offsetLgClass + offsetXlClass + ' ' + className}>
			{children}
		</div>

	);
};
Col.propTypes = {
	width: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
	offset: PropTypes.number,
	offsetSm: PropTypes.number,
	offsetMd: PropTypes.number,
	offsetLg: PropTypes.number,
	offsetXl: PropTypes.number,
	className: PropTypes.string
};

Col.defaultProps = {
	width: 12,
	className: ''
};

export default Col;