import React, { Component } from 'react';
import { connect } from 'react-redux';
import { returnActionRequest , setRadioRefundReshipRequest} from "../../redux/actions/refund_reship_widget.action";
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import { i18nLabels } from '../../../../utils/translationUtils';
import { formateDateWithDotSeprator } from '../../../../utils/dateUtils';
import LoadingIndicator, { LOADING_INDICATOR_OPTIONS } from '../../../Generic/components/Loading/LoadingIndicator';
import RadioButtonGenric from '../../../Form/components/GenericFields/RadioButtonGenric';
import { CARRIER_RETURNED, REFUND_WIDGET_MIN_DATE, RETURN_TYPE } from '../../../../utils/enums';

const mapStateToProps = (state) => {
    const { orders } = state.myAccountModuleReducer.GetOrdersReducer;
    let ordersList = orders?.RX?.orderList; // filter Reimbursement orders
    const { isfetching, returnStatusUpdated, errorMessageCode, selectedOption } = state.myAccountModuleReducer.RefundReshipWegetReducer;
    return { isfetching, returnStatusUpdated, errorMessageCode, ordersList, selectedOption }
}

const mapDispatchToProps = { returnActionRequest,setRadioRefundReshipRequest};
export default connect(mapStateToProps, mapDispatchToProps)(class RefundReshipWidget extends Component {

    static propTypes = {
        returnActionRequest: PropTypes.func,
        title: PropTypes.string,
        heading: PropTypes.string,
        radioButtons: PropTypes.object,
        ctaText: PropTypes.string,
        ctaType: PropTypes.string,
        successTitle: PropTypes.string,
        successMessage: PropTypes.string,
        ordersList: PropTypes.object,
        setRadioRefundReshipRequest: PropTypes.func,
        selectedOption: PropTypes.string
    }


    state = {
        showSuccessMessage: false,
        validationError: ""
    }

    getOldestReturnDetails = () => {
        let ordersList = this.props.ordersList;
        let deliveryDetails = [];
        if (ordersList && ordersList.length > 0) {
            for (const order of ordersList) {
                const deliveryDetailsArr = order?.deliveryDetails?.filter(delivery => delivery?.returnDetails && delivery?.returnDetails?.length > 0); // filter returnDetails data  
                deliveryDetailsArr?.map(status => deliveryDetails?.push(status));
            }
        }

        let returnDetails = [];
        if (deliveryDetails && deliveryDetails.length > 0) {
            for (const delivery of deliveryDetails) {
                const returnDetailsArr = delivery.returnDetails
                    .filter(
                        returnItem => returnItem?.returnType?.toLowerCase() === RETURN_TYPE.CARRIER_RETURN
                            && returnItem?.csStatus?.toLowerCase() === CARRIER_RETURNED
                            && returnItem?.returnRequestDate > REFUND_WIDGET_MIN_DATE
                    );;
                returnDetailsArr?.map(element => {
                    let dateValue = new Date(element?.returnRequestDate);
                    element.returnDate = formateDateWithDotSeprator(dateValue);
                    element.orderId = delivery?.deliveryOrderId;
                    returnDetails?.push(element);
                });
            }
        }

        let oldestReturn = [];
        if (returnDetails && returnDetails.length > 0) {
            returnDetails = returnDetails.sort((a, b) => a.returnRequestDate - b.returnRequestDate);
            oldestReturn = returnDetails[0];
        }
        return oldestReturn;
    }

    setSelectedValue = (e) => {
        this.props.setRadioRefundReshipRequest(e.target.value)
    }
    componentDidUpdate = (prevProps) => {
        const { errorMessageCode, returnStatusUpdated } = this.props;
        if (prevProps.errorMessageCode !== errorMessageCode) {
            this.setState({ showSuccessMessage: errorMessageCode ? false : true });
        }
        if (prevProps.returnStatusUpdated !== returnStatusUpdated && returnStatusUpdated) {
            this.setState({ showSuccessMessage: true });
        }
    }
    handleWidgetRequest = () => {
        const { selectedOption } = this.props;
        this.setState({ validationError: "" })
        const oldestReturn = this.getOldestReturnDetails();
        if (selectedOption) {
            const payload = {
                "returnId": oldestReturn?.returnId,
                "action": selectedOption
            }
            this.props.returnActionRequest(payload);
        } else {
            this.setState({ validationError: 'validation' });
        }
    }


    render() {
        const { isfetching, errorMessageCode, selectedOption, title, heading, radioButtons, ctaText, ctaType, successTitle, successMessage } = this.props;
        const { showSuccessMessage, validationError } = this.state;
        const oldestReturn = this.getOldestReturnDetails();
        return (
            <div >
                <if condition={oldestReturn && oldestReturn?.orderId && oldestReturn?.returnDate}>
                    <if condition={!showSuccessMessage}>
                        <div className="adc-card adc-refund-reship-widget adc-refund-reship-widget-main-conatainer adc-card__card-spacing px-4 px-md-5 rounded ">
                            <h4 class=" adc-title adc-refund-reship-widget-heading-style  adc-title--border-bottom border-red">
                                <span>
                                    <i className="adc-refund-reship-widget-header-logo"></i> {title}
                                </span></h4>
                            <div className='paragraph-discription'><I18n text={i18nLabels.RESHIP_REFUND_BANNER_DISCRIPTION} params={[oldestReturn?.orderId, oldestReturn?.returnDate]} /></div>
                            <p className='heading-radio'>{heading}</p>

                            <div onChange={this.setSelectedValue}>
                                {radioButtons?.map((item) => {
                                    return <div key={item.key}>
                                        <RadioButtonGenric
                                            key={item.key}
                                            classInput={"radio-input"}
                                            classLabel={"radio-button-label"}
                                            classSpan={"custom-radio"}
                                            id={item.key}
                                            value={item.key}
                                            onChange={this.setSelectedValue}
                                            checked={selectedOption === item.key || radioButtons.length === 1 ? 'checked' : ''}
                                            text={item.label}
                                            isDisabled={isfetching}
                                        />
                                    </div>
                                })}
                            </div>
                            <br></br>
                            <div className="button-loader">
                                <button disabled={isfetching} onClick={this.handleWidgetRequest} class={"adc-button text-center m-0 adc-button-" + ctaType}>
                                    {ctaText}
                                </button>
                                {isfetching && <div className="loader-pos"> <LoadingIndicator size={LOADING_INDICATOR_OPTIONS.SIZE.SMALL} /></div>}
                            </div>
                            <br></br>
                            <if condition={errorMessageCode || validationError}>
                                <label className='error-label-reship-refund'>{validationError ? <I18n text={i18nLabels.RESHIP_REFUND_WIDGET_ERROR + validationError} /> : <I18n text={i18nLabels.RESHIP_REFUND_WIDGET_ERROR + errorMessageCode} />}</label>
                            </if>
                            <br></br>
                        </div>
                    </if>
                    <else>
                        <div className="adc-card adc-refund-reship-widget adc-refund-reship-widget-success-conatainer adc-card__card-spacing px-4 px-md-5 rounded ">
                            <h4 class=" adc-title success-heading adc-title--border-bottom border-green">
                                <span>
                                    {successTitle}
                                </span></h4>
                            <p className='success-body'>{successMessage}</p>
                            <br></br>
                        </div>
                    </else>
                </if>

            </div>
        );
    }
});
