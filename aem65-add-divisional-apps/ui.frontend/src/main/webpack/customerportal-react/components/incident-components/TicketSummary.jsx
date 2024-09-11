import React, { DOMElement, useState, useEffect } from "react";
import { LoadingIndicator, Button } from "@abbott/add-platform";
import {useTranslation} from "react-i18next";

export const TicketSummary = (props) => {
 
  const { t, i18n } = useTranslation();
  const windowUrl = window.location.search;
  const urlParams = new URLSearchParams(windowUrl);
  // this query string param decodes twice, once to unescape base64 string, once to unescape non-latin characters
  const data = JSON.parse(decodeBase64(decodeURIComponent(urlParams.get("d"))));

  return (
    <>
      <p>
      {t('your-incident-number')}<b> {data.incidentNumber}</b>. {t('copy-of-confirmation')}
      </p>
      <div className="ticket-summary-container">
        <div className="ticket-summary-rows">
          <p>
            <b>{t('date-opened-lower')}:</b>
          </p>
          <p>{data.dateOpened}</p>
        </div>
        <div className="ticket-summary-rows">
          <p>
            <b>{t('facility-lab-name')}:</b>
          </p>
          <p>{data.facility}</p>
        </div>
        <div className="ticket-summary-rows">
          <p>
            <b>{t('subject-short-description')}:</b>
          </p>
          <p>{data.subject}</p>
        </div>
        <div className="ticket-summary-rows">
          <p>
            <b>{t("detailed-description")}:</b>
          </p>
          <p>{data.detailedDescription}</p>
        </div>
        <div className="ticket-summary-rows">
          <p>
            <b>{t('impact')}:</b>
          </p>
          <p>{data.impact}</p>
        </div>
        <div className="ticket-summary-rows">
          <p>
            <b>{t('incident-contact')}:</b>
          </p>
          <p>{data.contactName || data.createdContactName}</p>
        </div>
      </div>
      <Button
        anchorLink={`instruments.html`}
        buttonSize="md"
        text={t("return-to-instruments")}
      />
    </>
  );
};
