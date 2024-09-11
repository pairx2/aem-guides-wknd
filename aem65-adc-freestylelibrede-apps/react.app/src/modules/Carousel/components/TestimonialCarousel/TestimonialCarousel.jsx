import React from 'react';
import Testimonial from './Testimonial';
import TestimonialControl from './TestimonialControl';
import Carousel from '../Carousel';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';


const TestimonialCarousel = ({heading, sectionHeading, children, ctaText, ctaStyling, ctaURL, ctaAction}) => {
	const items = children.map((child, index) => ({ ...child, id: index+1 }))
	return (
		<div className={'adc-testimonial-carousel py-5'}>
			<div className={'container'}>
				<h6 className="text-center lspacing-point3">{heading}</h6>
				<h3 className={'adc-title adc-title--blue text-center  mb-3'}>{sectionHeading}</h3>
				<Carousel itemsToShowDesktop={3} itemsToShowMobile={1} controlComponentDesktop={TestimonialControl}>
					{items?.map((t) => <Testimonial key={t.id} testimonial={t}/>)}
				</Carousel>
				<if condition={ctaText}>
					<div className={'text-center mt-3 margin-bottom-30'}>
						<Button ctaStyle={ctaStyling} label={ctaText} href={ctaURL} target={ctaAction}/>
					</div>
				</if>
			</div>
		</div>);
};

TestimonialCarousel.propTypes = {
	sectionHeading: PropTypes.string,
	ctaText: PropTypes.string,
	ctaStyling: PropTypes.string,
	ctaURL: PropTypes.string,
	ctaAction: PropTypes.string,
	heading: PropTypes.string
};

export default TestimonialCarousel;

