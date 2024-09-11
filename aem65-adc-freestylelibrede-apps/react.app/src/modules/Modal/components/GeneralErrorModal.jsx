import React from 'react';
import {connect} from 'react-redux';
import Icon from '../../Generic/components/Icon/Icon';
import {i18nLabels} from '../../../utils/translationUtils';
import {closeModalAction} from '../../Modal/redux/actions/index';
import I18n from '../../Translation/components/I18n';
import PropTypes from 'prop-types';
import Button from '../../Generic/components/Button/Button';
import Row from '../../Generic/components/Container/Row';
import Col from '../../Generic/components/Container/Col';

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
			errorTitle: errorTitle,
			errorMessage: errorMessage
		},
		closeModalAction
	} = props;
	return <Row className="adc-error-modal">
		<Col>
			<Col className="rounded bg-white">
				<Row className="mt-4">
					<Col width={12} sm={2} md={2} className="text-center mb-3">
						<Icon className={'adc-error-modal--danger'} image={'large-danger-orange'}/>
					</Col>
					<Col width={12} sm={10} md={10}>
						<h3><I18n text={errorTitle}/></h3>
						<h5><I18n text={errorMessage}/></h5>
					</Col>
				</Row>
				<Col lg={7} offsetlg={2} className="text-right mt-4 p-0">
					<Row>
						<Col width={12} md={6}>
							<Button
								label={i18nLabels.BACK_CTA_TEXT}
								ctaStyle={'primary'}
								action={closeModalAction}
								isFullWidth
							/>
						</Col>
					</Row>
				</Col>
			</Col>
		</Col>
	</Row>;
};

RegistrationErrorModal.propTypes = {
	modalProps: PropTypes.shape({
		errorMessage: PropTypes.string,
		errorTitle: PropTypes.string
	}),
	closeModalAction: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationErrorModal);
