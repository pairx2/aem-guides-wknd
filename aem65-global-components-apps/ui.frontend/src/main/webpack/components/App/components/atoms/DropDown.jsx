import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../common/LoadingIndicator';

function DropDown(props) {
  const { label, placeorder, options, onChange, isLoading, ...rest } = props;

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

  return (
    <div
      class="a-dropdown a-input-field mt-0"
      data-js-component="form-dropdown"
      {...rest}
      ref={dropDownItem}
    >
      <div class="a-dropdown__container form-group mt-0">
        <label class="a-dropdown__title form-label a-input-label">
          {label}
        </label>
        <div className={`${isLoading && 'a-dropdown__loading-container'}`}>
          {isLoading && (
            <div className="a-dropdown__loading-mask">
              <LoadingIndicator />
            </div>
          )}

          <div class="a-dropdown__field" tabindex="0" onClick={toggleDropDown}>
            <span class="a-dropdown__placeholder">
              {selected?.label || placeorder}
            </span>
            <ul class="a-dropdown__menu">
              {options.map((item) => (
                <li
                  data-optionvalue={item.value}
                  class={`${selected?.value === item.value && 'selected'}`}
                  onClick={() => onItemSelection(item)}
                >
                  <span>{item.label}</span>
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
  label: '',
  placeorder: '',
  onChange: null,
  isLoading: false,
};

DropDown.propTypes = {
  label: PropTypes.string,
  placeorder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default DropDown;
