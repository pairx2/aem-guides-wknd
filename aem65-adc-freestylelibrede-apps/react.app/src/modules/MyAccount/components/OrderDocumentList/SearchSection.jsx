import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from "../../../../utils/translationUtils";
import React from "react";
import {ORDER_DOCUMENT_LIST} from "../../../../utils/enums";
import PropTypes from "prop-types";

const SearchSection = ({query, handleSearchQuery, handleKeyPress, handleSearchClick, getOnlyPdfAvailableOrders, resetSearch}) => {
  return (
    <>
      <p className="enter-search-term">
        <I18n text={i18nLabels.ORDER_DOCUMENT_SEARCH} />
      </p>

      <div class="doc-search-box">
        <input
          type="text"
          className="doc-input-field"
          placeholder={ORDER_DOCUMENT_LIST.PLACEHOLDER}
          onChange={handleSearchQuery}
          value={query}
          onKeyDown={handleKeyPress}
        />
        <span
          className="search-icon-blue"
          onClick={() =>
            handleSearchClick(getOnlyPdfAvailableOrders())
          }
          data-testid="search-icon"
        >
          <em class="adc-icon adc-icon--medium search-icon-blue-logo"></em>
        </span>
      </div>
      <p
        className={
          query?.length > 0 ? "reset-search text-normal" : "reset-search"
        }
        onClick={resetSearch}
      >
        <I18n text={i18nLabels.ORDER_DOCUMENT_RESET_SEARCH} />
      </p>
    </>
  );
};

SearchSection.propTypes = {
	query: PropTypes.string,
	handleSearchQuery: PropTypes.func,
	handleKeyPress: PropTypes.func,
  handleSearchClick: PropTypes.func,
  getOnlyPdfAvailableOrders: PropTypes.func,
  resetSearch: PropTypes.func
};

export default SearchSection;
