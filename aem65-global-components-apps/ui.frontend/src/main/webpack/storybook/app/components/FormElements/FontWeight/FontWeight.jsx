import React, { useState } from 'react'
import { getFinalValue } from '../../../utils/Common';
import Dropdown from '../Dropdown';
const FontWeight = (props) => {
  const {config, changedVariables, onChange} = props;
  const [selectedValue, setSelectedValue] = useState(getFinalValue(config.default, changedVariables) || '')
  const weights = [
    { key: '100', value: 'Thin' },
    { key: '200', value: 'Extra Light' },
    { key: '300', value: 'Light' },
    { key: '400', value: 'Regular' },
    { key: '500', value: 'Medium' },
    { key: '600', value: 'Semi Bold' },
    { key: '700', value: 'Bold' },
    { key: '800', value: 'Extra Bold' },
    { key: '900', value: 'Black' }
  ];

  const handleChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(config.default.key, value);
  }

  return (
    <Dropdown options={weights} selected={selectedValue} onChange={handleChange} />
  )
}

export default FontWeight;
