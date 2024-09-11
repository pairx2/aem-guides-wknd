import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import { closeModalAction } from '../../../Modal/redux/actions';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import { For } from '../../../Generic/components/Logic/LogicalComponents';
import { clearAddressErrors } from '../../../Address/redux/actions/address.action';

const mapStateToProps = state => {
	// prop: state.reducer.prop
	const { isLoading, error, errorAddressDelete } = state.addressModuleReducer.AddressReducer;
	return { isLoading, error, errorAddressDelete };
};


export default connect(mapStateToProps, null)(class DeleteOrderAddressConfirmationModal extends Component {

	static propTypes = {
		onConfirmAction: PropTypes.func,
		error: PropTypes.object,
		isLoading: PropTypes.bool,
		errorAddressDelete: PropTypes.string
	};

	removeAddress = () => {
		const { dispatch, onConfirmAction } = this.props;

		dispatch(onConfirmAction);
	};

	closeModal = () => {
		const { dispatch } = this.props;
		dispatch(closeModalAction());
		dispatch(clearAddressErrors());
	};

	render() {
		const { isLoading, errorAddressDelete } = this.props;
		const errorCodes = errorAddressDelete;
		return <div className="adc-modal-delete p-3">
			<Row className="align-items-center">
				<Col md={2} className={'text-center mb-2'}>
					<Icon image={'large-danger'} size={'larger'} />
				</Col>
				<Col md={10} className="text-left">
					<if condition={errorCodes}>
						{<I18n text={`magento_error_code_${errorCodes}`} />}

					</if>
					<else>
						<I18n text={'remove_address_confirmation_message'} />
					</else>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={10} lg={8} offsetlg={2}>
					<Row>
						<Col md={6}>
							<Button
								action={this.closeModal}
								ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
								className={'px-0 close-modal'}
								isFullWidth
								hasNoMargin
								label={'cancel_cta'}
							/>
						</Col>
						<Col md={6} className="mt-3 mt-md-0">
							<Button
								label={'remove_confirmation_cta'}
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
								className={'px-0'}
								hasNoMargin
								isFullWidth
								isDisabled={!!(isLoading || errorCodes)}
								action={this.removeAddress}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>;
	}
});