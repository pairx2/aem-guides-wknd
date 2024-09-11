import React from "react";
import {useSharedResults} from "../shared/Results";
import { searchService } from "../services/SearchService";
import {Pagination} from "@abbott/add-platform";

export const SearchPagination = (props) => {

  const { doSearch } = searchService();

  const { pageCount, currentPage, setCurrentPage } = useSharedResults();

  const handleOnChange = (page) => {
    setCurrentPage({pageNum: page, isSearching: true, pageWillReset: false});
  };
  
  return (
    <Pagination currentPage={currentPage.pageNum} pageCount={pageCount} onChange={handleOnChange} />
  );
};

SearchPagination.defaultProps = {};

SearchPagination.propTypes = {};

export default SearchPagination;
