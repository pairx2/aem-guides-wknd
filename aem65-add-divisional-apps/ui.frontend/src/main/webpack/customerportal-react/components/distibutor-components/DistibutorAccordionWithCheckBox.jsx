import React, { useRef, useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

export const DistibutorAccordionWithCheckBox = (props) => {
  const { t, i18n } = useTranslation();
  const [isShowAccordion, setAccordion] = useState(true);

  const accordioncallBack = () => {
    if (isShowAccordion == true) {
      setAccordion(false);
    } else {
      setAccordion(true);
    }
  };

  return (
    <>
      <div className="distibutor__accordion">
        <div
          className="distibutor__header"
          onClick={() => {
            accordioncallBack();
          }}
        >
          <p>{props.data.name} {isShowAccordion ? (<em class="abt-icon abt-icon abt-icon-up-arrow"></em>) : (<em class="abt-icon abt-icon abt-icon-down-arrow"></em>)} </p>
        </div>
        <div className={`distibutor_body ${isShowAccordion ? "" : "d-none"}`}>
          {props.data.values.map((dataDesc, key) => {
            if (dataDesc.value != "") {
              return (
                <label>
                  <input
                    type="checkbox"
                    name={props.data.field == "country" ? t(dataDesc.value.toLowerCase()) : dataDesc.value == undefined ? "blank" : dataDesc.value}
                    onChange={() => {
                      props.onChangeCheched(dataDesc);
                    }}
                  />
                  {props.data.field == "country" ? t(dataDesc.value.toLowerCase()) : dataDesc.value == undefined ? "(Blank)" : dataDesc.value}
                </label>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
