import React from "react";

const Years = ({ startYear, endYear, year, setYear, validateSetAndClose }) => {
  let yearRow = [];
  let years = [];

  for (let i = startYear, j = 1; i <= endYear; i++, j++) {
    yearRow.push(
      <button
        key={"year-i" + i}
        className={`${year === i ? "selected" : ""}`}
        onClick={() => setYear(i) & validateSetAndClose(i)}
      >
        {i}
      </button>
    );
    if (j % 4 === 0 || i === endYear) {
      years.push(yearRow);
      yearRow = [];
    }
  }
  return (
    <div className="year-set">
      {years.map((item, index) => (
        <div key={"year-set" + index}>{item}</div>
      ))}
    </div>
  );
};

export default Years;
