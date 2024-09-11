import React, {useEffect, useRef, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import LoadingIndicator from '../common/LoadingIndicator';

export function ComboBox(props) {
  const {
    id,
    label,
    placeholder,
    options,
    onChange,
    className,
    isLoading,
    isDisabled,
    selectedOverride,
    creatable,
    onCreateChange,
    formatCreateLabel,
    isClearable,
    isSearchable,
    isHidden,
    ...rest } = props;

  const [selected, setSelected] = useState(null);
  const userRole = useMemo(() => {return localStorage.getItem("role")}, []);
  const [processedOptions, setProcessedOptions] = useState([]);
  const initialSelected = useMemo(() => {
    if (selectedOverride?.value) {
      let index = -1;
      if (processedOptions) {
        index = processedOptions.findIndex(item => item.value == selectedOverride.value)
      }
      if (index != -1) {
        return processedOptions[index];
      } else {
        return null;
      }
    }
  }, [selectedOverride, processedOptions]);
  
  const SelectTag = creatable ? Creatable : Select;

  const comboBoxItem = useRef();

  const onItemSelection = (item) => {
    setSelected(item);
    if (typeof onChange === 'function') {
      onChange(item);
    }
  };

  const onCreateableChange = (value) => {
    if (typeof onCreateChange === 'function') {
      onCreateChange(value);
    }
  };
  
  const onFormatCreateLabel = (inputValue) => {
    return (<>{formatCreateLabel} <strong>{inputValue}</strong></>);
  }

  useEffect(() => {
    if (selected != null  && initialSelected == null) {
      // reset selected
      setSelected(null);
    } else if (initialSelected?.value) {
      onItemSelection(initialSelected);
    }
  }, [processedOptions]);
  useEffect(() => {
    const processed = options.map((item) => {
      if (!item.label) {
        item.label = item.value;
      }
      return item;
    });
    setProcessedOptions(processed);
  }, [options]);
  
  useEffect(() => {
    if (initialSelected?.value) {
      onItemSelection(initialSelected);
    }
  }, [selectedOverride])
  var countryCode = JSON.parse(localStorage.getItem('profile')); 
  const isEmployee = useMemo(() => {return userRole == "employee"}, [userRole]);
  var result = [];
  if (!isEmployee) {
    if(countryCode.country === 'FR'){
      result = processedOptions; 
    } else {
      var data = processedOptions;
      var listToDelete = ['SH Form 43'];
      result = data.filter( el => (-1 == listToDelete.indexOf(el.label)) );  
    }
  }
  else{
    result = processedOptions; 
  }

  return (
    <div
      className={`a-combobox a-dropdown a-input-field mt-0 ${className}${isHidden ? ' hidden' : ''}`}
      {...rest}
      ref={comboBoxItem}
    >
      <div className="a-combobox__container form-group mt-0">
        <label className="a-dropdown__title form-label a-input-label">
          {label}
        </label>
        <div>
          <div className={`a-combobox__field ${isLoading ? 'loading' : ''} ${isDisabled ? 'disabled' : ''}`} tabIndex="0">
            {isLoading && (
                <LoadingIndicator />
            )}
            <SelectTag
                className="react-select"
                classNamePrefix="react-select"
                isDisabled={isDisabled}
                value={selected}
                isClearable={isClearable}
                formatCreateLabel={onFormatCreateLabel}
                options={result}
                onChange={onItemSelection}
                onCreateOption={onCreateChange}
                isSearchable={isSearchable}
                menuPortalTarget={document.body}
                placeholder={placeholder}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}>
            </SelectTag>
          </div>
        </div>
      </div>
    </div>
  );
}

ComboBox.defaultProps = {
  className: '',
  label: '',
  placeholder: '',
  onChange: null,
  isLoading: false,
  isDisabled: false,
  options:'',
  selectedOverride: null,
  id:'',
  creatable: false,
  onCreateChange: null,
  formatCreateLabel: null,
  isClearable: false,
  isSearchable: true,
  isHidden: false
};

ComboBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  selectedOverride: PropTypes.any,
  creatable: PropTypes.bool,
  onCreateChange: PropTypes.func,
  formatCreateLabel: PropTypes.string,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isHidden: PropTypes.bool
};

export default ComboBox;