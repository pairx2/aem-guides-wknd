import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from "../../../../utils/translationUtils";
import React from "react";
import PropTypes from "prop-types";

const DocumentCountSection = ({fetchedResults, query, isButtonClicked, resetAllFilters}) => {

  return (
    <div class="doc-search-box-div">
      <div className="documents-found">
        <p>
          <I18n
            text={i18nLabels.ORDER_DOCUMENT_COUNT_PLACEHOLDER}
            params={[fetchedResults?.length]}
          />
        </p>
      </div>
      <div
        className={
          query.length > 0 || isButtonClicked
            ? "reset-all-filters text-normal"
            : "reset-all-filters"
        }
        onClick={resetAllFilters}
      >
        <span>
          <em class="adc-icon adc-icon--small close-icon"></em>
        </span>{" "}
        <I18n text={i18nLabels.ORDER_DOCUMENT_RESET_ALL_FILTERS} />
      </div>
    </div>
  );
};

DocumentCountSection.propTypes = {
	fetchedResults: PropTypes.array,
	query: PropTypes.string,
	isButtonClicked: PropTypes.bool,
  resetAllFilters: PropTypes.func,
};

export default DocumentCountSection;
