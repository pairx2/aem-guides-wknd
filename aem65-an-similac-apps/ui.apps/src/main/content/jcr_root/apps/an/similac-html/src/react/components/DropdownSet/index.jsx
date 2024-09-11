import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { ErrorMessage, useFormikContext } from "formik";
import { makeCall } from "../../common/api";

const DropdownSet = ({ label, value, onChange = () => null, fetchApi, options: initalOptions = [], displayLabelFormat, valueFormat, ...props }) => {
  const { submitCount, setFieldTouched, setFieldValue, values } = useFormikContext();
  useEffect(() => {
    if (submitCount > 0) {
      setFieldTouched(props.name, true);
    }
  }, [submitCount]);

  const [options, setOptions] = useState(initalOptions || []);

  useEffect(() => {
    if (typeof (value) === "string" && value != "") {
      const selected = options.find(({ value: _vl }) => (_vl === value));
      if (selected) {
        setFieldValue(props.name, selected);
      }
    }
  }, [value]);

  const stringifyObjectPattern = (patternString, genRegEx, item) => {
    if (!item)
      return null;

    return patternString.replace(genRegEx, function (matched) {
      return item[matched];
    })
  }

  const mapToDropdown = (data = [], labelFormat = "label", _valueFormat = "value") => {
    let genRegEx = "";

    return data.map(item => {
      if (!genRegEx) {
        genRegEx = new RegExp("(" + Object.keys(item).join('|') + ")", "g")
      }

      return ({
        label: stringifyObjectPattern(labelFormat, genRegEx, item),
        value: stringifyObjectPattern(_valueFormat, genRegEx, item)
      })
    })
  }

  const getCurrentURL = () => {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}`;
  }

  const apiCall = ({ url: apiURL, method, responseKey, data: fieldData = [] }, _setOptions) => {
    let data = {};
    let url = new URL(apiURL, getCurrentURL());
    fieldData.forEach(item => {
      if (values.hasOwnProperty(item)) {

        if (String(method).trim().toLowerCase() === "get") {
          url.searchParams.set(item, values[item]);
        }
        else {
          data[item] = values[item]
        }
      }
    });

    makeCall({
      url: url.toString(),
      method,
      data
    }, true).then(result => {
      _setOptions(mapToDropdown(result.response[responseKey], displayLabelFormat, valueFormat) || []);
    })
  }

  const zipCode = values && values['zipCode'] || "";
  const usZipCode = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(zipCode);
  useEffect(() => {
    const callAjax = async () => {
      if (fetchApi && fetchApi.url && zipCode !== "" && typeof (zipCode) !== "undefined" && usZipCode) {
        apiCall(fetchApi, setOptions);
      }
    }

    callAjax();

  }, [fetchApi, zipCode])

  const handleChange = (newValue) => {

    setFieldValue(props.name, newValue);

  };

  return (
    <fieldset className="form-group similac-form-group" data-scroll={props.name}>
      <label className="similac-bold-label m-0">{label}</label>
      <Dropdown
        value={value}
        onChange={handleChange}
        options={options}
        {...props}
      />
      <ErrorMessage name={props.name} >
        {msg => (<div
          className="invalid-feedback similac-error-group "
          dangerouslySetInnerHTML={{ __html: msg }}
        />)}
      </ErrorMessage>
    </fieldset>
  );
};

export default DropdownSet;