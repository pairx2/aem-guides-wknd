import React, { DOMElement, useState, useEffect } from "react";
import { Modal, Checkbox } from "@abbott/add-platform";
import axios from "axios";
import { object } from "prop-types";
import {useTranslation} from "react-i18next";

export const NotificationSettings = (props) => {
  const { t, i18n } = useTranslation();
  const subcriptionsLabels = [
    {
      label: t('product-updates'),
      preferenceName: "product-updates",
    },
    {
      label: t('sciencebook-updates'),
      preferenceName: "sciencebook-updates",
    },
    {
      label: t('event-notifications'),
      preferenceName: "event-notifications",
    },
    {
      label: t('list-number-changes'),
      preferenceName: "list-number-changes",
    },
    {
      label: t('webcasts'),
      preferenceName: "webcasts",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    window.showLoading();

    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.USER_SUBSCRIPTIONS;
    const headers = getPageDataAttributes();

    headers["Content-Type"] = "application/json";

    const token = window.getCookie("jwtToken");
    headers["x-id-token"] = token;

    const config = {
      url: url,
      headers: headers,
    };

    const checkedValues = Array.from(e.target.subscriptions).map((el) => [
      el.id,
      el.checked,
    ]);
    const object2 = Object.fromEntries(checkedValues);

    const data = {
      channelType: "UI",
      preferences: [
        {
          preferenceName: "product-updates",
          preferenceValue: object2["product-updates"],
        },
        {
          preferenceName: "sciencebook-updates",
          preferenceValue: object2["sciencebook-updates"],
        },
        {
          preferenceName: "event-notifications",
          preferenceValue: object2["event-notifications"],
        },
        {
          preferenceName: "list-number-changes",
          preferenceValue: object2["list-number-changes"],
        },
        {
          preferenceName: "webcasts",
          preferenceValue: object2["webcasts"],
        },
      ],
    };

    axios
      .post(url, data, config)
      .then(function (response) {
        filteringFalseStorage(object2);
      })
      .catch(function (error) {
        console.error(`error from within data axios: ${error}`);
      });
  };

  const filteringFalseStorage = (object2) => {
    Object.keys(object2).forEach(function (key) {
      if (object2[key] === false) {
        delete object2[key];
      }
    });
        let propertyNames = Object.keys(object2);
        let updatedPrefrences = Object.values(propertyNames);
        localStorage?.setItem(
          "notifications",
          JSON.stringify(updatedPrefrences)
        );
        window.location.href="notifications-preferences-success.html"
  };

  const defaultCheck = (notificationName) => {
    const local = localStorage.getItem("notifications") || [];
    return local.includes(notificationName) ? true : false;
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="subscriptions-notifications-list">
          {subcriptionsLabels.map((item) => (
            <Checkbox
              id={item.preferenceName}
              text={item.label}
              name={"subscriptions"}
              checked={defaultCheck(item.preferenceName)}
            />
          ))}
        </div>
        <div className="button subscription-button  link a-button a-button--primary">
          <a  className="btn" target="_blank">
            <button type="submit">{t('save-changes')}</button>
          </a>
        </div>
      </form>
    </>
  );
};