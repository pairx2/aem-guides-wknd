import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import I18n from '../../../Translation/components/I18n';

const CardEmptyContent = ({image, heading, subHeading, message, icon, iconClasses}) => {
	return (
		<div className="adc-empty-card">
			<div className="my-4">
				<img
					src={image}
				/>
			</div>
			<h6 className="adc-empty-card__heading">{heading}</h6>
			<p className="adc-empty-card__sub-heading"><I18n text={subHeading}/></p>
			<div className="adc-empty-card__message">
				<Icon
					image={icon}
					className={iconClasses}
				/>
				<I18n text={message}/>
			</div>
		</div>
	);
};
CardEmptyContent.propTypes = {
	image: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	subHeading: PropTypes.string.isRequired,
	message: PropTypes.string,
	icon: PropTypes.string,
	iconClasses: PropTypes.string
};
export default CardEmptyContent;