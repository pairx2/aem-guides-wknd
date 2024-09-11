import React from "react";

const Days = ({ finalNum, totalDaysMonth, day, setDay ,isError,setIsError,setCurrentPage}) => {
  let row = [];
  let rows = [];
  for (let i = 1; i <= finalNum; i++) {
    row.push(i);
    if (i % 7 === 0) {
      rows.push(
        row.map((item, index) =>
          item > totalDaysMonth ? (
            ""
          ) : (
            <button
              className={`${item === day ? "selected" : ""}`}
              key={index + "00" + item}
              onClick={() => setDay(item) & setCurrentPage(2) & setIsError(false)}
            >
              {("0" + item).slice(-2)}
            </button>
          )
        )
      );
      row = [];
    }
  }

  let divs = rows.map((item, index) => (
    <div className="days-set" key={"days-set" + index}>
      {item}
    </div>
  ));
  return (
    <>
      {divs}
      {isError && <p className="error-label">Please reselect the day</p>}
    </>
  );
};

export default Days;
