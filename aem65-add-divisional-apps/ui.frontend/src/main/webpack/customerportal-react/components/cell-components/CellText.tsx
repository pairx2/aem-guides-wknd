import React from "react";

export const CellText = (props) => {
    const {value,field} = props;
    const valueStr = `${value}`.toLowerCase() == "not applicable" ? 'N/A' : value;

    return (<span className={field}> {valueStr}</span>);
}