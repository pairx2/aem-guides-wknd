import {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getJwtToken} from '../../../api/authentication.service';
import {openModalAction} from '../../Modal/redux/actions/index';
import {buildCreateOrderSchema} from '../redux/schemas/create_order.schema';
import {getGraphQlCallOptions} from '../../../utils/endpointUrl';
import {i18nLabels} from '../../../utils/translationUtils';

const mapDispatchToProps = {
	openModalAction
};

class PaymentHelper extends Component{
	constructor(props) {
		super(props);
		window.PaymentHelper = this;
	}

	static propTypes = {
		isTriggerSaveOrderBeforePayment : PropTypes.bool,
		openModalAction: PropTypes.func,
		cardID : PropTypes.string,
		readerInformation: PropTypes.string,
		callCTAStyle: PropTypes.string,
		buttonAction:PropTypes.string,
		buttonLabel:PropTypes.string,
	}

	componentDidMount() {
		const {isTriggerSaveOrderBeforePayment, cardID} = this.props;
		this.setState({isTriggerCreateOrder: isTriggerSaveOrderBeforePayment});
		if(isTriggerSaveOrderBeforePayment) {
			getJwtToken().then(token => {
				this.setState({options: getGraphQlCallOptions(buildCreateOrderSchema(cardID),token, null, {})});
			});
		}
	}

	createOrderError () {
		const {openModalAction, callCTAStyle} = this.props;
		const errorModalProps = {
			callCTAStyle: callCTAStyle,
			buttonAction: window.location.href,
			readerInformation: i18nLabels.CREATE_ORDER_ERROR_MODAL_TEXT,
			buttonLabel: i18nLabels.CREATE_ORDER_ERROR_MODAL_CALLBACK_TEXT
		};

		openModalAction({
			heading: i18nLabels.CREATE_ORDER_ERROR_MODAL_HEADING,
			contentID: 'CreateOrderErrorModal',
			props: errorModalProps
		});
	}

	render() {
		return null
	}
}
PaymentHelper = connect(null,
	mapDispatchToProps
)(PaymentHelper);

PaymentHelper.defaultProps = {
	isTriggerSaveOrderBeforePayment: false
};
export default PaymentHelper;