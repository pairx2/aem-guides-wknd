import React from 'react';

const RadioButtonGenric = ({  id, value, onChange, checked, text, classLabel, classInput , classSpan, isDisabled}) => {
    return (
    <label htmlFor={id} className={classLabel ? classLabel : 'radio-button-label'}>
        <input
          className={classInput ? classInput : 'radio-input'}
          type="radio"
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={isDisabled}
        />
        <span className={classSpan ? classSpan : 'custom-radio'} />
        {text}
      </label>
    )
  };

export default RadioButtonGenric;