import React, { DOMElement, useState } from 'react'
import { DetailCard } from "./DetailCard";
import { useTranslation } from 'react-i18next';

// This component displays the large instrument image on the left and the instrument detalis on the right.

export const InstrumentDetailsHero = (props) => {
    const { nickname, labName, labProfile, productName, todsProductCode, serialNumber, instId, custId, systemId, canSubmitTix, billingCountry, informatics, ...rest } = props
    const { t, i18n } = useTranslation();
    
    const showDefaultImage = (error) => {
        error.target.onError = null
        error.target.src = '/etc.clientlibs/add/customerportal/clientlibs/clientlib-customerportal/resources/images/Image-Not-Available-large.png'
        error.target.alt = t('image-not-available')
    }

    return (
        <div className='instrument-details-section'>
            <div className='instrument-info-image'>
                <img alt={productName} src={`/content/dam/add/customerportal/products/${todsProductCode}_large.png`} onError={showDefaultImage}></img>
            </div>
            <div className='instrument-info-text'>
                <DetailCard nickname={nickname} productName={productName} serialNumber={serialNumber} instId={instId} custId={custId} labName={labName} labProfile={labProfile} systemId={systemId} canSubmitTix={canSubmitTix} billingCountry={billingCountry} informatics={informatics} />
            </div>
        </div>
    )
}