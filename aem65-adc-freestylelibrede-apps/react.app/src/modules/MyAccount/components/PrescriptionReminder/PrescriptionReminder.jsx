import React, { Component } from "react";
import { connect } from "react-redux";
import Button, {
  BUTTON_OPTIONS,
} from "../../../Generic/components/Button/Button";
import { checkForPrescriptionDisplayCondition, dateBeforeRequesteddays, checkOrderActiveStatus, checkGhostOrderStatus} from "../../../../utils/prescriptionReminderUtils";
import I18n from "../../../Translation/components/I18n";
import PropTypes from "prop-types";
import { Card, CardContent } from "../../../Generic/components/Card/Card";
import { i18nLabels } from "../../../../utils/translationUtils";
import { checkOrdersHasProduct } from "../../../../utils/orderUtils";
import { PRODUCT_SKUS, PRESCRIPTION_REMINDER_DATE_TYPE } from "../../../../utils/enums";
import PrescriptionNotice from "../../../RXWizard/components/WizardInsuranceDisplay/PrescriptionNotice";
import {formateDateWithDotSeprator} from "../../../../utils/dateUtils";

const mapStateToProps = (state) => {
  const { orders } = state.myAccountModuleReducer.GetOrdersReducer;
  const { ghostOrders } = state.myAccountModuleReducer.GetGhostOrdersReducer;
  const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
  return {
    orders,
    ghostOrders,
    customer
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class PrescriptionReminder extends Component {
    static propTypes = {
      orders: PropTypes.object,
      ghostOrders: PropTypes.object,
      heading: PropTypes.string,
      cta: PropTypes.object,
      rendition: PropTypes.string,
      customer: PropTypes.object,
      reminderWindowStartDays: PropTypes.number,
      reminderWindowStopDays: PropTypes.number,
      reminderWindowBannerStartDays: PropTypes.number,
      reminderWindowBannerStopDays: PropTypes.number
    };

    render() {
      const { heading, cta, orders, ghostOrders, rendition, customer, reminderWindowStartDays ,reminderWindowStopDays,reminderWindowBannerStartDays ,reminderWindowBannerStopDays } = this.props;

      const sensorProduktSKUSet = new Set([PRODUCT_SKUS.FSL_3_SENSOR]);
      const hasRXOrder = checkOrdersHasProduct(
        orders.RX.orderList,
        sensorProduktSKUSet,
        true
      );

      return (
        <>
          {rendition === "account-overview" ? (
          <>
            <if condition={hasRXOrder}>
                {orders.RX.orderList.map((RxOrder) => (
                  <if
                  key={`Rx_Order_no_${RxOrder.orderId}`}
                  condition={
                    RxOrder["serviceData"]?.length !== 0 &&
                      checkForPrescriptionDisplayCondition(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate, reminderWindowStartDays, reminderWindowStopDays, false) &&
                      ghostOrders.some(checkGhostOrderStatus) && customer.rx_free !== null && !customer.rx_free
                    }
                    >
                    <Card title={heading}>
                      <CardContent>
                        <div className="row d-flex align-items-center">
                          <div className="col-12">
                            <h6 className="mb-3">
                              <I18n
                                text={i18nLabels.PRESCRIPTION_REMINDER_MSG}
                                params={[
                                  formateDateWithDotSeprator(
                                    new Date(RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate)
                                  ),
                                  dateBeforeRequesteddays(
                                    RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate,
                                    reminderWindowBannerStartDays, PRESCRIPTION_REMINDER_DATE_TYPE.DOT
                                  ),
                                  dateBeforeRequesteddays(
                                    RxOrder["serviceData"]?.find(checkOrderActiveStatus)?.serviceToDate,
                                    reminderWindowBannerStopDays, PRESCRIPTION_REMINDER_DATE_TYPE.DOT
                                  ),
                                ]}
                              />
                            </h6>
                            <Button
                              type={BUTTON_OPTIONS.TYPE.BUTTON}
                              ctaStyle="secondary"
                              label={cta.text}
                              href={cta.link}
                              full-width
                              className={"mb-4 mt-2 px-5"}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </if>
                ))}
            </if>
            <if condition={ghostOrders?.some(checkGhostOrderStatus) && customer.rx_free !== null && customer.rx_free}>
              <Card title={i18nLabels.PRESCRIPTION_RX_FREE_HEADING}>
                <CardContent>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h6 className="mb-3">
                        <I18n
                          text={i18nLabels.RX_FREE_ORDER_PRESCRIPTION_ALERT}
                        />
                      </h6>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </if>
          </>
          ) : ( <PrescriptionNotice heading={heading} reminderWindowStartDays={reminderWindowStartDays} reminderWindowStopDays={reminderWindowStopDays} reminderWindowBannerStartDays={reminderWindowBannerStartDays} reminderWindowBannerStopDays={reminderWindowBannerStopDays}/> ) 
          }
        </>
      );
    }
  }
);
