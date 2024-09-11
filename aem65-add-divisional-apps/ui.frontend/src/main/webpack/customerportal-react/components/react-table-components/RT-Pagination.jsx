import React from "react";

export const RTPagination = (props) => {
  const {
    pageCount,
    canPreviousPage,
    previousPage,
    state,
    canNextPage,
    nextPage,
    gotoPage
    
  } = props;
  
  const getPageLinks = ()=> {
    const _pages = [];
    if (pageCount && pageCount > 0) {
      for (let i=0; i < pageCount; i++) {
        _pages.push(i);
      }
    }
    return _pages;
  }
  
  return (
    <>
      {pageCount && pageCount > 1 &&
        (<div className={"pagination-react-table user-management__pagination"}>
          <a href=""
             className={`pagination-arrow ${!canPreviousPage ? "disabled" : ""}`}
             onClick={(e) => {
               e.preventDefault();
               canPreviousPage && previousPage()
              }
             } >
            <em className="abt-icon abt-icon-left-arrow u-ltr"></em>
          </a>
          <ol>
            {getPageLinks().map((pageNum) => {
              let className = "";
              if (pageNum == state.pageIndex) {
                className += " active";
              } else if (pageNum == state.pageIndex - 1) {
                className += " active-sibling"
              }
              return (<li
                className={className}>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  (state.pageIndex !== pageNum) && gotoPage(pageNum)
                }}>{pageNum + 1}</a>
              </li>)
            })}
      
          </ol>
          <a className={`pagination-arrow ${!canNextPage ? "disabled" : ""}`}
             href="#" onClick={(e) => {
              e.preventDefault();
              canNextPage && nextPage();
            }
          } ><em className="abt-icon abt-icon-right-arrow u-rtl"></em>
          </a>
        </div>)
      }
      </>
  )
}