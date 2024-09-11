import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '@abbott/add-platform';

export function InstrumentDropdown(props) {
  const { id, label, placeholder, options, onChange, className, isLoading, isDisabled, ...rest } = props;

  const [selected, setSelected] = useState('');
  const dropDownItem = useRef();

  // ****** event listeners ********
  // Listener for clearing the name serial number dropdown when the product type switches
  const handleTypeChanged = (e) => {
    if (id == 'emptyDropdown') {
      setSelected('')
    }
  }

  useEffect(() => {
    document.addEventListener('typeChanged', handleTypeChanged);
    return () => document.removeEventListener('typeChanged', handleTypeChanged);
  }, []);

  // listener for resetting the product type dropdown after switching lab profiles
  const handleProductTypeReset= (e) => {
    if (id == 'productType') {
      setSelected('All')
    }
  }

  useEffect(() => {
    document.addEventListener('resetType', handleProductTypeReset);
    return () => document.removeEventListener('resetType', handleProductTypeReset);
  }, []);

  // *********************

  const toggleDropDown = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const item = dropDownItem.current.querySelector('.a-dropdown__field');
    const hasActiveClass = item.classList.contains('active');

    if (!hasActiveClass) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  };

  const onItemSelection = (item) => {
    setSelected(item);
    if (typeof onChange === 'function') {
      onChange(item);
    }
  };

  return (
    <div
      className={`a-dropdown a-input-field mt-0 ${className}`}
      data-js-component="form-dropdown"
      {...rest}
      ref={dropDownItem}
    >
      <div className="a-dropdown__container form-group mt-0">
        <label className="a-dropdown__title form-label a-input-label">
          {label}
        </label>
        <div>
          <div className={`a-dropdown__field ${isLoading ? 'loading' : ''} ${isDisabled ? 'disabled' : ''}`} tabIndex="0" onClick={toggleDropDown}>
            {isLoading && (
              <LoadingIndicator />
            )}
            <span className="a-dropdown__placeholder">
              {selected?.label || selected?.value || placeholder}
            </span>
            <ul className="a-dropdown__menu">
              {options?.map((item, indx) => (
                <li
                  key={`dropdown__menu-item-${indx}`}
                  data-optionvalue={item.value}
                  className={`${selected?.value === item.value && 'selected'}`}
                  onClick={() => onItemSelection(item)}
                >
                  <span>{item.label || item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

InstrumentDropdown.defaultProps = {
  className: '',
  label: '',
  placeholder: '',
  onChange: null,
  isLoading: false,
  isDisabled: false,
  options: '',
  id: ''
};

InstrumentDropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool
};

export default InstrumentDropdown;
