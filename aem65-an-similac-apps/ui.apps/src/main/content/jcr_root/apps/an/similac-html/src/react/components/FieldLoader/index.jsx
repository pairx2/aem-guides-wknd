import React from "react";

const FieldLoader = ({name,loader}) => {
  const id = "field-loader-" + name;
  const style = loader? {display:"block"} : {};
  return (
    <div className={`field-loader ${id}`} style={style}>
      <div className="bullet-wrap">
        <div className="bullet b-1"></div>
        <div className="bullet b-2"></div>
        <div className="bullet b-3"></div>
      </div>
    </div>
  );
};

export default React.memo(FieldLoader);
