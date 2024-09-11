import React, { Component } from "react";
import I18n from "../../../Translation/components/I18n";
import PropTypes from "prop-types";
import { Card, CardContent } from "../../../Generic/components/Card/Card";
import { i18nLabels } from "../../../../utils/translationUtils";
import { connect } from "react-redux";
import {dateBeforeRequesteddays, checkOrderActiveStatus, checkGhostOrderStatus, checkForPrescriptionDisplayCondition, checkPrescriptionNoticeDisplayCondition} from "../../../../utils/prescriptionReminderUtils";
import {getOrdersRequest} from "../../../MyAccount/redux/actions/get_orders.action";
import {getGhostOrdersRequest} from "../../../MyAccount/redux/actions/get_ghost_orders.action";
import { checkOrdersHasProduct } from "../../../../utils/orderUtils";
import { PRODUCT_SKUS, PRESCRIPTION_REMINDER_DATE_TYPE } from "../../../../utils/enums";
import {formateDateWithDotSeprator} from "../../../../utils/dateUtils";

const mapStateToProps = (state) => {
  const {orders} = state.myAccountModuleReducer.GetOrdersReducer;
  const {ghostOrders} = state.myAccountModuleReducer.GetGhostOrdersReducer;
  const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
  return { orders, ghostOrders, customer };
};

const mapDispatchToProps = {
  getOrdersRequest,
  getGhostOrdersRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class PrescriptionNotice extends Component {

    static propTypes = {
      heading: PropTypes.string,
      getOrdersRequest: PropTypes.func,
      orders: PropTypes.object,
      ghostOrders: PropTypes.object,
      getGhostOrdersRequest: PropTypes.func,
      customer: PropTypes.object,
      reminderWindowStartDays: PropTypes.number,
      reminderWindowStopDays: PropTypes.number,
      reminderWindowBannerStartDays: PropTypes.number,
      reminderWindowBannerStopDays: PropTypes.number
      };

    componentDidMount() {
      this.props.getOrdersRequest({orderHistoryType: 'RX'});
      this.props.getGhostOrdersRequest();
    }

    render() {
       const { heading, orders, ghostOrders, customer, reminderWindowStartDays, reminderWindowStopDays,reminderWindowBannerStartDays, reminderWindowBannerStopDays } = this.props;
       const sensorProduktSKUSet = new Set([PRODUCT_SKUS.FSL_3_SENSOR]);
      const hasRXOrder = checkOrdersHasProduct(
        orders.RX.orderList,
        sensorProduktSKUSet,
        true
);

    return <div className="prescription-notice-rx-checkout">
        <if condition = {hasRXOrder}>
        { orders.RX?.orderList?.length !==0 && orders.RX.orderList.map((RxOrder, index) => 
        <>
          <if key={`Rx_order_no${RxOrder.orderId}`} 
            condition = { RxOrder["serviceData"]?.length !==0 && 
            checkForPrescriptionDisplayCondition(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate, reminderWindowStartDays, reminderWindowStopDays, true, RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceFromDate) &&
              ghostOrders.some(checkGhostOrderStatus) && customer.rx_free !== null && !customer.rx_free
              }
          >
            <div className="adc-prescription-notice">
              <Card title={heading} className="adc-banner-style">
                <CardContent>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h6 className="mb-3 notice-msg">
                    <I18n
                          text={i18nLabels.WEBRX_PRESCRIPTION_ALERT}
                        params={[formateDateWithDotSeprator(new Date(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate)), dateBeforeRequesteddays(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate, reminderWindowBannerStartDays, PRESCRIPTION_REMINDER_DATE_TYPE.DOT), dateBeforeRequesteddays(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate, reminderWindowBannerStopDays, PRESCRIPTION_REMINDER_DATE_TYPE.DOT)]}
                      />
                      </h6>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </if>
          <elseif condition={ghostOrders?.some(checkGhostOrderStatus) && customer.rx_free !== null && customer.rx_free && checkPrescriptionNoticeDisplayCondition(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceFromDate, RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate)}>
            <div className="adc-prescription-notice">
              <Card title={heading} className="adc-banner-style">
                <CardContent>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h6 className="mb-3 notice-msg">
                      <I18n
                        text={i18nLabels.WEBRX_PRESCRIPTION_ALERT_RX_FREE}
                      />
                      </h6>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </elseif>
        </>
        )}
      </if>
     </div>
    }
  }
);
