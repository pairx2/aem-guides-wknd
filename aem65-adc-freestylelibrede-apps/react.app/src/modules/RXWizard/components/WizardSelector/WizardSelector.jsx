import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';
import Button from '../../../Generic/components/Button/Button';
import {i18nLabels} from '../../../../utils/translationUtils';
import ProgressBar from '../../../Generic/components/ProgressBar/ProgressBar';
import Container from '../../../Generic/components/Container/Container';
import Icon from '../../../Generic/components/Icon/Icon';
const mapStateToProps = state => {
	const {loggedIn: isLoggedIn} = state.authenticationModuleReducer;
	return {isLoggedIn};
};

const WizardSelector = ({heading, publicPrescriptionImage, publicPrescriptionButtonText, publicPrescriptionButtonCta, publicPrescriptionButtonLink, privatePrescriptionImage, privatePrescriptionButtonText, privatePrescriptionButtonCta, privatePrescriptionButtonLink, noPrescriptionButtonText, noPrescriptionButtonCta, noPrescriptionButtonLink, goBackText, goBackLink, loginPagePath, isLoggedIn}) => {
	const [steps] = useState([
		{title: i18nLabels.CHECKOUT_PROCESS.RECIPE},
		{title: i18nLabels.CHECKOUT_PROCESS.LOGIN},
		{title: i18nLabels.CHECKOUT_PROCESS.CASHBOX},
	]);
	const [AuthSteps] = useState([
		{title: i18nLabels.CHECKOUT_PROCESS.RECIPE},
		{title: i18nLabels.CHECKOUT_PROCESS.CASHBOX},
	]);
	const [currentStep] = useState(1);
	return (
		<div className="container">
			<div className="adc-wizard-selector">
				<Container className={'mt-5'}>
					<ProgressBar steps={isLoggedIn ? AuthSteps : steps} currentStep={currentStep} />
				</Container>
				<div className="row justify-content-center adc-wizard-selector__heading">
					<h2 className="col-sm-6 adc-wizard-selector__heading--title adc-title adc-title--blue">{heading}</h2>
				</div>
				<div className="row justify-content-center justify-content-md-between">
					<if condition={publicPrescriptionImage && publicPrescriptionButtonText}>
						<div className="row col-md-6 col-lg-5 justify-content-center mt-5">
							<img className="adc-wizard-selector__receipt--image img-fluid" src={publicPrescriptionImage}
								alt="Rosa Rezept" />
							<Button
								label={publicPrescriptionButtonText}
								ctaStyle={publicPrescriptionButtonCta}
								href={isLoggedIn ? publicPrescriptionButtonLink + '?insuranceType=public' : `${loginPagePath}?isCheckout=true&redirectTo=${publicPrescriptionButtonLink}`}
								className="mt-3 mt-md-5 ml-0 mr-0 self-flex-end"
								isFullWidth
							/>
						</div>
					</if>
					<if condition={privatePrescriptionImage && privatePrescriptionButtonText}>
						<div className="row col-md-6 col-lg-5 justify-content-center mt-5">
							<img className="adc-wizard-selector__receipt--image img-fluid"
								src={privatePrescriptionImage} alt="Anderes Rezept" />
							<Button
								label={privatePrescriptionButtonText}
								ctaStyle={privatePrescriptionButtonCta}
								href={isLoggedIn ? privatePrescriptionButtonLink + '?insuranceType=private' : `${loginPagePath}?isCheckout=true&redirectTo=${privatePrescriptionButtonLink}`}
								className="mt-3 mt-md-5 ml-0 mr-0 self-flex-end"
								isFullWidth
							/>
						</div>
					</if>
				</div>
				<div className="row justify-content-md-center mt-4 pt-4 mt-md-5 pt-md-1 border-top-sm-grey">
					<div className="col-md-5 col-lg-3">
						<Button
							label={noPrescriptionButtonText}
							ctaStyle={noPrescriptionButtonCta}
							href={isLoggedIn ? noPrescriptionButtonLink : `${loginPagePath}?isCheckout=true&redirectTo=${noPrescriptionButtonLink}`}
							className="mt-2 mt-md-5 ml-0 mr-0 lspacing"
							isFullWidth
						/>
					</div>
				</div>
				<div className="row justify-content-center">
					<Link href={goBackLink}
						className="mt-1 ml-0 mr-0 font-13"
						label={goBackText}
					/>
				</div>
				<div className="row justify-content-center my-3">
					<Icon image={'arrow-down-blue'}/>
				</div>
			</div>
		</div>
	);
};

WizardSelector.propTypes = {
	heading: PropTypes.string,
	publicPrescriptionImage: PropTypes.string,
	publicPrescriptionButtonText: PropTypes.string,
	publicPrescriptionButtonCta: PropTypes.string,
	publicPrescriptionButtonLink: PropTypes.string,
	privatePrescriptionImage: PropTypes.string,
	privatePrescriptionButtonText: PropTypes.string,
	privatePrescriptionButtonCta: PropTypes.string,
	privatePrescriptionButtonLink: PropTypes.string,
	noPrescriptionButtonText: PropTypes.string,
	noPrescriptionButtonCta: PropTypes.string,
	noPrescriptionButtonLink: PropTypes.string,
	loginPagePath: PropTypes.string,
	goBackText: PropTypes.string,
	goBackLink: PropTypes.string,
	isLoggedIn: PropTypes.bool,
};

export default connect(mapStateToProps, null)(WizardSelector);
