import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';

const NoActivePrescription = ({title, description , image, noprescriptionlink}) => {
	return (
		<div className="row d-flex">
			<div className="col-12 col-lg-7 order-2 order-lg-1">
				<h5 className="adc-title adc-title--black">{title}</h5>
				<p>{description}</p>
				<div className="row mb-3 mt-5">
					<div className="col-12 col-lg-6 pr-lg-0 mb-3">
						<Button
							label={i18nLabels.MORE_INFO_CTA}
							ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
							className={'m-0 px-0'}
							noMargin
							isFullWidth
							href={'#'}
						/>
					</div>
					<div className="col-12 col-lg-6">
						<Button
							label={i18nLabels.ORDER_WITH_RECIPE}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							className={'m-0 px-0'}
							noMargin
							isFullWidth
							href={noprescriptionlink}
						/>
					</div>
				</div>
			</div>
			<div
				className="col-12 col-lg-5 mb-lg-5 order-1 order-lg-2 d-flex justify-content-center">
				<img
					alt="subscriptionImage"
					className="adc-prescription__image"
					src={image}
				/>
			</div>
		</div>
	);
};

NoActivePrescription.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image:PropTypes.string,
	noprescriptionlink:PropTypes.string
};

export default NoActivePrescription;
