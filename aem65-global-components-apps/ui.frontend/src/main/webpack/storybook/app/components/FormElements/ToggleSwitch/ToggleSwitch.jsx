import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle'
import './ToggleSwitch.scss';

const ToggleSwitch = props => {
    const {
        name,
        className,
        defaultChecked,
        onChange,
        leftLabel,
        rightLabel
    } = props;
    const handleChange = (e) => {
        const { checked } = e.target;
        onChange && onChange(checked);
    };
    return (
        <div className='toggle-switch-wrap'>
            <span>{leftLabel}</span>
            <Toggle
                defaultChecked={defaultChecked}
                icons={false}
                name={name}
                className={className}
                onChange={handleChange} />
            <span>{rightLabel}</span>
        </div>
    )
};

ToggleSwitch.defaultProps = {
  name: 'InputField',
  leftLabel: 'Light',
  rightLabel: 'Dark',
  className: '',
  defaultChecked: false
}

ToggleSwitch.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  onChange: PropTypes.func
}


export default ToggleSwitch;
