import React from "react";

const Divider = React.memo(({ children, className }) => (
  <div className={`divider ${className||""}`}>{children && <span>{children}</span>}</div>
));

export default Divider;
