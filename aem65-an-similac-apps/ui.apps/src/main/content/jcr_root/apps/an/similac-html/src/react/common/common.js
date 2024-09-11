import * as React from "react";
import PropTypes from 'prop-types';

const SvgIcon = ({name,icon,className="",style={}, onMouseDown =()=> null, onMouseUp =()=> null,onClick =()=> null}) => (<svg onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={(e)=>onClick(e,name)} viewBox="0 0 100 100" className={`sim-icon ${className}`} style={style||{}}>
    <use href={`#icon-${icon}`}></use>
</svg>)

SvgIcon.propTypes = {
    icon: PropTypes.string.isRequired
}

export {SvgIcon}