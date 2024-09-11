import React from "react";

const PopularSuggestions = props => (
  <div className="popular-suggestions">
    <div className="popular-suggestions__title">
      <span>Popular Suggestions</span>
    </div>
    <ul className="popular-suggestions__list">
      {props.items.map((item, idx) => (
        <li key={idx} className="popular-suggestions__list--name">
          <a className="items" href={props.searchPageUrl + '?q=' + item.queryText} title={item.queryText}>
            <span className="tags">{item.queryText}</span>
            <span className="tags">{item.resultsCount}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
export default PopularSuggestions;
