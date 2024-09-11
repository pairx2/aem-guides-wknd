import React from "react";

const SearchTermEmpty = (props) => {
    return (
        <div className="d-block w-100 alert-message mx-3">
            <i className="ai-warning"></i>
            {props.emptyMessage}
        </div>
    );
}

export default SearchTermEmpty;