import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUrlParameter} from '../../../../utils/getParams';
import {downloadInvoiceRequest} from '../../../MyAccount/redux/actions/orders.action';
import {getOrderReturnRmaDetailsRequest} from '../../redux/actions/orders.action';
import {downloadDocumentRequest} from '../../redux/actions/download_document.action';
import {DOWNLOAD_OPTIONS} from '../../../../utils/enums';
import {openModalAction} from '../../../Modal/redux/actions/index';
import {i18nLabels} from '../../../../utils/translationUtils';

const mapStateToProps = state => {
	const {ghostOrders} = state.myAccountModuleReducer.GetGhostOrdersReducer;
	const {error} = state.myAccountModuleReducer.OrderReturnReducer;
	return {ghostOrders,error};
};

const mapDispatchToProps = {
	getInvoice: downloadInvoiceRequest,
	getOrderReturnRmaDetailsRequest,
	downloadDocumentRequest,
	openModalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(class Deeplink extends Component {
	static propTypes = {
		getInvoice: PropTypes.func,
		getOrderReturnRmaDetailsRequest:PropTypes.func,
		ghostOrders: PropTypes.array,
		downloadDocumentRequest: PropTypes.func,
		error:PropTypes.string,
		openModalAction: PropTypes.func
	};

	componentDidMount() {
		const {getOrderReturnRmaDetailsRequest, getInvoice} = this.props;
		const docName = getUrlParameter('docName');
		if (docName === DOWNLOAD_OPTIONS.RMA) {
			const shipment = {
				order_number : getUrlParameter('orderId'),
				return_id : getUrlParameter('returnId')
			};
			getOrderReturnRmaDetailsRequest(shipment);
		} else if (docName === DOWNLOAD_OPTIONS.INVOICE || docName === DOWNLOAD_OPTIONS.CREDIT_NOTE) {
			const payload = {
				orderId : getUrlParameter('orderId'),
				invoiceId : getUrlParameter('invoiceId')
			};
			getInvoice(payload);
		}
	}

	componentDidUpdate(prevProps) {
		const {downloadDocumentRequest,ghostOrders,error, openModalAction} = this.props;
		const docName = getUrlParameter('docName');
		if(prevProps.ghostOrders !== ghostOrders && ghostOrders.length && docName === DOWNLOAD_OPTIONS.RX_PDF) {
			const rxmcNumber = getUrlParameter('rxmc');
			const matchedGhostOrder = ghostOrders.find(ghostorder => ghostorder.rxmc === rxmcNumber);
			const downloadPayload = {
				fileContent: matchedGhostOrder?.claim_receipt,
				fileName: i18nLabels.APPLICATION_FOR_REIMBURSMENT
			};
			downloadDocumentRequest(downloadPayload);
		}
		if(prevProps.error !== error && error) {
			openModalAction({
				heading: i18nLabels.RMA_DOWNLOAD_ERROR,
				contentID: 'deeplinkDownloadFailed',
				props: {
					paragraph_1: i18nLabels.RMA_DOWNLOAD_FAILED,
				}
			});
		}
	}

	render() {
		return (
			<>
			</>
		);
	}
});