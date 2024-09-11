import React from "react";
import PropTypes from "prop-types";

// Styles are found in instruments scss files
// This component is used to display the instrument maintenance (GSR) metrics on the instrument details page

export const ColorBox = (props) => {
  const {
    color,
    number,
    ...rest
  } = props;

  return (
    <td className={`instrument-report-card-maintenance instrument-report-card-maintenance-${color}`}>
        <p>{number}</p>
    </td>
  );
};

ColorBox.defaultProps = {
  color: '',
  number: ''
};

ColorBox.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default ColorBox;
