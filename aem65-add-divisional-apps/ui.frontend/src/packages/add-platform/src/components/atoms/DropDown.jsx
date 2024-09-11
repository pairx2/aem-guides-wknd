import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../common/LoadingIndicator';

export function DropDown(props) {
  const {id, label, placeholder, options, onChange, className, isLoading, isDisabled, selectedOverride, ...rest } = props;

  const [selected, setSelected] = useState('');
  
  const dropDownItem = useRef();

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

  useEffect(() => {
    if (selectedOverride) {
      setSelected(selectedOverride);
    }
  }, []);
  
  useEffect(() => {
    if (selectedOverride) {
      setSelected(selectedOverride);
    } else {
      setSelected("");
    }
  }, [options]);
  
  useEffect(() => {
    setSelected(selectedOverride);
  }, [selectedOverride])
  
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
                  <span>{item.label||item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

DropDown.defaultProps = {
  className: '',
  label: '',
  placeholder: '',
  onChange: null,
  isLoading: false,
  isDisabled: false,
  options:'',
  selectedOverride: null,
  id:''
};

DropDown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  selectedOverride: PropTypes.any
};

export default DropDown;
