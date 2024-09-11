import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

const Dropdown = (props) => {
  const { selected, small, options, onChange, valueKey, labelKey } = props;

  const handleOnChange = (e) => {
    e.preventDefault();
    onChange && onChange(e.target.value);
  }

  return (
    <div className={`stb-dropdown ${small ? 'stb-dropdown--small':''}`}>
      <select onChange={handleOnChange} value={selected}>
        {
          options.map((option, idx)=>{
            return (
              <option key={idx} value={option[valueKey]}>
                { option[labelKey] }
              </option>
            )
          })
        }
      </select>
      <i className="mdi mdi-chevron-down" aria-hidden="true"></i>
    </div>
  )
}

Dropdown.defaultProps = {
  selected: '',
  small: false,
  options: [],
  valueKey: 'key',
  labelKey: 'value'
}

Dropdown.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
  small: PropTypes.bool,
  onChange: PropTypes.func,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string

}

export default Dropdown;
