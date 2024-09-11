import React, {Component} from 'react';
import Icon from '../../../Generic/components/Icon/Icon.jsx';
import I18n from '../../../Translation/components/I18n.jsx';
import {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import {downloadDocumentRequest} from '../../redux/actions/download_document.action';
import {getOrdersByRxmc} from '../../redux/actions/get_orders.action';
import {resetGhostOrdersSuccess} from '../../redux/actions/get_ghost_orders.action';
import {connect} from 'react-redux';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {getFormattedDate} from '../../../../utils/dateUtils';
import Link from '../../../Generic/components/Link/Link';
import DeliverableList from './DeliverableList';
import {downloadInvoiceRequest} from '../../redux/actions/orders.action';
import {openModalAction} from '../../../Modal/redux/actions';
import {GHOST_ORDER_TYPE} from '../../../../utils/enums';

const mapDispatchToProps = {
	downloadDocumentRequest,
	getOrdersByRxmc,
	openModalAction,
	resetGhostOrdersSuccess,
	getInvoice: downloadInvoiceRequest,

};

const mapStateToProps = state => {
	const {rxmcOrders} = state.myAccountModuleReducer.GetOrdersReducer;
	const {RX:{orderList}} = state.myAccountModuleReducer.GetOrdersReducer.orders;
	const {deactivatedRxmc} = state.myAccountModuleReducer.GetGhostOrdersReducer;
	return {orderList, rxmcOrders, deactivatedRxmc};
};

export default connect(mapStateToProps, mapDispatchToProps)(class PrescriptionDetails extends Component {
	static defaultProps = {
		rxOrderStatus50 : 50
	}
	static propTypes = {
		rxOrderStatus50: PropTypes.number,
		title: PropTypes.string,
		ghostOrder: PropTypes.object,
		customer: PropTypes.object,
		openModalAction: PropTypes.func,
		orderList: PropTypes.array,
		getOrdersByRxmc: PropTypes.func,
		resetGhostOrdersSuccess: PropTypes.func,
		rxmcOrders: PropTypes.object,
		deactivatedRxmc: PropTypes.object,
		icon:PropTypes.string,
		textdescription:PropTypes.string,
		linktext:PropTypes.string,
		linkpath:PropTypes.string,
		expandActiveOrderLink:PropTypes.bool,
		claim_receipt: PropTypes.string,
		downloadDocumentRequest: PropTypes.func,
		downloadLabel: PropTypes.string,
		instructionText: PropTypes.string,
		getInvoice: PropTypes.func,
		ghostType: PropTypes.string
	};

	state = {
		isDetailsOpen: false,
		isOrderAvailableInReducer: false,
		order: {}
	};

	getGhostOrder = () => {
		const {ghostOrder: {rxmc}, orderList} = this.props;
		return orderList.find(order => order.rxmc === rxmc);
	}
	getStatusIcon = (statusCode) => {
		switch (statusCode) {
			case 25:
			case 30:
			case 31:
			case 33:
			case 37:
			case 60:
			case 91:				
			case 92:
			case 90:
			case 95:
				return 'large-x-circle-orange';
			case 0:
			case 20:
			case 23:
			case 27:
			case 35:
			case 38:
			case 40:
			case 50:
				return 'tick-circle-blue';
			case 10:
			default:
				return 'waiting-icon';
		}
	}
	doesCustomerRequired = statusCode => statusCode === 25  || statusCode === 30 || statusCode === 31 || statusCode === 32 || statusCode === 33 || statusCode === 37 || statusCode === 60;


	canBeDeactivated = statusCode => {
		switch (statusCode) {
			case 0:
			case 10:
			case 20:
			case 22:
			case 23:
			case 25:
			case 27:
			case 35:
			case 38:
			case 39:
			case 40:
			case 48:
				return true;
			case 49:
			case 50:
				return true;
			default:
				return false;
		}
	};
	deActivateSubscription = () =>{
		const {ghostOrder: {rxmc, hmm_order_id}, resetGhostOrdersSuccess, openModalAction} = this.props;
		resetGhostOrdersSuccess();
		openModalAction({
			heading: i18nLabels.DEACTIVATE,
			contentID: 'deactivateGhostOrder',
			props: {
				orderId:  hmm_order_id,
				rxmc: rxmc
			}
		});
	}
    componentDidMount() {
		const {expandActiveOrderLink} = this.props;
		const {ghostOrder:ghostOrder, ghostType} = this.props;
		const {rxOrderStatus50} = this.props;
		if(expandActiveOrderLink && ghostOrder.status_code === rxOrderStatus50) {
			this.toggleDetails();
		}

		if(ghostType && ghostType === GHOST_ORDER_TYPE.ACTIVE_ORDER) {
			this.toggleDetails();
		}

    }
	
	toggleDetails = () => {
		const {ghostOrder: {rxmc}, getOrdersByRxmc, rxmcOrders} = this.props;
		const {isDetailsOpen} = this.state;
		const order = rxmcOrders?.[rxmc];
		let isOrderAvailableInReducer = false;
		if (order && isDetailsOpen !== true) {
			isOrderAvailableInReducer = true;
			this.setState({order});
		} else if (!order && isDetailsOpen !== true) {
			getOrdersByRxmc(rxmc);
		}
		this.setState({
			isDetailsOpen: !isDetailsOpen,
			isOrderAvailableInReducer
		});
	}

	render() {
		const {
			title,icon, textdescription, linktext, linkpath,
			ghostOrder: {rxmc, frontend_status, payer_institution_name, status_code, prescription_start_date, claim_receipt},
			customer: {health_insurance_number},
			rxmcOrders,
			downloadDocumentRequest,
			downloadLabel,
			instructionText,
			deactivatedRxmc,
			getInvoice
		} = this.props;
		const {isDetailsOpen, order, isOrderAvailableInReducer} = this.state;
		const downloadPayload = {
			fileContent: claim_receipt,
			fileName: i18nLabels.APPLICATION_FOR_REIMBURSMENT
		};

		const status50Condition = (frontend_status && frontend_status >= 50) || (status_code && status_code >= 50);

		return (
			<Row>
				<if condition={status50Condition}>
					<Col>
						<h5><I18n text={i18nLabels.ORDER_DATE_LABEL}/>{getFormattedDate(prescription_start_date)}</h5>
					</Col>
				</if>
				<Col lg={7} md={12} className='pb-2'>
					<div className="adc-prescription--border">
						<h5 className="adc-title--black">{title}</h5>
						<div className="mt-1 clearfix adc-prescription__details">
							<div><I18n text={i18nLabels.RECEIPT_CODE} suffix={':'} /></div>
							<div>{rxmc}</div>
						</div>
						<div className="mt-1 clearfix adc-prescription__details">
							<div><I18n text={i18nLabels.INSURANCE_NAME_LABEL} suffix={':'} />
							</div>
							<div>{payer_institution_name}</div>
						</div>
						<div className="mt-1 clearfix adc-prescription__details">
							<div><I18n text={i18nLabels.INSURANCE_NUMBER_LABEL}
								suffix={':'} /></div>
							<div>{health_insurance_number}</div>
						</div>
						<if condition={deactivatedRxmc?.[rxmc] && !this.canBeDeactivated(frontend_status || status_code)}>
							<section>
								<div className="d-flex mt-5">
									<div className="mr-2">
										<Icon image={'large-x-circle-orange'} size={Icon.SIZE.HUGE} />
									</div>
									<div className="w-75 adc-plus-service__error-msg">
										<I18n text={i18nLabels.GHOST_ORDER_DEACTIVATED_MESSAGE}/>
									</div>
								</div>
							</section>
						</if>

					</div>
				</Col>
				<Col lg={5} md={12}>
					<div className="adc-presc-info py-4">
						<if condition={(frontend_status || status_code)}>
							<h5 className="adc-presc-info__receipt-status d-flex align-items-center">
								<span className="adc-presc-info__icon"><Icon image={this.getStatusIcon(frontend_status || status_code)} size={Icon.SIZE.L52} /></span>
								<span className="ml-3"><I18n text={`ghost_order_status_${frontend_status || status_code}`} /></span>
							</h5>
						</if>
						<if condition={(frontend_status && frontend_status === 10) || status_code === 10}>
							<p className="text-small" dangerouslySetInnerHTML={{__html: instructionText}}/>
							<div className="d-flex justify-content-center justify-content-md-start mt-4">
								<Button
									action={() => downloadDocumentRequest(downloadPayload)}
									label={downloadLabel}
									hasNoMargin
									isFullWidth
									icon={'download-white'}
									iconPosition={Icon.POSITION.LEFT}
									className={'mx-lg-0'}
								/>
							</div>
						</if>
						<if condition={this.doesCustomerRequired(frontend_status || status_code)}>
							<div className="d-flex justify-content-center justify-content-md-start mt-4">
								<div className="d-flex adc-presc-info__border mb-lg-3 ">
									<span className='adc-presc-info__circle mt-lg-3'><i className={`adc-icon mt-1 ml-1 adc-presc-info__icon adc-icon--${icon} align-middle`} /></span>
									<div className='d-block mt-lg-3'>
										<p className="adc-presc-info__text ml-3 mb-1 mt-1" dangerouslySetInnerHTML={{__html:textdescription}}/>
										<Link href={linkpath}
											className="d-block ml-3"
											label={linktext}
										/>
									</div>
								</div>
							</div>
						</if>
					</div>
				</Col>
				<Col className={'text-right'}>
					<if condition={this.canBeDeactivated(frontend_status || status_code)}>
						<div className="offset-lg-7 col-lg-5 mb-3 p-0 pl-lg-3">
							<Button
								type={BUTTON_OPTIONS.TYPE.BUTTON} label={i18nLabels.DEACTIVATE}
								isFullWidth
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} hasNoMargin action={this.deActivateSubscription}/>
						</div>
					</if>
					<if condition={status50Condition}>
						<Link
							className={'mb-1 mt-lg-4'}
							action={this.toggleDetails}
							icon={isDetailsOpen ? 'arrow-up-blue' : 'arrow-down-blue'}
							label={i18nLabels.DETAILS}
						/>
					</if>
				</Col>
				<if condition={isDetailsOpen}>
					<DeliverableList
						order={isOrderAvailableInReducer ? order : rxmcOrders?.[rxmc]}
						showLoader={rxmcOrders?.[rxmc] ? false : true}
						isOrderAvailable={rxmcOrders?.[rxmc]?.error ? false : true}
						getInvoice={getInvoice}
					/>
				</if>
			</Row>
		);
	}
});