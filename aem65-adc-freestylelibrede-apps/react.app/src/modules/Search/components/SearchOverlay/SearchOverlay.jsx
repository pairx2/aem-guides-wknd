import React from 'react';
import PropTypes from 'prop-types';

import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";


const SearchOverlay = ({
                           showAllStyle,
                           resultPage,
                           topFaqLabel,
                           faqPagePath,
                           nrOfResults,
                           nrOfViewMore,
                           searchNrOfResults,
                           searchNrOfViewMore,
                           filters,
                           searchRootPath,
                           rendition,
                           searchDefaultList,
                           noResultDescription,
                           noResultBtnLink,
                           sysSourceType
                       }) => {
    return (
        <div>
            <SearchBar
                nrOfResults={nrOfResults}
                nrOfViewMore={nrOfViewMore}
                resultPage={resultPage}
                showAllStyle={showAllStyle}
                topFaqLabel={topFaqLabel}
                faqPagePath={faqPagePath}
                rendition={rendition}></SearchBar>
            <SearchResults
                nrOfResults={searchNrOfResults}
                nrOfViewMore={searchNrOfViewMore}
                filters={filters}
                searchRootPath={searchRootPath}
                searchDefaultList={searchDefaultList}
                rendition={rendition}
                noResultBtnLink={noResultBtnLink}
                noResultDescription={noResultDescription}
                sysSourceType={sysSourceType}>
            </SearchResults>
        </div>
    );
};

SearchOverlay.propTypes = {
    showAllStyle: PropTypes.string,
    topFaqLabel: PropTypes.string,
    faqPagePath: PropTypes.string,
    nrOfResults: PropTypes.number,
    searchNrOfResults: PropTypes.number,
    nrOfViewMore: PropTypes.number,
    searchNrOfViewMore: PropTypes.number,
    filters: PropTypes.array,
    searchRootPath: PropTypes.string,
    resultPage: PropTypes.string,
    searchDefaultList: PropTypes.array,
    rendition: PropTypes.string,
    noResultDescription: PropTypes.string,
    noResultBtnLink: PropTypes.string,
    sysSourceType: PropTypes.string
};
export default SearchOverlay;