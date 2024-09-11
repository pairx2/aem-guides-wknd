import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import OrderPaymentDisplayAndEdit from '../../../MyAccount/components/PlusService/OrderPaymentDisplayAndEdit.jsx';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};

const ChangePaymentMethodModal = (props) => {
	return (
		<div>
			<Row>
				<Col className='mt-4'>
					<OrderPaymentDisplayAndEdit order={props.order} customer={props.customer} checkboxes={props.checkboxes} confirmationPage={props.confirmationPath}/>
				</Col>
			</Row>
		</div>
	);
};

ChangePaymentMethodModal.propTypes = {
	modalProps: PropTypes.shape({}),
	order: PropTypes.object,
	customer: PropTypes.object,
	checkboxes: PropTypes.array,
	confirmationPath: PropTypes.string
};

export default connect(mapStateToProps)(ChangePaymentMethodModal);
