import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "@abbott/add-platform";
import { nicknameService } from "../services/nicknameService";
import { InputField } from "@abbott/add-platform";
import { IconButton } from "./IconButton";
import { useTranslation } from "react-i18next";
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import countryTimezone from "country-timezone";

// This component displays the details on the right side of the instrument details page

export function DetailCard(props) {
  const {
    productName,
    serialNumber,
    nickname,
    instId,
    custId,
    labProfile,
    labName,
    systemId,
    canSubmitTix,
    billingCountry,
    informatics,
    ...rest
  } = props;
  const [newNickname, setNewNickname] = useState(nickname);
  const { changeNickname } = nicknameService();
  const [editingNN, setEditingNN] = useState(false);
  const [timeZone, setTimeZone] = useState("");
  const { t, i18n } = useTranslation();
  const { nicknameError, setNicknameError, gotOpertingHours, gotOpertingLoading, gotIncidentBtnIsvisble, gotProductAvailable } =
    useSharedInstrumentFlags();
  const [isNicknameInvalid, setIsNicknameInvalid] = useState(false);

  const validateNickname = (nn) => {
    if (nn == "") {
      return true;
    } else {
      const validNickname = new RegExp("[^!@#$%&*^/]$");
      if (validNickname.test(nn)) {
        setIsNicknameInvalid(false);
      } else {
        setIsNicknameInvalid(true);
      }
      return validNickname.test(nn);
    }
  };

  const nicknameChange = (e) => {
    e.preventDefault();
    validateNickname(e.target.value);
    if (e.target.value != "") {
      setNewNickname(e.target.value);
    }
  };

  const fireNicknameEvent = (nnEdit) => {
    const event = new CustomEvent("nicknameEdited", { detail: nnEdit });
    document.dispatchEvent(event);
  };

  const stopEditing = (e) => {
    e.preventDefault();
    let valid = validateNickname(newNickname);

    if (valid) {
      setEditingNN(false);
      window.showLoading();
      changeNickname(instId, serialNumber, newNickname, systemId, labProfile);
      const url = new URL(window.location);
      url.searchParams.set("nn", window.btoa(newNickname));
      history.pushState({}, "", url);
      fireNicknameEvent({
        newNickname,
      });
    }
  };

  const startEditing = () => {
    setIsNicknameInvalid(false);
    setEditingNN(true);
  };

  const showNNErrorModal = () => {
    document
      .getElementById("detail-nickname-error-modal")
      .classList.add(`show-modal`);
    document.querySelector(".a-container").style.zIndex = "auto";
  };

  const closeNNErrorModal = () => {
    document
      .getElementById("detail-nickname-error-modal")
      .classList.remove("show-modal");
    setNicknameError(false);
  };

  useEffect(() => {
    if (nicknameError) {
      showNNErrorModal();
    }
  }, [nicknameError]);

  useEffect(() => {
    var countryCode = JSON.parse(localStorage.getItem("profile"));
    var timezonesWithCode =
      countryTimezone.getTimezonesWithCountryCode(countryCode.country);
    setTimeZone(timezonesWithCode[0])
  }, []);

  var labStrEdit = "";
  if (labName.includes("'Union (N1)")) {
    labStrEdit = labName.replace("(", "-").replace(")", "");
  } else {
    labStrEdit = labName;
  }

  

  return (
    <div>
      <Modal
        onModalDismissCallback={closeNNErrorModal}
        id={"detail-nickname-error-modal"}
      >
        <h4>{t(`generic-service-error`)}</h4>
        <p>{t(`nickname-error-message`)}</p>
        <Button
          onClick={closeNNErrorModal}
          buttonClasses="instrument-details-card-primary-button"
          buttonSize="md"
          text={t("modal-close")}
        />
      </Modal>
      <div className="instrument-details-card">
        <div className="instrument-details-card-product-name">
          <p>{props.productName}</p>
        </div>
        <div className="instrument-details-card-nickname">
          {editingNN ? (
            <div className="instrument-details-card-nickname-editing">
              <div id="instrument-details-nickname-input-field">
                <InputField
                  name="instDetailsNickname"
                  maxLength={20}
                  placeholder={t("rename-instrument")}
                  onInput={nicknameChange}
                  className="instrument-nickname-input"
                />
                <IconButton
                  className="instrument-details-card-nickname-button"
                  buttonClasses={`instrument-card-save`}
                  onClick={stopEditing}
                />
              </div>
              <p id="instrument-details-nickname-error-message">
                {isNicknameInvalid ? t("nickname-editing-error-message") : ""}
              </p>
            </div>
          ) : (
            <div className="instrument-details-card-nickname-static">
              <p>
                <b>{newNickname}</b>
              </p>
              <IconButton
                className="instrument-card-pin instrument-nickname-button"
                buttonClasses={`instrument-card-edit`}
                onClick={startEditing}
              />
            </div>
          )}
        </div>
        <div>
          <p className="instrument-details-card-serial">
            <b>
              {t("incident-header-serial-number")} {props.serialNumber}
            </b>
          </p>
        </div>
        <div className="instrument-details-button">
          <Button
            anchorLink={`technical-library.html?#opmanual_search`}
            buttonClasses="instrument-details-button instrument-details-button-section instrument-details-card-secondary-button"
            buttonSize="lg"
            buttonStyle="secondary"
            text={t("operations-manual")}
          />
        </div>
        {(() => {
          if(!gotProductAvailable) {
            return (<></>);
          } else if(gotIncidentBtnIsvisble) {
            return (
              <>
                {gotOpertingHours ? (
                  <>
                    <div className="instrument-details-button">
                      <Button
                        anchorLink={`create-ticket.html?sn=${serialNumber}&pn=${productName}&ii=${instId}&ci=${custId}&ln=${labStrEdit}&bc=${billingCountry}&in=${informatics}`}
                        buttonClasses="instrument-details-button instrument-details-button-section instrument-details-card-primary-button"
                        buttonSize="lg"
                        text={t("submit-incident-report")}
                      />
                    </div>
                    <div
                      className={`instruments-disclaimer-request ${
                        editingNN ? "editing-space" : ""
                      }`}
                    >
                      <span>
                        {t("important")} : {t("patient-safety-text")}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className='incident-comment-blod'>{t("incident-addcomment-report-message")}</p>
                  </>
                )}
              </>
            );
          } else {
            return (
              <>
              </>
            );
          }
        })()}
        {gotOpertingLoading ? (<div class="a-spinner"><div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div></div>): ""}
        
      </div>
    </div>
  );
}

DetailCard.defaultProps = {
  serialNumber: "",
  nickname: "",
  productName: "",
};

DetailCard.propTypes = {
  productName: PropTypes.string,
  serialNumber: PropTypes.string,
  nickname: PropTypes.string,
};

export default DetailCard;
