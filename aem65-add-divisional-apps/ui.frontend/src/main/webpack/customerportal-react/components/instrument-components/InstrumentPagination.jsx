import React from "react";

// This component is almost identitcal to the RTPagination compoonent, save that it doesn't take a state object as a parameter since instruments do not use react-table. 

export const InstrumentPagination = (props) => {
  const {
    pageCount,
    canPreviousPage,
    previousPage,
    currentPage,
    canNextPage,
    nextPage,
    goToPage
    
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
              if (pageNum == currentPage) {
                className += " active";
              } else if (pageNum == currentPage - 1) {
                className += " active-sibling"
              }
              return (<li
                className={className}>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  (currentPage !== pageNum) && goToPage(pageNum)
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