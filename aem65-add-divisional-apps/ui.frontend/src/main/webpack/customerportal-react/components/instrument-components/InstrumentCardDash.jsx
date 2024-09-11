import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export function InstrumentCardDash(props) {

  const { pinned, labName, labId, todsProductCode, productName, productFilterName, serialNumber, thumbnails, nickname, pinClass, custId, instId, cardId, systemId, canViewTix, canSubmitTix, billingCountry, informatics, businessSegment, ...rest } = props;

  const { t, i18n } = useTranslation();

  const showDefaultImage = (error) => {
    error.target.onError = null
    error.target.src = '/etc.clientlibs/add/customerportal/clientlibs/clientlib-customerportal/resources/images/Image-Not-Available-small.png'
    error.target.alt = 'Image Not Available'
  }

  return (
    <div className='m-card card-body-background instrument-card instrument-dashboard instrument-card-item'>

      <div className='instrument-card-links'>
        <div className='instrument-card-nickname'>
          <h6 >{nickname || productFilterName}</h6>
        </div>
        <div className='instrument-card-prodtype'>
          <p><b>{productName}</b></p>
        </div>
        <div className='instrument-card-serialnumber'>
          <p>{t('serial-number')} {serialNumber}</p>
        </div>
        <div className='instrument-card-prodlink'>
        <a href={`instrument-details.html?nn=${encodeURIComponent(nickname)}&navSource=viewDetails&vd=${window.btoa(`sn=${serialNumber}&pn=${productName}&tpc=${todsProductCode}&lp=${labId}&ii=${instId}&ci=${custId}&ln=${labName}&si=${systemId}&cst=${canSubmitTix}&cvt=${canViewTix}&bc=${billingCountry}&in=${informatics}&bs=${businessSegment}`)}`}><b><u>{t('view-details')}</u></b></a>
        </div>
      </div>
      <div className='intrument-image-container'>
        <div>
          <img className='instrument-card-image' alt={nickname} src={`/content/dam/add/customerportal/products/${todsProductCode}_small.png`} onError={showDefaultImage}></img>
        </div>
      </div>
    </div>

  );
}

InstrumentCardDash.defaultProps = {
  pinClass: '',
  todsProductCode: '',
  productFilterName: '',
  serialNumber: '',
  thumbnails: {},
  nickname: '',
  cardId: ''
};

InstrumentCardDash.propTypes = {
  todsProductCode: PropTypes.string,
  productName: PropTypes.string,
  productFilterName: PropTypes.string,
  serialNumber: PropTypes.string,
  thumbnails: PropTypes.object,
  nickname: PropTypes.string,
  pinClass: PropTypes.string,
  cardId: PropTypes.string
};

export default InstrumentCardDash;
