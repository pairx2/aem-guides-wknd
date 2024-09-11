import React from "react";
import { formateDateWithDotSeprator } from "../../../../utils/dateUtils";
import {ORDER_DOCUMENT_LIST} from "../../../../utils/enums";
import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from "../../../../utils/translationUtils";
import PropTypes from "prop-types";

const ShowResults = ({results, resultsToShow, getInvoice}) => {
  const getBillText = (order) =>{
    let i18nBillTypeText;
    if(order?.invoiceId?.startsWith(ORDER_DOCUMENT_LIST.INVOICE)) 
     i18nBillTypeText = <I18n text={i18nLabels.ORDER_DOCUMENT_RECHNUNG} />;
    else if (order?.invoiceId?.startsWith(ORDER_DOCUMENT_LIST.CREDIT))
      i18nBillTypeText = <I18n text={i18nLabels.ORDER_DOCUMENT_GUTSCHRIFT} />;
    else 
      i18nBillTypeText = <I18n text={i18nLabels.ORDER_DOCUMENT_DOC} />;
    return i18nBillTypeText;
  }
    if (results?.length !== 0) {
        const sliceLength = results.length < resultsToShow ? results.length : resultsToShow

        return results?.slice(0, sliceLength).map((order) => <div key={order.invoiceId} className="pdf-list">
              <div>
                <h5 className="credit-invoice-text-field">
                  {getBillText(order)} {order?.invoiceId} (<I18n text={i18nLabels.ORDER_DOCUMENT_BESTELL_NUM} />  {order.orderDeliveryId})
                </h5>
                <h6 className="date-field">{formateDateWithDotSeprator(new Date(order?.invoiceDate))}</h6>
              </div>
              <div   className="get-invoice hover-invoice"
                  onClick={() =>
                    getInvoice({
                      orderId: order.orderId,
                      invoiceId: order.invoiceId,
                    })
                  }
                  data-testid="get-invoice">
                  
                    <em class="adc-icon adc-icon--large download-pdf"></em>
                  
                  <span className="view-label"> <I18n text={i18nLabels.ORDER_DOCUMENT_VIEW_LABEL} /></span>
              </div>
            </div>
        )
      }
}

ShowResults.propTypes = {
	results: PropTypes.array,
	getInvoice:PropTypes.func,
	resultsToShow: PropTypes.number
};

export default ShowResults;