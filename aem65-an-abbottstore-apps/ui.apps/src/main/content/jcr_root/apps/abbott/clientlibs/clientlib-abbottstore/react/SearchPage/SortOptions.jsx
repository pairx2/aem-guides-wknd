import React from "react";
const SortOptions = (props) => {
    let sortOrderClass = props.toggle ? "ai-sort-up" : "ai-sort-down";
    return (
        <div className="toolbar-sort">
            <label className="sort-label">Sort By:</label>
            <div className="select-wrapper">
                <select className="sort-options"
                    value={props.selectedOption}
                    onChange={(e) => props.changeOptions(e)}>
                    {props.options.map((term, index) => (
                        <option key={index} value={term}>
                            {term}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn"
                title={props.toggle ? "Set Descending Direction" : "Set Ascending Direction"}
                onClick={() => props.onSelectSortOptions()}>
                <span className={`${sortOrderClass} toolbar-sort-icon`}></span>
            </button>
        </div>
    )
}

export default SortOptions;