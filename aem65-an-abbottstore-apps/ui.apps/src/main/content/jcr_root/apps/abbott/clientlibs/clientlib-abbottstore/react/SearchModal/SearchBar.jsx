import React from "react";

const SearchBar = props => {

  function checkQueryLength(event) {
    let searchTerm = event.target.q.value;
    if (searchTerm.length === 0) {
      jQuery('#search-modal').removeClass('is-open');
      event.preventDefault();
    } else if (searchTerm.length === 1) {
      event.preventDefault();
    }
  }

  return (
    <form className="search-modal__form" action={props.searchPageUrl} method="get" onSubmit={checkQueryLength}>
      <div className="card-search">
        <input
          name="q"
          type="text"
          className="card-search__input form-control"
          placeholder="Type to search entire store..."
          onKeyUp={e => props.onInputChange(e.target.value)}
        />
        {props.isLoading &&
          <div className="card-search__spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        }

        <button
          type="submit"
          className="action search card-search__button"
          title="Search"
        >
          <span className="ai-search card-search__button--icon"></span>
        </button>
      </div>
      {
        props.noResults &&
        <div className="no-results">
          <p>Sorry, no results were found.</p>
        </div>
      }
    </form >
  );
};

export default SearchBar;
