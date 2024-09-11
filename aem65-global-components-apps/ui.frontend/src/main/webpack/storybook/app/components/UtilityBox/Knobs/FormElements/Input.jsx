import React, {useState} from 'react'

const Input = (props) => {
  const {knob, onChange} = props;
  const [value, setValue] = useState(knob.value);

  const handleTextOnChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    knob.value = e.target.value;
    onChange && onChange();
  }

  return (
    <input
      className="stb-knobs__form-ele"
      key={knob.id}
      value={value}
      type="text"
      onChange={(e)=>handleTextOnChange(e)}
    />
  )
}

export default Input;
