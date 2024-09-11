import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import Icon from '../../../Generic/components/Icon/Icon';
import DatePicker, {registerLocale} from 'react-datepicker';
import DatepickerCalendar from './DatepickerCalendar';
import {addDays} from 'date-fns';
import de from 'date-fns/locale/de';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import PropTypes from 'prop-types';
import {updateDeliveryDateRequest, resetDeliveryDateModal} from '../../../MyAccount/redux/actions/update_delivery_date.action';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {getFormattedDate} from '../../../../utils/dateUtils';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import {ORDER_TYPES} from '../../../../utils/enums';
import Link from '../../../Generic/components/Link/Link';

registerLocale('de', de);

const mapStateToProps = state => {
	const {isDeliveryDateUpdated, isDeliveryDateLoading, deliveryDateUpdationError} = state.myAccountModuleReducer.DeliveryDateUpdateReducer;
	const {numberofDaysAheadDueDateChange, numberofDaysBeforeDueDateChange, loadingOrders: isLoadingOrders, loadingCurrentOrders: isRxLoading} = state.myAccountModuleReducer.GetOrdersReducer;
	return {isDeliveryDateUpdated, isDeliveryDateLoading, deliveryDateUpdationError, numberofDaysAheadDueDateChange, numberofDaysBeforeDueDateChange, isLoadingOrders, isRxLoading};
};

const mapDispatchToProps = {
	updateDeliveryDateRequest,
	resetDeliveryDateModal,
	closeModalAction
};


export default connect(mapStateToProps, mapDispatchToProps)(class ChangeDeliveryDateModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deliveryDate: this.getDate(),
			selectedDate: this.getDate(),
			isCalendarOpen: false
		};
	}

	static propTypes = {
		updateDeliveryDateRequest: PropTypes.func,
		order: PropTypes.object,
		isDeliveryDateUpdated: PropTypes.bool,
		closeModalAction: PropTypes.func,
		isDeliveryDateLoading: PropTypes.bool,
		isLoadingOrders: PropTypes.bool,
		resetDeliveryDateModal: PropTypes.func,
		productDateOfNextShipment: PropTypes.number,
		productOriginalDateFrom: PropTypes.number,
		productRescheduledDueDate: PropTypes.number,
		productOriginalDateOfNextShipment: PropTypes.number,
		deliveryDateUpdationError: PropTypes.string,
		productDeliverable: PropTypes.array,
		numberofDaysAheadDueDateChange: PropTypes.number,
		numberofDaysBeforeDueDateChange: PropTypes.number,
		isRxLoading: PropTypes.bool
	};

	handleChange = date => {
		this.setState({
			selectedDate: date
		});
	};

	handleConfirm = date => {
		this.setState({
			deliveryDate: date,
			isCalendarOpen: false
		});
	};

	toggleCalendar = () => {
		this.setState({
			isCalendarOpen: !this.state.isCalendarOpen
		});
	};

	updateDeliveryDate = () => {
		const {selectedDate} = this.state;
		const {order: {orderId, orderType, rxmc}, updateDeliveryDateRequest, productDeliverable} = this.props;
		updateDeliveryDateRequest({
			order_id: orderType === ORDER_TYPES.RX ? rxmc : orderId,
			order_type: orderType,
			delivery_date: selectedDate,
			deliverable_id: productDeliverable
		});
	};

	componentWillUnmount() {
		this.props.resetDeliveryDateModal();
	}

	getDate = () => {
		const {productDateOfNextShipment, productOriginalDateOfNextShipment, productOriginalDateFrom, productRescheduledDueDate} = this.props;
		let showCurrentDate;
		if(productDateOfNextShipment) {
			showCurrentDate = new Date(productDateOfNextShipment);
		} else if(productOriginalDateOfNextShipment) {
			showCurrentDate = new Date(productOriginalDateOfNextShipment);
		} else if (productRescheduledDueDate) {
			showCurrentDate = new Date(productRescheduledDueDate);
		} else if (productOriginalDateFrom) {
			showCurrentDate = new Date(productOriginalDateFrom);
		} else {
			showCurrentDate = new Date();
		}
		return showCurrentDate;
	};

	//get minimum date for fifth day of previous month
	//get minimum date for fifth day of previous month
	getMinDate = () => {
		const { productOriginalDateOfNextShipment, productOriginalDateFrom, numberofDaysBeforeDueDateChange } = this.props;
		const today = new Date();
		const nextShipmentDate = new Date(productOriginalDateOfNextShipment || productOriginalDateFrom);
		const firstDayOfPreviousMonth = new Date(nextShipmentDate.getFullYear(), nextShipmentDate.getMonth() - 1, 1)
		const minDate = addDays(firstDayOfPreviousMonth, numberofDaysBeforeDueDateChange);
		return today > minDate ? new Date(today.setDate(today.getDate() + 1)) : minDate;
	};


	render() {
		const {isCalendarOpen, selectedDate, deliveryDate} = this.state;
		const {isDeliveryDateLoading, isLoadingOrders, isDeliveryDateUpdated, productOriginalDateOfNextShipment, productOriginalDateFrom, numberofDaysAheadDueDateChange, deliveryDateUpdationError, isRxLoading, order} = this.props;
		const isLoading = order.orderType === ORDER_TYPES.RX ? isRxLoading : isLoadingOrders;

		return <div className="adc-change-delivery">
			<if condition={isDeliveryDateLoading || isLoading}>
				<LoadingIndicator label={i18nLabels.LOADING_MESSAGE}/>
			</if>
			<if condition={!isDeliveryDateLoading && !isDeliveryDateUpdated && !deliveryDateUpdationError}>
				<div className="row align-items-center">
					<div className="col-md-2 col-xl-1 text-center my-4">
						<Icon image={'clock-calendar-blue'} size={Icon.SIZE.LARGER}/>
					</div>
					<div className="col-md-10 col-xl-11 text-left">
						<p><I18n text={i18nLabels.CHOOSE_NEW_DELIVERY_DATE} suffix={'.'}/></p>
					</div>
					<div className="col-md-10 col-xl-11 offset-md-2 offset-xl-1 text-left mobile-remove-relative">
						<p><I18n text={i18nLabels.CHOOSE_NEW_DELIVERY_DATE_WARNING} suffix={'.'}/></p>
						<label htmlFor="delivery-date" className="adc-product-details__label-title adc-datepicker__label mt-2">
							<I18n text={i18nLabels.EXPECTED_DELIVERY_DATE} suffix={':'}/>
						</label>
						<DatePicker
							id="delivery-date"
							selected={selectedDate}
							onChange={this.handleChange}
							dateFormat="dd.MM.yyyy"
							inline
							minDate={this.getMinDate()}
							maxDate={addDays(new Date(productOriginalDateOfNextShipment || productOriginalDateFrom), parseInt(numberofDaysAheadDueDateChange))}
							locale="de"
							calendarClassName="rasta-stripes"
							calendarContainer={DatepickerCalendar(isCalendarOpen, this.toggleCalendar, this.handleConfirm, selectedDate, deliveryDate)}
							renderCustomHeader={({date, decreaseMonth, increaseMonth}) => {
								const formattedHeader = new Intl.DateTimeFormat('de-DE', {
									year: 'numeric',
									month: 'long'
								}).format(date);
								return (
									<div className="adc-datepicker__header">
										<button className="adc-datepicker__mobile-content" onClick={decreaseMonth}>
											<Icon image={'arrow-left'} size={Icon.SIZE.MEDIUM}/>
										</button>
										<p className="adc-datepicker__current-month">{formattedHeader}</p>
										<button className="adc-datepicker__mobile-content" onClick={increaseMonth}>
											<Icon image={'arrow-right'} size={Icon.SIZE.MEDIUM}/>
										</button>
										<div className="adc-datepicker__header-buttons adc-datepicker__desktop-content">
											<button onClick={decreaseMonth}>
												<Icon image={'arrow-left'} size={Icon.SIZE.MEDIUM}/>
											</button>
											<button onClick={increaseMonth}>
												<Icon image={'arrow-right'} size={Icon.SIZE.MEDIUM}/>
											</button>
										</div>
									</div>
								);
							}}
						/>
						<Button
							label={i18nLabels.SAVE_CTA}
							ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							action={this.updateDeliveryDate}
							hasNoMargin
							className='mt-4 adc-datepicker-width'
						/>
						<div className={'text-center adc-datepicker-width mt-2'}>
							<Link action={this.props.closeModalAction} label={i18nLabels.BACK} />
						</div>
					</div>
				</div>
			</if>
			<elseif condition={!isLoading && isDeliveryDateUpdated}>
				<Row>
					<Col md={2} xl={1} className={'text-center mt-4'}>
						<Icon image={'round-green-check'} size={Icon.SIZE.LARGER}/>
					</Col>
					<Col md={10} xl={11} className={'text-left mt-4 pl-4 pt-md-3'}>
						<p><I18n text={i18nLabels.DELIVERY_DATE_UPDATED} params={[getFormattedDate(selectedDate)]}/></p>
					</Col>
					<Col width={12} sm={10} md={6} xl={5} offsetMd={2} offsetXl={1} className='mt-4'>
						<Button
							label={i18nLabels.OK_CTA_TEXT}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							action={this.props.closeModalAction}
							hasNoMargin
							className='mt-2 adc-datepicker-width'
						/>
					</Col>
				</Row>
			</elseif>
			<elseif condition={deliveryDateUpdationError}>
				<Row>
					<Col md={2} xl={1} className={'text-center mt-4'}>
						<Icon image={'large-danger-orange'} size={Icon.SIZE.LARGER}/>
					</Col>
					<Col md={10} xl={11} className={'text-left mt-4 pl-4 pt-md-3'}>
						<p><I18n text={i18nLabels.DELIVERY_DATE_UPDATE_FAILURE}/></p>
					</Col>
					<Col width={12} sm={10} md={6} xl={5} offsetMd={2} offsetXl={1} className='mt-4'>
						<Button
							label={i18nLabels.OK_CTA_TEXT}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							action={this.props.closeModalAction}
							hasNoMargin
							className='mt-2 adc-datepicker-width'
						/>
					</Col>
				</Row>
			</elseif>
		</div>;
	}
});