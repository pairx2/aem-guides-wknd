import * as React from "react";
import Select, { components } from "react-select";
import AsyncSelect from 'react-select/async';

const DropdownIndicator = React.memo((props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg viewBox="0 0 100 100" className="sim-icon">
        <use href={`#icon-arrow-down-color`}></use>
      </svg>
    </components.DropdownIndicator>
  );
});

const styleFn = (provided, state) => {
  return { ...provided };
};

var selectedColor = "#ffffff";
var cssFontFamily ="";
var fontWeightDropdown = "";
if (isPWA() == true) {
   selectedColor = "#464646";
   cssFontFamily ="BrandonText,Arial,sans-serif";
   fontWeightDropdown = "420";
}

export const defaultStyles = {
  clearIndicator: styleFn,
  container: styleFn,
  control: (provided) => ({
    // None of react-select's styles are passed to <Control />
    ...provided,
    borderColor: "#029ce8",
    border: "1px solid #029ce8",
    borderRadius: "6px",
    minHeight: "2.5rem",
    width: "100%",
    boxShadow: "none",
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      borderColor: "#029ce8",
    },
    "&:hover": {
      border: "1px solid #029ce8",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
  }),
  group: styleFn,
  groupHeading: styleFn,
  indicatorsContainer: (provided) => ({
    // None of react-select's styles are passed to <Control />
    ...provided,
    marginRight: "1rem",
  }),
  indicatorSeparator: styleFn,
  input: styleFn,
  loadingIndicator: styleFn,
  loadingMessage: styleFn,
  menu: (provided) => {
    return { ...provided, marginBottom: 0, marginTop: 0 };
  },
  menuList: styleFn,
  menuPortal: styleFn,
  multiValue: styleFn,
  multiValueLabel: styleFn,
  multiValueRemove: styleFn,
  noOptionsMessage: styleFn,
  option: (provided, state) => ({
    ...provided,
    backgroundColor: (state.isFocused) ? "#fe9e1f" : "transparent",
    color:  (state.isFocused) ? selectedColor : "#777777",
    fontFamily: cssFontFamily,
    fontWeight: (state.isFocused) ? fontWeightDropdown : "",
    "&:hover": {
      backgroundColor: "#fe9e1f",
      color: "#ffffff",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontfamily: '"Roboto Regular", Arial, sans-serif',
    fontSize: "1.375rem",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.09,
    letterSpacing: "normal",
    color: "#002f87",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: '"Roboto Regular", Arial, sans-serif',
    fontSize: "1rem",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.38",
    letterSpacing: "normal",
    color: "#474747",
  }),
  valueContainer: (provided) => ({ ...provided, padding: "0 1rem" }),
};


const Dropdown = (props) => (
  <Select
    className="dropdown-single"
    classNamePrefix="select"
    styles={defaultStyles}
    components={{
      IndicatorSeparator: () => null,
      DropdownIndicator,
    }}
    onChange={props.handleChange}
    {...props}
  />
);

const DropdownAsync = (props) => (
  <AsyncSelect
    className="dropdown-single-async"
    classNamePrefix="select"
    styles={defaultStyles}
    components={{
      IndicatorSeparator: () => null,
      DropdownIndicator,
    }}
    onChange={props.handleChange}
    {...props}
  />
);

export { DropdownAsync };
export default Dropdown;
