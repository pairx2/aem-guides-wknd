import React, {useState} from 'react'

const Textarea = (props) => {
  const {knob, onChange} = props;
  const [value, setValue] = useState(knob.value);

  const handleTextOnChange = (e) => {
    setValue(e.target.value);
    knob.value = e.target.value;
    onChange && onChange();
  }

  return (
    <textarea
      id={knob.id}
      className="stb-knobs__form-ele"
      rows="3"
      onChange={(e)=>handleTextOnChange(e)}
    >
        {value}
    </textarea>
  )
}

export default Textarea;
