import React from "react";
import PropTypes from "prop-types";

export const Pagination = (props) => {
  const {
    pageCount,
    currentPage,
    onChange
  } = props;


  const onPageClick = (page) => {
    onChange(page);
  }

  let pageCutLow = currentPage - 1;
  let pageCutHigh = currentPage + 1;
  let pages = [];

  // Previous arrow
  if (currentPage > 1) {
    pages.push(
      <li className="a-pagination__page a-pagination--previous" key={`prev-arrow`}>
        <a className="a-pagination__link" onClick={() => onPageClick(currentPage-1)} href="#">
          <em className="abt-icon abt-icon-left-arrow u-ltr"></em>
          <em className="abt-icon abt-icon-right-arrow u-rtl"></em>
        </a>
      </li>);
  } else {
    pages.push(
      <li className="a-pagination__page a-pagination--previous" key={`prev-arrow`}>
        <a className="a-pagination__link no-click" onClick={() => onPageClick(1)} href="#">
          <em className="abt-icon abt-icon-left-arrow u-ltr"></em>
          <em className="abt-icon abt-icon-right-arrow u-rtl"></em>
        </a>
      </li>);
  }

  // Show all the pagination elements if there are less than 6 pages total
  if (pageCount < 5) {
    for (let p = 1; p <= pageCount; p++) {
      pages.push(
        <li className={`a-pagination__page ${(currentPage === p) ? ' a-pagination--active' : ''}`} key={`page-link-${p}`}>
          <a className="a-pagination__link" onClick={() => onPageClick(p)} href="#">{p}</a>
        </li>);
    }
  } else {
    // Use "..." to collapse pages outside of a certain range

    // Show the last four pages preceded by a "..." at the beginning of the
    // pagination section (after the Previous button)
    if (currentPage >= pageCount - 2) {
      pages.push(
        <>
          <li className="a-pagination__page" key={`page-link-1`}>
            <a className="a-pagination__link" onClick={() => onPageClick(1)} href="#">1</a>
          </li>
          <li className="a-pagination__page a-pagination--out-of-range" key={`page-link-oor`}>
            <a className="a-pagination__link" onClick={() => onPageClick(currentPage - 2)} href="#">...</a>
          </li>
        </>);
    }
    // Determine how many pages to show after the current page index
    if (currentPage === 1) {
      pageCutHigh += 2;
    } else if (currentPage === 2) {
      pageCutHigh += 1;
    } else if (currentPage >= 3 && currentPage < pageCount - 3) {
      pageCutHigh += 1;
    }
    // Determine how many pages to show before the current page index
    if (currentPage === pageCount) {
      pageCutLow -= 2;
    } else if (currentPage === pageCount - 1) {
      pageCutLow -= 1;
    }
    // Output the indexes for pages that fall inside the range of pageCutLow
    // and pageCutHigh
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pageCount) {
        continue;
      }
      pages.push(
        <li className={`a-pagination__page ${(currentPage === p) ? 'a-pagination--active' : ''}`} key={`page-link-${p}`}>
          <a className="a-pagination__link" onClick={() => onPageClick(p)} href="#">{p}</a>
        </li>);
    }
    // Show the very last page preceded by a "..." at the end of the pagination
    // section (before the Next button)
    if (currentPage < pageCount - 1) {
      if (currentPage < pageCount - 2) {
        pages.push(
          <li className="a-pagination__page a-pagination--out-of-range" key={`page-link-oor`}>
            <a className="a-pagination__link"  onClick={() => onPageClick(currentPage + 2)} href="#">...</a>
          </li>);
      }
      pages.push(
        <li className="a-pagination__page" key={`page-link-pagecount`}>
          <a className="a-pagination__link"  onClick={() => onPageClick(pageCount)} href="#">{pageCount}</a>
        </li>);
    }
  }
  // Next arrow
  if (currentPage < pageCount) {
    pages.push(
      <li className="a-pagination__page a-pagination--next" key={`page-link-next`}>
        <a className="a-pagination__link" onClick={() => onPageClick(currentPage + 1)} href="#">
          <em className="abt-icon abt-icon-right-arrow u-ltr"></em>
          <em className="abt-icon abt-icon-left-arrow u-rtl"></em>
        </a>
      </li>);
  } else {
    pages.push(
      <li className="a-pagination__page a-pagination--next" key={`page-link-next`}>
        <a className="a-pagination__link no-click"  onClick={() => onPageClick(pageCount)} href="#">
          <em className="abt-icon abt-icon-right-arrow u-ltr"></em>
          <em className="abt-icon abt-icon-left-arrow u-rtl"></em>
        </a>
      </li>);
  }

  if (pageCount > 1) {
    return (
        <div className="a-pagination">
          <ul className="a-pagination__pages">
            {pages}
          </ul>
        </div>
    );
  } else {
    return <></>;
  }
};

Pagination.defaultProps = {
  pageCount: 0,
  currentPage: 1,
  onChange: null
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
