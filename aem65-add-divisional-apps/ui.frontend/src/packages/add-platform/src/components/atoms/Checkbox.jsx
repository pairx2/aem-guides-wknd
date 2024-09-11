import React, {useState} from "react";
import PropTypes from "prop-types";

export const Checkbox = (props) => {
  const {
    text,
    value,
    item,
    name,
    checked,
    parentControl,
    onChange,
    id,
    className
  } = props;

  const [checkedState, setCheckedState] = useState(checked);

  const onItemSelection = () => {
    const state = !checkedState;
    setCheckedState(state);
    if (typeof onChange === 'function') {
      if (item) {
        onChange(item, state);
      } else {
        onChange(state);
      }
    }
  }

 const  textConversrion = () =>{
      if(text === ("Y")){
        return "Yes";
      }
      else if(text===("N")){
        return "No";
      }
      else return text;
  }

  return (
    <div className={`a-checkbox ${className} ${parentControl && checked ? 'checked' : ''} ${!parentControl && checkedState ? 'checked' : ''} a-checkbox--vertical a-checkbox--default`}>
        <label className="a-checkbox__label">
             
             <span className="a-checkbox__text">{textConversrion()}</span>
             <input type="checkbox"
                 name={name}
                 defaultChecked={parentControl ? null : checkedState}
                 checked={parentControl? checked : null}
                 onChange={onItemSelection}
                 className="a-checkbox__input"
                 id={id} />
             <span className="a-checkbox__custom"
                   role="checkbox"></span>
        </label>
    </div>
  );
};




Checkbox.defaultProps = {
  text: null,
  id: null,
  className: '',
  label:null,
  item: null,
  name:null,
  checked: false,
  parentControl: false,
  onChange: null
};

Checkbox.propTypes = {
  text: PropTypes.string,
  id : PropTypes.string,
  className:PropTypes.string,
  name: PropTypes.string,
  item: PropTypes.any,
  checked: PropTypes.bool,
  parentControl: PropTypes.bool,
  onChange: PropTypes.func
};

export default Checkbox;

