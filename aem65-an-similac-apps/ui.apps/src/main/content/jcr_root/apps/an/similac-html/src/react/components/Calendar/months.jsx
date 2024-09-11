import React from "react";
import { mL } from "./constants";

const Months = ({ month, setMonth , setCurrentPage}) => {
  return (
    <div className="text-center">
      <div className="cal-row month-set">
        {mL &&
          mL.map((item, index) => (
            <button
              key={"months-" + index}
              className={`month-btn ${index === month ? "selected" : ""}`}
              onClick={() => setMonth(index) & setCurrentPage(1)}
            >
              {item}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Months;
