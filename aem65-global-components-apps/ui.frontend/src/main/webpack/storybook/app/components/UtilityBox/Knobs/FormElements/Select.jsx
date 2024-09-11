import React, {useState} from 'react'

const Select = (props) => {
  const {knob, onChange} = props;
  const [value, setValue] = useState(knob.value);

  const handleTextOnChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    knob.value = e.target.value;
    onChange && onChange();
  }

  return (
    <select
      className="stb-knobs__form-ele"
      onChange={(e)=>handleTextOnChange(e)}
      value={value}
    >
      {knob.options.map((option, idx)=>{
        return <option key={idx}>{option}</option>
      })}
    </select>
  )
}

export default Select;
