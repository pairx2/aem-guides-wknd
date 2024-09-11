import React from "react";
import I18n from '../../../Translation/components/I18n';
 
const ProductErrors = ({error, errorCodes, IsErrorCodeGeneric, undeterminedUomError}) => {
    return(
        <div className="order-sm-9 order-7 p-0 mt-3">
            <if condition={errorCodes && !IsErrorCodeGeneric}>
                <p className={'adc-product-details__error-message order-sm-7 order-7 p-0 mb-1'}>
                    <I18n text={'magento_error_code_' + errorCodes?.[0]}/>
                </p>
            </if>
            <else>
                <p className={'adc-product-details__error-message order-sm-7 order-7 p-0 mb-1'}>
                    {error}
                </p>
            </else>
            <if condition={undeterminedUomError}>
                <p className={'adc-product-details__error-message order-sm-7 order-7 p-0 mb-1'}>
                    <I18n text={undeterminedUomError}/>
                </p>
            </if>
        </div>
    )
}
export default ProductErrors;