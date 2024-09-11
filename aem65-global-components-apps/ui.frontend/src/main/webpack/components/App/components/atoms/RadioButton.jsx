import React from 'react';
import PropTypes from 'prop-types';

function RadioButton(props) {
  const { text, value, name, id, classes, checked, onChange } = props;

  return (
    <div className={`a-radio ${classes}`}>
      <label
        className="a-radio__label"
        htmlFor={id}
        onClick={onChange}
        aria-hidden="true"
      >
        <span className="a-radio__text">{text}</span>
        <input
          type="radio"
          className="a-radio__input"
          value={value}
          name={name}
          id={id}
          data-required="true"
          checked={checked}
        />
        <span className="a-radio__custom" />
      </label>
    </div>
  );
}

RadioButton.defaultProps = {
  text: null,
  classes: '',
  checked: false,
  onChange: null,
};

RadioButton.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioButton;
