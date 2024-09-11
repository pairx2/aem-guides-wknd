import React from "react";

/**
 * @function
 * @desc Return the Cart Footer with total and Subtotal to minicart
 * @param {object} props 
 */
const Subscription = props => {
  let prodInfo = props.subscription_details.filter(product => {
      return product.option_label !== 'Regular payments' 
    } );
  return (
    <div className="minicart-subscription">
      {(prodInfo.map((detail, index) => {
        return  <div key={index}>
                  <span className="subscription">{detail.option_label}</span>
                  <span className="subscription">&nbsp;{detail.option_value}</span>
                  <br/>
                </div>
      }))}
        <div className="subscription">{props.label.subscriptionLabel}</div>
    </div>
  );
}

export default Subscription;