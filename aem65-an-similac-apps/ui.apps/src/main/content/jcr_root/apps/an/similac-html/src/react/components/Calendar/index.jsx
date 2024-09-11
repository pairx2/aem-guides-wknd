import React, { useState, useEffect, useRef } from "react";
import CalendarHead from "./calendarhead";
import Months from "./months";
import Days from "./days";
import Years from "./years";

const Calendar = ({ setShow, value, show, setCalendarClicked, calendarClicked, setValue }) => {
  const initialValue = String(value)
    .split("/")
    .map((item) => String(item).trim())
    .join("/").replace(/[_]/g,"");
  const [currentPage, setCurrentPage] = useState(0);
  const [month, setMonth] = useState(-1);
  const [day, setDay] = useState(-1);
  const [year, setYear] = useState(-1);
  const [totalDaysMonth, setTotalDaysMonth] = useState(31);
  const [isError, setIsError] = useState(false);

  const finalNum = Math.ceil(totalDaysMonth / 7) * 7;
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;
  const endYear = currentYear + 1;

  const node = useRef();

  function parseDate(str) {
    var m = str.match(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(\d{4})$/);
    return m ? new Date(m[3], m[1] - 1, m[2]) : null;
  }

  function updateDate(_month=-1,_day=-1,_year=-1){
    const _dYear = (year > endYear || year < startYear) ? "____":year;
    const _dMonth =  (month < 0 || month > 11 )? "__":month + 1;
    const _dDay =  (day < 1 || day > 31) ? "__": day;
    setValue(`${toFixed(_dMonth)}/${toFixed(_dDay)}/${_dYear}`);
  }

  useEffect(() => {
    const oldDate = parseDate(initialValue);
    if (oldDate) {
      setMonth(oldDate.getMonth());
      setDay(oldDate.getDate());
      const _oldYear = oldDate.getFullYear();
      if (startYear <= _oldYear && _oldYear <= endYear)
        setYear(oldDate.getFullYear());
    }
  }, [value]);

  const handleClick = (e) => {
    let click_icon=event.target.classList;
    click_icon=click_icon[1];
    if (node.current && !node.current.contains(e.target) && click_icon!=='calendar-icon' ) {
      setShow(false);
  }
  };

  const toFixed = (_value, num = 2) => {
    return ("0" + _value).slice(-1 * num);
  };

  const getTotalDaysMonth = (_month, _year) => {
    if (_month !== -1 && _year !== -1) {
      return new Date(_year, _month, 0).getDate();
    } else if (_month !== -1) {
      if (_month === 2) return 29;
      return new Date(new Date().getFullYear(), _month, 0).getDate();
    } else {
      return 31;
    }
  };

  function validateSetAndClose(_year) {
    if (year > endYear || year < startYear || month < 0 || month > 11 || day <1 || day > 31) {
      return;
    }
    if (!isNaN(Date.parse(`${_year}-${month + 1}-${day}`)) || window.msCrypto) {
      setValue(`${toFixed(month + 1)}/${toFixed(day)}/${_year}`);
      setShow(false);
    }
  }

  

  useEffect(() => {
    const totalDays = getTotalDaysMonth(month + 1, year);
    setTotalDaysMonth(totalDays);
    if (day > totalDays) {
      setDay(-1);
      setCurrentPage(1);
      setIsError(true);
    }
  }, [month, year]);

  useEffect(()=>{
    updateDate(month,day,year)
  },[month,day,year]);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    updateDate(month,day,year);
    return () => {
    document.removeEventListener("click", handleClick, true);
    };
  }, []);



  const pageState = [
    <Months
      month={month}
      setMonth={setMonth}
      setCurrentPage={setCurrentPage}
    />,
    <Days
      day={day}
      setDay={setDay}
      finalNum={finalNum}
      totalDaysMonth={totalDaysMonth}
      isError={isError}
      setIsError={setIsError}
      setCurrentPage={setCurrentPage}
    />,
    <Years
      year={year}
      setYear={setYear}
      startYear={startYear}
      endYear={endYear}
      validateSetAndClose={validateSetAndClose}
    />,
  ];

  const selectMessage = ["Month", "Day", "Year"];

  return (
    <div ref={node} className="calendar-wrapper">
      <CalendarHead
        month={month}
        year={year}
        day={day}
        isError={isError}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <hr />
      <label>Select {selectMessage[currentPage] || ""}</label>
      {pageState[currentPage]}
    </div>
  );
};

export default Calendar;
