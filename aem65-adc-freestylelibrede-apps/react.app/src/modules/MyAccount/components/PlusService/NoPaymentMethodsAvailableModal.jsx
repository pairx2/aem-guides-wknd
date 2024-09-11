import React from 'react';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import Button, {
	BUTTON_OPTIONS,
} from '../../../Generic/components/Button/Button';
import Col from '../../../Generic/components/Container/Col';
import Row from '../../../Generic/components/Container/Row';

const mapStateToProps = (state) => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};

const mapDispatchToProps = {
	closeModalAction
};

const NoPaymentMethodsAvailableModal = (props) => {
	const {closeModalAction} = props;
	const goBack = () => {
		closeModalAction();
	};

	return (
		<Row className="align-items-center mt-4">
			<Col md={2} xl={1} className="text-center">
				<Icon image={'large-danger'} size={Icon.SIZE.LARGER}/>
			</Col>
			<Col md={10} xl={11} className="text-left">
				<p><I18n text={i18nLabels.UNABLE_TO_UPDATE_ADDRESS}/></p>
			</Col>
			<Col md={4} xl={5} offsetMd={2} offsetXl={1} className={'text-left mt-4'}>
				<Button
					label={i18nLabels.OK_CTA_TEXT}
					ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
					action={goBack}
					hasNoMargin
					isFullWidth
				/>
			</Col>
		</Row>
	);
};

NoPaymentMethodsAvailableModal.propTypes = {
	modalProps: PropTypes.shape({}),
	closeModalAction: PropTypes.func,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NoPaymentMethodsAvailableModal);
