import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../../../Generic/components/Circle/Circle';
import Image from '../../../Generic/components/Image/Image';
import Button from '../../../Generic/components/Button/Button';


const Testimonial = ({testimonial}) => {
	return (
		<div className={'adc-testimonial-container'}>
			<div className={'adc-testimonial text-center w-100'}>
				<Circle className={'w-100 mb-4'}>
					<Image className={'adc-testimonial__image img-fluid'} fit={Image.FIT.COVER}
						src={testimonial.testimonialImage} alt={testimonial.testimonialImageAltText}/>
				</Circle>
				<div className={'adc-testimonial-wrapper'}>
					<h4 className={'adc-title adc-title--blue mb-3 '}>{testimonial.testimonialName}</h4>
					<p className={'adc-testimonial__quote'}>{testimonial.testimonialQuote}</p>
				</div>
			</div>
			<if condition={testimonial.ctaText}>
				<Button
					ctaStyle={testimonial.ctaStyling}
					label={testimonial.ctaText}
					target={testimonial.ctaAction}
					href={testimonial.ctaURL}/>
			</if>
		</div>
	);
};
Testimonial.propTypes = {
	testimonial: PropTypes.object
};

Testimonial.defaultProps = {};

export default Testimonial;