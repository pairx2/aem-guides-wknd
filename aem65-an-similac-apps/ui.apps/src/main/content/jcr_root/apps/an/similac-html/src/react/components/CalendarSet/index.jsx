import React, { useState, useRef  } from "react";
import InputField from "../InputField3";
import RelativePortal from "react-relative-portal";
import Calendar from "../Calendar";
import { SvgIcon } from "../../common/common";
import { Formik, Form, Field, useFormikContext } from "formik";

const CalendarSet = (props) => {
  const {
    label,
    name,
    value,
    className,
    touched,
    onChange = () => null,
    onFocus = () => null,
    onBlur = () => null,
  } = props;

  const { setFieldTouched, setFieldValue } = useFormikContext();

  const [show, setShow] = useState(false);
  const [calendarClicked, setCalendarClicked] = useState(false);
  const node = useRef();

  function handleFocus(e) {
 
    if(!show){
  
    setShow(true);
    onFocus(e);
    }
  }
  
function toggleCalendar(e){
 if(!show){
setShow(true);
    }
    else{
      setShow(false);
    }
  }


  return (
    <>
      <InputField
        label={label}
        name={name}
        value={value}
        onClick={handleFocus}
        onChange={onChange}
        iconClickable="true"
        onBlur={() => {
          if (!touched) {
            setFieldTouched(name, true);
          }
        }}
        icon={<SvgIcon icon="calendar" onClick={toggleCalendar} className="calendar-icon"/>}
        subComponent={
          <RelativePortal
            component="div"
            right={0}
            top={1}
            onOutClick={show ? setShow : null}
          >
            {(show && (
              <Calendar
                value={value}
                show={show}
                setShow={setShow}
                calendarClicked={calendarClicked}
                setCalendarClicked={setCalendarClicked}
                setValue={(_value) => {
                  setFieldValue(name,_value);
                }}
              />
            )) ||
              null}
          </RelativePortal>
        }
      />
    </>
  );
};

export default CalendarSet;
