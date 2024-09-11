import React, { useState, useRef, useEffect } from "react";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

import { Modal } from "@abbott/add-platform";
import {labProfilesService} from "../services/LabProfilesService";
import { useSharedLabProfiles } from "../shared/LabProfiles";

export function Card(props) {
  const { t, i18n } = useTranslation();
  const {
    labName,
    labAddress,
    billingStreet,
    billingCountry,
    billingState,
    billingCity,
    labProfileId,
    primary,
    ...rest
  } = props.labProfile;
  
  const { removeLabProfile, changePrimaryLabProfile} = labProfilesService();

  const removeButtonRef = useRef(null);
  const primaryBUttonRef = useRef(null);

  const isPrimary = () => {
    return primary == "true";
  }
  const showModalRemove = () => {
    document.querySelector('#remove-lab-profile-modal_'+labProfileId).classList.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
    document.querySelector("body").style.overflow = "hidden";
  };
  const showModalPrimary = () => {
    document.querySelector('#set-lab-profile-modal_'+ labProfileId).classList.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
   document.querySelector("body").style.overflow = "hidden";
    };

    const closeModal = (e) => {
      document.querySelector('.show-modal').classList.remove("show-modal")
      document.querySelector("body").style.overflow = "auto";
      document.querySelector('.a-container').style.zIndex="0";
    }
   const changePrimaryLabEvent = (e,labProfileId)=>{
    changePrimaryLabProfile(labProfileId)
    closeModal(e)
   }

   const removeLabProfileEvent = (e,labProfileId) => {
    removeLabProfile(labProfileId)
    closeModal(e)
   }
   const {saveSelectedLabProfile} = labProfilesService();
   const {selectedLabProfile} = useSharedLabProfiles();

   const changeLabProfileEvent = (e, labProfileId)=> {
    saveSelectedLabProfile(labProfileId);
    return selectedLabProfile.labProfileId == labProfileId;

  }

  return (
    <>
      <Modal id={`remove-lab-profile-modal_${labProfileId}`}>
        <h4>
            {t('lp-remove-message')}
        </h4>

        <div className="button profile-button link a-button a-button--primary">
          <a className="btn " target="_blank" 
          onClick={(e) => removeLabProfileEvent(e,labProfileId)}>
            <span>{t('lp-remove-yes')}</span>
          </a>
        </div>
        <div className="button profile-button link a-button  a-button--secondary">
          <a  onClick={(e) => closeModal(e)} className="btn " target="_blank">
            <span>{t('cancel')}</span>
          </a>
        </div>
      </Modal>
      <button
        ref={removeButtonRef}
        className={`d-none js-remove-lab-profile-modal`}
        data-toggle="modal"
        data-target={`#remove-lab-profile-modal`}
      >
        {" "}
      </button>

   <Modal id={`set-lab-profile-modal_${labProfileId}`}>
        <h4>{t('set-as-primary')}</h4>
        <p>
            {t('lp-primary-message')}
        </p>

        <div className="button profile-button link a-button a-button--primary">
          <a className={`btn ${labProfileId}`} target="_blank" 
          onClick={(e) => changePrimaryLabEvent(e,labProfileId)}>
            <span>{t('set-as-primary')}</span>
          </a>
        </div>
        <div className="button profile-button link a-button a-button--primary">
          <a onClick={(e) => closeModal(e)} className="btn " target="_blank">
            <span>{t('cancel')}</span>
          </a>
        </div>
      </Modal>
      <button
        ref={primaryBUttonRef}
        className={`d-none js-set-lab-profile-modal`}
        data-toggle="modal"
        data-target={`#set-lab-profile-modal`}
      >
        {" "}
      </button>
      <div className="m-card card-body-background lab-profile-cards instrument-card-item">
        <div>
          
        </div>
        <div className="profile-card-title">
          <h6>{labName}</h6>
        </div>
        <div className="location">
          <p>
            <b>{t('location')}:</b> {labAddress}
          </p>
        </div>
        <div className="customerID">
          <p>
            <b>{t('customer-id')}:</b>
            {labProfileId}
          </p>
        </div>
        <div id ={`primary_${labProfileId}`} className="bottom-links">
          <div className="instrument-card-prodlink">
            {/* This will need to be populated with the unique product page link */}
            <a  onClick={(e)=> changeLabProfileEvent(e,labProfileId)}
            href="dashboard">
              <u>{t('dashboard')}</u>
            </a>
            <span className="dot"></span>
          </div>
          <div className="primary-lab">
            { !isPrimary() &&
              (<a onClick={(e)=>showModalPrimary(e)} className={"icon-bookmark"}>
              <u>{t('set-as-primary')}</u>
              </a>)}
            { isPrimary() &&
              (<span className={"icon-bookmark primary"}>
              <u>{t('primary-lab')}</u>
              </span>)}
            
          </div>
          
            { !isPrimary() &&
              (<div className="remove">
                  <a onClick={(e) => showModalRemove(e)}>
                    <u>{t('remove')}</u>
                  </a>
                </div>)}
          
        </div>
      </div>
    </>
  );
}


Card.propTypes = {
  labProfile : PropTypes.object
};

export default Card;
