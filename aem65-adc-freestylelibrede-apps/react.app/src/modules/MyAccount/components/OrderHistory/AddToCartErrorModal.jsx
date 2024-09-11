import React from 'react';
import {connect} from 'react-redux';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import PropTypes from 'prop-types';
import {For} from '../../../Generic/components/Logic/LogicalComponents';
import Col from '../../../Generic/components/Container/Col';
import Row from '../../../Generic/components/Container/Row';

const mapDispatchToProps = {
	closeModalAction
};

const AddToCartErrorModal = ({closeModalAction, errorCodes}) => {
	return <Row className="align-items-center mt-4">
		<Col md={2} xl={1} className="text-center">
			<Icon image={'large-danger'} size={Icon.SIZE.LARGER}/>
		</Col>
		<Col md={10} xl={11} className="text-left">
			<p><I18n text={i18nLabels.ADD_TO_CART_ERROR_DESCRIPTION} suffix={'.'}/></p>
			<For array={errorCodes}>
				{(errorCode, i) =>
					<p key={i} className={'adc-product-details__error-message order-sm-7 order-7 p-0 mb-1'}>
						<I18n text={'magento_error_code_' + errorCode}/>
					</p>}
			</For>
		</Col>
		<Col md={4} xl={5} offsetMd={2} offsetXl={1} className={'text-left mt-4'}>
			<Button
				label={i18nLabels.CLOSE_MODAL_LABEL}
				ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
				type={BUTTON_OPTIONS.TYPE.BUTTON}
				action={closeModalAction}
				hasNoMargin
				isFullWidth
			/>
		</Col>
	</Row>;
};

AddToCartErrorModal.propTypes = {
	closeModalAction: PropTypes.func,
	errorCodes: PropTypes.array,
};

export default connect(null, mapDispatchToProps)(AddToCartErrorModal);