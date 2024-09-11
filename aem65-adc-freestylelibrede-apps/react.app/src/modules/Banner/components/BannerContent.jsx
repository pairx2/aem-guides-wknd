import React from 'react';
import PropTypes from 'prop-types';
import {Title} from '../../Generic/components/Title/Title.jsx';
import {withBreakpoints} from 'react-breakpoints';
import {BANNER_TYPE} from '../../../utils/enums';

const BannerContent = ({bannerType, children, title, description, subHeading, subHeadingTextColor, headingType, subHeadingType, headingTextColor, image, className}) => {
	return (
		<div className={'adc-banner-content adc-banner__order2 col-md-6' + ` ${className || ''}`}>
			{bannerType !== BANNER_TYPE.VIDEO && <img className="adc-banner-halfBleedImage--img lazyload d-block d-md-none mb-5" data-src={image} />}
			{title && <Title className={'adc-banner-content__title'} text={title} size={headingType} color={headingTextColor}/>}
			{subHeading && <Title text={subHeading} size={subHeadingType} color={subHeadingTextColor} />}
			<div className="mt-3 adc-banner-content__desc" dangerouslySetInnerHTML={{__html: description}} />
			{children}
		</div>
	);
};

BannerContent.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	subHeading: PropTypes.string,
	subHeadingTextColor: PropTypes.string,
	headingTextColor: PropTypes.string,
	headingType: PropTypes.string,
	subHeadingType: PropTypes.string,
	image: PropTypes.string,
	bannerType: PropTypes.string
};

BannerContent.defaultProps = {
	headingTextColor: Title.COLOR.BLUE
};

export default withBreakpoints(BannerContent);
