import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import {deleteOrderAddressRequest} from '../../redux/actions/customer.action';
import {closeModalAction} from '../../../Modal/redux/actions';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {empty} from '../../../../utils/default';

const mapStateToProps = state => {
	// prop: state.reducer.prop
	const {addressID, hideDeleteAddressModal} = state.myAccountModuleReducer.GetCustomerReducer;
	return {addressID, hideDeleteAddressModal};
};

const mapDispatchToProps = {
	// prop: action
	deleteOrderAddressRequest,
	closeModalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(class DeleteOrderAddressConfirmationModal extends Component {

	static propTypes = {
		closeModalAction: PropTypes.func,
		deleteOrderAddressRequest: PropTypes.func,
		addressID: PropTypes.number,
	};
	static defaultProps = {
		closeModalAction: empty.function
	};
	removeAddress = () => {
		this.props.deleteOrderAddressRequest({addressID: this.props.addressID});
	};

	render() {
		const {closeModalAction} = this.props;
		return <div className="adc-modal-delete">
			<h4 className="adc-modal-delete__heading text-left">
				<I18n
					text={i18nLabels.REMOVE_ADDRESS_MODAL_HEADING}
				/>
			</h4>
			<div className="row mt-3">
				<div className="col-1">
					<Icon
						image={'large-danger'}
						size={'large'}
					/>
				</div>
				<div className="col-11 text-left">
					<I18n
						text={i18nLabels.REMOVE_ADDRESS_CONFIRMATION_MESSAGE}
					/>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-12 col-lg-8">
					<div className="row">
						<div className="col-12 col-md-6">
							<Button
								action={closeModalAction}
								ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
								className={'px-0 close-modal'}
								isFullWidth
								hasNoMargin
								label={'cancel_cta'}
							/>
						</div>
						<div className="col-12 col-md-6 mt-3 mt-md-0">
							<Button
								label={'remove_confirmation_cta'}
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
								className={'px-0'}
								hasNoMargin
								isFullWidth
								action={this.removeAddress}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
});