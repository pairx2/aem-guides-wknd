import React from "react";

/**
 * @function
 * @desc Return the Cart Footer with total and Subtotal to minicart
 * @param {object} props 
 */
const Subscription = props => {
  let prodInfo = props.subscription_details.filter(product => {return product.option_label !== 'Regular payments' } );
  return (
    <div className="abbott-minicart-subscription">
      {(prodInfo.map(detail => {
        return  <>
                  <div className="subscription">{detail.option_label}</div>
                  <div className="subscription">&nbsp;{detail.option_value}</div>
                  <br/>
                </>
      }))}
        <div className="subscription">REPEATS UNTIL FAILED OR CANCELED</div>
    </div>
  );
}

export default Subscription;