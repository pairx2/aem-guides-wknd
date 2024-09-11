import React from "react";
import PropTypes from "prop-types";


export const Test = (props) => {
    const {
        text,
        buttonClasses
    } = this.props;
    return (<div
        className={`a-button`}>
    <button
        className={`btn ${buttonClasses}`}
        type="button">
        <span>{text}</span>
        </button>
    </div>);
}

Test.defaultProps = {
    buttonClasses: "",
};

Test.propTypes = {
    text: PropTypes.string.isRequired,
    buttonClasses: PropTypes.string
};

export default Test;