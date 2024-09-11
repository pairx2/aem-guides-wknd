import React from 'react';
import {connect} from 'react-redux';
import Icon from '../../../Generic/components/Icon/Icon';
import {i18nLabels} from '../../../../utils/translationUtils';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};

const mapDispatchToProps = {
	closeModalAction
};

const RegistrationErrorModal = (props) => {
	const {
		modalProps: {
			errorMessage: errorMessage
		},
		closeModalAction
	} = props;
	return <div className="row adc-error-modal">
		<div className="col-12">
			<div className="rounded bg-white px-lg-4 py-lg-3 py-3">
				<div className="row">
					<div className="col-12 col-sm-2 col-md-2 text-center">
						<Icon className={'adc-error-modal--danger'} image={'large-danger-orange'}/>
					</div>
					<div className="col-12 col-sm-10 col-md-10">
						<h3><I18n text={i18nLabels.REGISTRATION_ERROR}/></h3>
						<h5><I18n text={errorMessage}/></h5>
					</div>
				</div>
				<div className="border-bottom-grey my-4"/>
				<div className="col-12 col-lg-10 text-right m-0 p-0">
					<div className="row">
						<div className="col-12 col-sm-6 col-md-6">
							<Button
								label={i18nLabels.RETURN_TO_FORM}
								ctaStyle={'primary'}
								action={closeModalAction}
								isFullWidth
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

RegistrationErrorModal.propTypes = {
	modalProps: PropTypes.shape({
		errorMessage: PropTypes.string
	}),
	closeModalAction: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationErrorModal);