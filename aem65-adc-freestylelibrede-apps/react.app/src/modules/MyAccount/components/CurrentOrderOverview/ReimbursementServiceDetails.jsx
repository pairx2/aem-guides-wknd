import React from 'react';
import PropTypes from 'prop-types';
import { i18nLabels } from '../../../../utils/translationUtils';
import { PRODUCT_DELIVERABLE_DURATION, STATUS_CODE, SUBSCRIPTION_STATUS } from '../../../../utils/enums';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';

const ReimbursementServiceDetails = ({ serviceData, productData, ghostOrders, isPaymentDetails }) => {
    const getParams = () =>{
        if(serviceData?.[0]?.serviceDuration) 
            return [serviceData?.[0]?.serviceDuration];
        else 
            return (ghostOrders?.[0]?.status_code === STATUS_CODE[50] && productData?.[0]?.deliverableStatus === SUBSCRIPTION_STATUS.SCHEDULED) ? [productData?.[0]?.deliverableDuration] : [PRODUCT_DELIVERABLE_DURATION]
    }
    return (
        <div className={isPaymentDetails ? 'col-12 col-lg-6' : ''}>
            {isPaymentDetails &&
                <>
                    <hr className="adc-border-bottom m-0 mb-3" />
                    <h3 className="adc-order-hist__subs__desc-heading font-weight-600 m-0 pb-3"><I18n
                        text={i18nLabels.REIMBURSEMENT_LABEL} suffix={':'} /></h3>
                </>
            }
            {!isPaymentDetails &&
                <div className="d-flex align-items-center">
                    <h6 className="m-0"><I18n text={i18nLabels.REIMBURSEMENT_LABEL} suffix={':'} /></h6>
                </div>
            }
            <div className="d-flex justify-content-between align-items-center">
                <p className="m-0"><I18n text={i18nLabels.FOR_X_MONTHS} params={getParams()} /></p>

                <div className="cost-item--status">
                    <p className="m-0 d-flex align-items-center">
                        <if condition={serviceData?.[0]?.serviceStatus == SUBSCRIPTION_STATUS.ACTIVE}>
                            <I18n text={i18nLabels.REIMBURSEMENT_ACCEPTED} />
                            <Icon image={'status-green'} className={'ml-2'} />
                        </if>
                        <elseif condition={serviceData?.[0]?.serviceStatus == SUBSCRIPTION_STATUS.CANCELLED}>
                            <I18n text={i18nLabels.REIMBURSEMENT_CANCELLED} />
                            <Icon image={'status-red'} className={'ml-2'} />
                        </elseif>
                        <elseif condition={serviceData?.[0]?.serviceStatus == SUBSCRIPTION_STATUS.DEACTIVATED}>
                            <I18n text={i18nLabels.REIMBURSEMENT_DEACTIVATED_LABEL} />
                            <Icon image={'status-red'} className={'ml-2'} />
                        </elseif>
                        <elseif condition={productData?.[0]?.deliverableStatus == SUBSCRIPTION_STATUS.SCHEDULED}>
                            <I18n text={i18nLabels.REIMBURSEMENT_ACCEPTED} />
                            <Icon image={'status-green'} className={'ml-2'} />
                        </elseif>
                        <elseif condition={productData?.[0]?.deliverableStatus == SUBSCRIPTION_STATUS.ACTIVE}>
                            <I18n text={i18nLabels.REIMBURSEMENT_ACCEPTED} />
                            <Icon image={'status-green'} className={'ml-2'} />
                        </elseif>
                        <else>
                            <I18n text={i18nLabels.REIMBURSEMENT_DEACTIVATED_LABEL} />
                            <Icon image={'status-red'} className={'ml-2'} />
                        </else>
                    </p>
                </div>
            </div>
        </div>
    )
}

ReimbursementServiceDetails.propTypes = {
    serviceData: PropTypes.array,
    productData: PropTypes.array,
    ghostOrders: PropTypes.array,
    isPaymentDetails: PropTypes.bool
}

export default ReimbursementServiceDetails;