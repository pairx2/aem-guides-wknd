import React from "react";
import PropTypes from "prop-types";


export const CustomSearch = (props) => {
    return (<div
        className={`o-custom-search`}>
        {this.props.children}
    </div>);
}

CustomSearch.defaultProps = {
    buttonClasses: "",
};

CustomSearch.propTypes = {
    text: PropTypes.string.isRequired,
    buttonClasses: PropTypes.string
};

export default CustomSearch;
