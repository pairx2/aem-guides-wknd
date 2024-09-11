import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';

export const LOADING_INDICATOR_OPTIONS = {
	SIZE: {
		SMALL: 'small'
	}
};

const LoadingIndicator = ({size, label, isOverlay, pageLoader}) => {
	return (
		<>
			<div className={'adc-spinner ' + size + (isOverlay ? ' overlay' : '') + (pageLoader? ' pageLoader' : '')}>
				<span>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
				</span>
			</div>
			{label && <span className="adc-spinner__text mt-3"><I18n text={label}/></span>}
		</>
	);
};
LoadingIndicator.propTypes = {
	size: PropTypes.string,
	label: PropTypes.string,
	isOverlay: PropTypes.bool,
	pageLoader: PropTypes.bool
};

export default LoadingIndicator;