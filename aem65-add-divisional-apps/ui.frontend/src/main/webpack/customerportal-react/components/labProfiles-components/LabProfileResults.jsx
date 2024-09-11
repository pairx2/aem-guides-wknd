import React, { useState, useRef } from 'react'
import {useTranslation} from "react-i18next";
import {Modal, Checkbox, XFDisplay, LoadingIndicator} from "@abbott/add-platform";
import {Card} from "./Card"
import { searchService } from "../services/SearchService";
import { instrumentService } from "../services/InstrumentService"
import { useSharedLabProfiles} from "../shared/LabProfiles"
import {labProfilesService} from "../services/LabProfilesService"

export const LabProfileResults = (props) => {
  const { t, i18n } = useTranslation();
  const [addCustomerNum, setAddCustomerNum] = useState(null, []);
  const [addSerialNum, setAddSerialNum] = useState(null, []);
  const [addIsPrimary, setAddIsPrimary] = useState("false", []);
  const [isPending, setIsPending] = useState(false);
  
  const {labProfiles,
    selectedLabProfile,
    setSharedSelectedLabProfile,
    setSharedLabProfiles,
    labProfileError,
    setLabProfileError,
    labProfileErrorMsg,
    setLabProfileErrorMsg} = useSharedLabProfiles();
  
  React.useEffect( () => {
    if (isPending) {
      closeModal();
      showFailureModal();
      setIsPending(false);
    }
  }, [labProfileError]);
  
  React.useEffect( () => {
    if (isPending) {
      closeModal();
      showSuccessModal();
      setIsPending(false);
    }
  }, [labProfiles]);
  
  const {addLabProfile, staleLabProfiles} = labProfilesService();

  const timerModalButtonRef = useRef(null);
  
  const showModal = () => {
    setLabProfileError(false);
    document.querySelector('#lab-profile-modal').classList.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
    document.querySelector("body").style.overflow = "hidden";
  };
  
  const closeModal = (e) => {
    document.querySelector('.show-modal').classList.remove("show-modal")
    document.querySelector('.a-container').style.zIndex="0";
    document.querySelector("body").style.overflow = "auto";

  }
  
  const setAddCustomerPrimary = (checked) => {
    setAddIsPrimary(checked ? "true" : "false");
  }

  const showSuccessModal = (e) => {
    document.querySelector('#success-lab-profile-modal').classList.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
    document.querySelector("body").style.overflow = "hidden";
  };
  const showFailureModal = () => {
    document.querySelector('#failure-lab-profile-modal').classList.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
    document.querySelector("body").style.overflow = "hidden";
  };
  
  const addProfileHandler = (e) => {
    setIsPending(true);
    addLabProfile(addCustomerNum,addSerialNum, addIsPrimary);
  }
 
  return (
    <>
      <Modal id="success-lab-profile-modal">
        <h4>{t('lp-success-title')}</h4>
        <p>
          {t('lp-success-message')}
        </p>
        <div className="button profile-button link a-button a-button--primary">
          <a onClick={(e) => closeModal(e)} className="btn " target="_blank">
            <span>{t('lp-success-cta')}</span>
          </a>
        </div>
      </Modal>
      <Modal id="failure-lab-profile-modal">
        <h4>{t('lab-profiles-failed-to-add')}</h4>
        {(labProfileError && !labProfileErrorMsg) &&
          (<XFDisplay
            xfid={'apiError_labProfile_failure'}/>)}
        {(labProfileError && labProfileErrorMsg && labProfileErrorMsg !=="ES-0012") &&
          (<>
            <strong>{t('lab-profile-error-generic')}</strong>
            <p>{labProfileErrorMsg}</p>
          </>)}
          {(labProfileError && labProfileErrorMsg == "ES-0012") &&
          (<>
            <strong>{t('lab-profile-error-generic') }</strong>
            <p>{t('no-records-found')}</p>
          </>)}
        <div className="button profile-button link a-button a-button--primary">
          <a onClick={(e) => closeModal(e)} className="btn " target="_blank">
            <span>{t('lp-success-cta')}</span>
          </a>
        </div>
      </Modal>

      <Modal id="lab-profile-modal">
        {isPending && (
          <div className="lab-profile-modal__loading-mask">
            <LoadingIndicator/>
          </div>
        )}
        <h4>{t('lp-add-title')}</h4>
        <p>{t('lp-add-message')}</p>
        <div className="fields text">
          <div className="a-input-field mt-0" data-required="true">
            <div className="form-group a-form-grp" data-component="input-field">
              <label className="form-label a-input-label">{t('customer-number')}</label>
              <div className="input-group a-input-grp">
                <input
                  className="form-control a-input-control"
                  placeholder={t('enter-customer-num-here')}
                  type="text"
                  onChange={(e) => setAddCustomerNum(e.target.value)}
                />
              </div>
              <span className="form-text a-input-field--text-error">
              <em className="abt-icon abt-icon-exclamation"></em>
            </span>
            </div>
          </div>
        </div>
        <div className="fields text">
          <div className="a-input-field mt-0">
            <div className="form-group a-form-grp">
              <label className="form-label a-input-label">{t('instrument-serial-number')}</label>
              <div className="input-group a-input-grp">
                <input
                  className="form-control a-input-control"
                  placeholder={t('enter-serial-number-here')}
                  type="text"
                  onChange={(e) => setAddSerialNum(e.target.value)}
                />
              </div>
              <span className="form-text a-input-field--text-error">
              <em className="abt-icon abt-icon-exclamation"></em>
            </span>
            </div>
          </div>
        </div>
        <Checkbox text={t('set-as-primary-lab-location')} onChange={(e) => setAddCustomerPrimary(e)} />
        <div className="button profile-button link a-button a-button--primary">
          <a className="btn" target="_blank"
             onClick={addProfileHandler} >
            <span>+ {t('add-lab')}</span>
          </a>
        </div>
        <div className="button profile-button link a-button a-button--secondary">
          <a onClick={(e) => closeModal(e)} className="btn " target="_blank">
            <span>{t('cancel')}</span>
          </a>
        </div>
      </Modal>
      <button
        ref={timerModalButtonRef}
        className={`d-none js-lab-profile-modal`}
        data-toggle="modal"
        data-target={`#lab-profile-modal`}
      >
        {" "}
      </button>
      <div className="header_lab-profile">
        <div className='lab-profile-title'>
          <h4>
            {t('lab-profiles')}
          </h4>
        </div>
        <div className="button profile-button link a-button a-button--primary">
          <a onClick={(e)=>showModal(e)} className="btn" target="_blank">
            <span >+ {t('add-lab-profile')}</span>
          </a>
        </div>
      </div>
    
      <div className='labprofile-results-container'>
      
        {labProfiles?.labProfiles?.map((item, index) =>
          <Card key={`lab-profile-card-${index}`} labProfile={item} /> // TODO : Get CUSTOMER ID from service
        )}
      </div>
    </>
    );
};