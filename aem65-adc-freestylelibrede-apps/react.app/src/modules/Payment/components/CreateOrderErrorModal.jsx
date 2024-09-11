import React from 'react';
import {connect} from 'react-redux';
import Icon from '../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import Button from '../../Generic/components/Button/Button';
import Row from '../../Generic/components/Container/Row';
import Col from '../../Generic/components/Container/Col';
import I18n from '../../Translation/components/I18n';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};

const CreateOrderErrorModal = (props) => {
	const {
		modalProps: {
			readerInformation: readerInformation,
			callCTAStyle: callCTAStyle,
			buttonAction: buttonAction,
			buttonLabel: buttonLabel
		}
	} = props;
	return <Row>
		<Col className='border-bottom-grey'>
			<div className="row mt-3">
				<div className="col-12 col-md-1 text-center">
					<Icon
						image={'large-danger-orange'}
						size={'large'}
					/>
				</div>
				<div className="col-12 col-md-11 text-left">
					<I18n text={readerInformation}/>
				</div>
			</div>
			<div className="row mt-3 mb-4">
				<div className="col-12 col-md-1 text-center" />
			</div>
		</Col>
		<Col className='mt-4'>
			<Col lg={4} className='mt-2 float-right'>
				<Button
					label={buttonLabel}
					ctaStyle={callCTAStyle}
					href={buttonAction}
					hasNoMargin
					className={'full-width'}
					isFullWidth
				/>
			</Col>
		</Col>
	</Row>;
};

CreateOrderErrorModal.propTypes = {
	modalProps: PropTypes.shape({
		readerInformation: PropTypes.string,
		callCTAStyle: PropTypes.string,
		buttonAction: PropTypes.string,
		buttonLabel: PropTypes.string
	})
};
export default connect(mapStateToProps, null)(CreateOrderErrorModal);