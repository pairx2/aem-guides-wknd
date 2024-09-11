import React, { useEffect, useContext } from 'react';
import { CommerceContext } from '../../../context/CommerceContext';
import createConditionalEvent from '../../../utils/conditional';

const GuestOrderSummaryController = () => {
    const [commerceContext, setCommerceContext] = useContext(CommerceContext);

    useEffect(() => {
        if (commerceContext?.guestCheckout?.orderFailure) {
            window.dispatchEvent(createConditionalEvent(true, 'isGuestOrderFailed'));
            return;
        }
        
        const guestOrderNumber = document.querySelector('#guest-order-number p');
        if (commerceContext.guestCheckout.orderData.response.increment_id) {
            window.dispatchEvent(createConditionalEvent(true, 'isGuestOrderSuccess'));
            let setOrderNumber = guestOrderNumber.innerHTML.replace('${ordernumber}', commerceContext.guestCheckout.orderData.response.increment_id);
            guestOrderNumber.innerHTML = setOrderNumber;   
        }
    },[]);
    
    return null;
}

export default GuestOrderSummaryController;