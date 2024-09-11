import React from "react";
import PropTypes from "prop-types";

export const SortableColumnHeader = (props) => {
  const { field, name, order} = props; // The ORDER object is managed by another parent component.
  
  const handleSort = (ev) => {
    ev.preventDefault();
    // This component doesn't have it's own internal state, only the state that it wants to change to
    // We let the parent component, listening to the sortChanged event handle what it wants to do
    const orderToChangeTo =
      order === "ascending" ? "descending" :
        order === "descending" ? "none" : "ascending";
    
    fireSortChangeEvent( {
      name: name,
      field: field,
      order: orderToChangeTo
    });
  };
  
  const fireSortChangeEvent = (sort) => {
    const event = new CustomEvent('sortChanged', {detail: sort});
    document.dispatchEvent(event);
  }
  
  let getArrow = (order) => {
    if (order === "ascending") return "🡹";
    if(order==="descending")return "🡻";
    if(order==="none") return "↕"
    return "↕";
  };
  
  return (
    <>
      <a href={"#"}
        onClick={handleSort}
        className={'sortable'}
        id={name}>
        {name}
        <span  className="up">
         {getArrow(order)}
       </span>
      </a>
    </>
  );
};

SortableColumnHeader.defaultProps = {
  order: 'none'
};

SortableColumnHeader.propTypes = {
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
};

export default SortableColumnHeader;
