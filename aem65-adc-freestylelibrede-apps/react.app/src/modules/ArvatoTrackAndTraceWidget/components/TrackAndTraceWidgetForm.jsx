import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import TextField from '../../Form/components/GenericFields/TextField';
import { regexDynamicMatch, required } from '../../Form/utils/validationRules';
import Button, { BUTTON_OPTIONS } from '../../Generic/components/Button/Button';

const TrackAndTraceWidgetForm = ({ handleSubmit, onSubmitTrack, heading, orderIdText, orderIdPlaceHolderText,  zipCodeText, zipCodePlaceHolderText, submitButtonText ,orderIdLength , zipCodeLength , successLink, submitCtaStyle}) => {
	
	return (
		<div className='container'>
			<div className="row justify-content-md-center">
				<div className="adc-arvato-widget-sub-heading">
					<form onSubmit={handleSubmit(onSubmitTrack)}>
						<div className="adc-login">
							<div className="adc-login__left--inner adc-form-group">
								<div class="adc-arvato-widget-heading">
									<h1 class="adc-arvato-widget-heading--title text-left adc-title adc-title--blue d-flex justify-content-start">{heading}</h1>
								</div>
								<div className="adc-form-group mb-3">
									<TextField
										label={orderIdText}
										name="orderId"
										placeholder={orderIdPlaceHolderText}
										type="text"
										className={'mt-1'}
										validationRules={[required, regexDynamicMatch]}
										maxLength={orderIdLength}
										labelClassName={"adc-arvato-widget-label-style"}
									/>
								</div>
								<div className="adc-form-group mb-3">
									<TextField
										label={zipCodeText}
										name="zipCode"
										placeholder={zipCodePlaceHolderText}
										type="text"
										className={'mt-4'}
										validationRules={[required, regexDynamicMatch]}
										maxLength={zipCodeLength}
										labelClassName={"adc-arvato-widget-label-style"}
									/>
								</div>
								<div className="adc-login__submit-btn">
									<div className="row">
										<div className="col-md-8 adc-arvato-widget-button-aligment">
											<Button
												className={'ml-0'}
												label={submitButtonText}
												ctaStyle={submitCtaStyle === BUTTON_OPTIONS.STYLE.SECONDARY ? BUTTON_OPTIONS.STYLE.SECONDARY : BUTTON_OPTIONS.STYLE.PRIMARY}
												type={BUTTON_OPTIONS.TYPE.SUBMIT}
												hasNoMargin
											/>
										</div>
									</div>

								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	);
};

TrackAndTraceWidgetForm.propTypes = {
	handleSubmit: PropTypes.func,
};

export default reduxForm({
	form: 'trackAndTraceWidgetForm',
})(TrackAndTraceWidgetForm);