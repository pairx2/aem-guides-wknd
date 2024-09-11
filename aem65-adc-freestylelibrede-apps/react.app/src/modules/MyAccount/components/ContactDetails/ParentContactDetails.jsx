import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import EditContactDetails from './EditContactDetails';
import DisplayContactDetails from './DisplayContactDetails';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';
import { RECAPTCHA_VALIDATION_ERROR_CODE } from '../../../../utils/enums';

const getPermissions = (permissions) => {
	const initialvalues = {};
	permissions.map((permission) => {
		permission?.communication_channels?.map((channel) => {
			initialvalues[channel.communication_channel + '_FOR_' + permission.communication_type] = true;
		});
	});
	return initialvalues;
};
const mapStateToProps = (state, props) => ({
	 initialValues: getPermissions(props.permissions)
});
const ParentContactBoxes = ({abortCtaStyle, saveCtaStyle, handleSubmit, pristine, switchComponentHandler, isEditing, permissions, errorCode, isMobileVerified , errorCodeUpdate}) => {
	const errorCodeNumber =  errorCodeUpdate && errorCodeUpdate!== null ? errorCodeUpdate : errorCode;
	const isEditwithLength = !isEditing && permissions.length === 0;
	return <form onSubmit={handleSubmit}>
		<if condition={errorCodeNumber !== null && errorCodeNumber !==RECAPTCHA_VALIDATION_ERROR_CODE}>
			<div className="mt-1">
				<span className="adc-form-group--error mt-4">
					<I18n text={'magento_error_code_' + errorCodeNumber}/>
				</span>
			</div>
		</if>
		<if condition={errorCodeNumber !== null && errorCodeNumber ===RECAPTCHA_VALIDATION_ERROR_CODE}>
			<div className="mt-1">
				<span className="adc-form-group--error mt-4">
					<I18n text={'newsletter_error_' + errorCodeNumber}/>
				</span>
			</div>
		</if>
		<elseif condition={isEditwithLength}>
			<div className="mt-1">
				<span className="adc-form-group--error mt-4">
					<I18n text={i18nLabels.NO_PERMISSION}/>
				</span>
			</div>
		</elseif>
		<if condition={!isEditing}>
			<DisplayContactDetails permissions={permissions}/>
			<if condition={!errorCode}>
				<div className="adc-contact-edit py-2 clearfix">
					<div className="text-right">
						<Link
							action={switchComponentHandler}
							icon={'edit-icon'}
							label={i18nLabels.EDIT}
						/>
					</div>
				</div>
			</if>
		</if>
		<else>
			<EditContactDetails isMobileVerified={isMobileVerified}/>
			<div className="adc-contact-details__edit py-3">
				<div className="row">
					<div className="col-12 col-md-6 pr-lg-2 pr-md-2 pr mb-3 mb-md-0">
						<Button
							className={'button-block text-center  mx-0 w-100'}
							label={i18nLabels.CANCEL_CTA}
							ctaStyle={abortCtaStyle && abortCtaStyle.toLowerCase()}
							size={BUTTON_OPTIONS.SIZE.SMALL}
							action={switchComponentHandler}
						/>
					</div>
					<div className="col-12 col-md-6 pl-lg-2 pl-md-2 pl">
						<Button
							className={'button-block text-center  mx-0 w-100 '}
							label={i18nLabels.SAVE_CTA}
							ctaStyle={saveCtaStyle && saveCtaStyle.toLowerCase()}
							size={BUTTON_OPTIONS.SIZE.SMALL}
							type={BUTTON_OPTIONS.TYPE.SUBMIT}
							isDisabled={pristine}
						/>
					</div>
				</div>
				<div className={'mt-4'}>
					<RecaptchaField />
				</div>
			</div>
		</else>
	</form>;
};

ParentContactBoxes.propTypes = {
	switchComponentHandler: PropTypes.func,
	abortCtaStyle: PropTypes.string,
	saveCtaStyle: PropTypes.string,
	isEditing: PropTypes.bool,
	pristine:PropTypes.bool,
	isMobileVerified: PropTypes.bool,
	permissions: PropTypes.array,
	errorCode: PropTypes.number,
	errorCodeUpdate:PropTypes.number
};
export default connect(mapStateToProps, null)(
	reduxForm({
		form: 'contactDetailsForm',
		enableReinitialize: true
	})(ParentContactBoxes)
);