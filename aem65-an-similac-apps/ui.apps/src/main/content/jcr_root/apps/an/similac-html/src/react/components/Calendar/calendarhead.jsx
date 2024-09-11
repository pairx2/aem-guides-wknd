import React from "react";
import { SvgIcon } from "../../common/common";
import { mL } from "./constants";

const CalendarHead = ({ year, day, month,isError, currentPage, setCurrentPage }) => {
  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="cal-row">
      <div className="cal-col-content">
        <button
          className={`${currentPage === 0 ? "hide-btn" : ""}`}
          onClick={handlePrevPage}
        >
          <SvgIcon icon={"arrow-01-left"} />
        </button>
      </div>
      <div className="cal-col-auto text-center head">
        <button
          className={`${currentPage === 0 ? "current":""}`}
          onClick={() => setCurrentPage(0)}
        >
          {month !== -1 ? mL[month] : "Month"}
        </button>
        <button
          className={`${currentPage === 1  ? "current":""} ${isError? "error":""}`}
          onClick={() => setCurrentPage(1)}
        >
          {day !== -1 ? day : "Day"}
        </button>
        <button
          className={`${currentPage === 2  ? "current":""}`}
          onClick={() => setCurrentPage(2)}
        >
          {year !== -1 ? year : "Year"}
        </button>
      </div>
      <div className="cal-col-content">
        <button
          className={`${currentPage === 2 ? "hide-btn" : ""}`}
          onClick={handleNextPage}
        >
          <SvgIcon icon={"arrow-01-right"} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHead;
