import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from './IconButton';
import { InputField, Modal, Button } from '@abbott/add-platform';
import { pinService } from '../services/PinService';
import { nicknameService } from '../services/nicknameService';
import { useTranslation } from 'react-i18next';
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags';

// This is an instrument card that displays on the My Instruments page.

export function InstrumentCard(props) {

  const { pinned, labName, labId, todsProductCode, productName, productFilterName, serialNumber, thumbnails, nickname, pinClass, custId, instId, cardId, systemId, canViewTix, canSubmitTix, billingCountry, informatics, businessSegment, ...rest } = props;
  const { t, i18n } = useTranslation();

  const { pinSwitch } = pinService()
  const [pin, setPin] = useState(pinClass)

  const { changeNickname } = nicknameService()
  const [editingNN, setEditingNN] = useState(false)
  const [newNickname, setNewNickname] = useState(nickname)

  const { nicknameError, setNicknameError, pinError, setPinError } = useSharedInstrumentFlags()
  const [isNicknameInvalid, setIsNicknameInvalid] = useState(false)


  const validateNickname = (nn) => {
    if (nn == '') {
      return true
    } else {
      const validNickname = new RegExp(
        '[^!@#$%&*^/\]$'
      )
      if (validNickname.test(nn)) {
        setIsNicknameInvalid(false)
      } else {
        setIsNicknameInvalid(true)
      }
      return validNickname.test(nn)
    }
  }

  const nicknameChange = (e) => {
    e.preventDefault()
    validateNickname(e.target.value)
    if (e.target.value != '') {
      setNewNickname(e.target.value)
    }

  }

  const onPinClick = e => {
    e.preventDefault()
    window.showLoading()
    pin == 'pinned' ? setPin('unpinned') : setPin('pinned')
    pinSwitch(labId, serialNumber)
  }

  const fireNicknameEvent = (nnEdit) => {
    const event = new CustomEvent('nicknameEdited',
      { detail: nnEdit })
    document.dispatchEvent(event)
  }

  // This function calls the changeNickname service with the newly-entered nickname
  const stopEditing = (e) => {
    e.preventDefault()
    let valid = validateNickname(newNickname)
    if (valid) {
      window.showLoading()
      setEditingNN(false)
      changeNickname(instId, serialNumber, newNickname, systemId, labId)
      fireNicknameEvent(
        {
          newNickname
        }
      )
    }
  }

  const startEditing = () => {
    setIsNicknameInvalid(false)
    setEditingNN(true)
  }

  const showDefaultImage = (error) => {
    error.target.onError = null
    error.target.src = '/etc.clientlibs/add/customerportal/clientlibs/clientlib-customerportal/resources/images/Image-Not-Available-small.png'
    error.target.alt = t('image-not-available')
  }

  const showNicknameErrorModal = () => {
    document.getElementById('nickname-error-modal').classList.add(`show-modal`)
    document.querySelector('.a-container').style.zIndex = "auto";
    document.querySelector("body").style.overflow = "auto";
  }

  const showPinErrorModal = () => {
    document.getElementById('pin-error-modal').classList.add(`show-modal`)
    document.querySelector('.a-container').style.zIndex = "auto";
    document.querySelector("body").style.overflow = "auto";
  }

  const closeNicknameErrorModal = () => {
    document.getElementById('nickname-error-modal').classList.remove("show-modal")
    setNicknameError(false)
  }

  const closePinErrorModal = () => {
    document.getElementById('pin-error-modal').classList.remove("show-modal")
    setPinError(false)
    pin == 'pinned' ? setPin('unpinned') : setPin('pinned')
  }

  useEffect(() => {
    if (nicknameError) {
      showNicknameErrorModal()
    }
  }, [nicknameError]);

  useEffect(() => {
    if (pinError) {
      showPinErrorModal()
    }
  }, [pinError]);

  return (
    <div className='m-card card-body-background instrument-card instrument-card-item'>
      <Modal onModalDismissCallback={closeNicknameErrorModal} id={'nickname-error-modal'}>
        <h4>{t(`generic-service-error`)}</h4>
        <p>{t('nickname-error-message')}</p>
        <Button
          onClick={closeNicknameErrorModal}
          buttonClasses='instrument-details-card-primary-button'
          buttonSize='md'
          text={t('modal-close')}
        />
      </Modal>
      <Modal onModalDismissCallback={closePinErrorModal} id={'pin-error-modal'}>
        <h4>{t(`generic-service-error`)}</h4>
        <p>{t('pin-error-message')}</p>
        <Button
          onClick={closePinErrorModal}
          buttonClasses='instrument-details-card-primary-button'
          buttonSize='md'
          text={t('modal-close')}
        />
      </Modal>
      <div>
        <div className='instrument-card-pinspace'>
          <IconButton className='instrument-card-pin' buttonClasses={`instrument-card-${pin}`} onClick={onPinClick} />
        </div>
        <div>
          <img className='instrument-card-image' alt={productName} src={`/content/dam/add/customerportal/products/${todsProductCode}_small.png`} onError={showDefaultImage}></img>
        </div>
        <div className='instrument-card-nickname'>
          {editingNN ?
            <div className='instrument-card-nickname-editing'>
              <div id='nickname-input-field'>
                <InputField name='instNickname' maxLength={20} onInput={nicknameChange} placeholder={t('rename-instrument')} className='instrument-nickname-input' />
                <IconButton className='instrument-card-nickname-button a-button button' buttonClasses={`instrument-card-save`} onClick={stopEditing} />
              </div>
              <p id='instrument-nickname-error-message'>{isNicknameInvalid ? t('nickname-editing-error-message') : ''}</p>
            </div>
            : <div className='instrument-card-nickname-static'><p className='instrument-nickname-text'><b>{newNickname}</b></p><IconButton className='instrument-card-pin a-button button instrument-nickname-button' buttonClasses={`instrument-card-edit`} onClick={startEditing} /></div>}
        </div>
        <div className='instrument-card-prodtype'>
          <p><b>{productFilterName}</b></p>
        </div>
        <div className='instrument-card-serialnumber'>
          <p >{serialNumber}</p>
        </div>
        <div className='instrument-card-prodlink'>
          <a href={`instrument-details.html?nn=${encodeURIComponent(newNickname)}&navSource=viewDetails&vd=${window.btoa(`sn=${serialNumber}&pn=${productName}&tpc=${todsProductCode}&lp=${labId}&ii=${instId}&ci=${custId}&ln=${labName}&si=${systemId}&cst=${canSubmitTix}&cvt=${canViewTix}&bc=${billingCountry}&in=${informatics}&bs=${businessSegment}`)}`}><b><u>{t('view-details')}</u></b></a>
        </div>
      </div>
    </div>
  );
}

InstrumentCard.defaultProps = {
  pinClass: '',
  todsProductCode: '',
  productFilterName: '',
  serialNumber: '',
  thumbnails: {},
  nickname: '',
  cardId: ''
};

InstrumentCard.propTypes = {
  todsProductCode: PropTypes.string,
  productName: PropTypes.string,
  productFilterName: PropTypes.string,
  serialNumber: PropTypes.string,
  thumbnails: PropTypes.object,
  nickname: PropTypes.string,
  pinClass: PropTypes.string,
  cardId: PropTypes.string
};

export default InstrumentCard;
