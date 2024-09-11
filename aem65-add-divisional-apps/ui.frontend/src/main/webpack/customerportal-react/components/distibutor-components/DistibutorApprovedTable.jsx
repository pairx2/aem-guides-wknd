import React, { useState, useMemo, useEffect } from "react";
import useSortableData from "./DistibutorSorting";
import { DistibutorApproveTableUtilit } from "./DistibutorApproveTableUtilit";
import { DistibutorPagination } from "./DistibutorPagination";

export default ({ products, getUpdatedDataCallBack }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const { items, requestSort, sortConfig } = useSortableData(products);

  const getClassName = (name) => {
    if (sortConfig && sortConfig.key && sortConfig.direction) {
      if (sortConfig.key === name) {
        return sortConfig.direction;
        s;
      }
      return undefined;
    }
  };


  return (
    <div className="distibutor-results-approved" >
        <div className="distibutor-count">
            <p>{items.length} Results</p>
        </div>
        <table>
          <thead>
            <tr>
              <th
                onClick={() => requestSort("userName")}
                className={getClassName("userName")}
              >
                User Name
                <em class="abt-icon abt-icon abt-icon-down-arrow"></em>
                <em class="abt-icon abt-icon abt-icon-up-arrow"></em>
              </th>
              <th
                onClick={() => requestSort("companyName")}
                className={getClassName("companyName")}
              >
                Company Name
                <em class="abt-icon abt-icon abt-icon-down-arrow"></em>
                <em class="abt-icon abt-icon abt-icon-up-arrow"></em>
              </th>
              <th
                onClick={() => requestSort("distributorName")}
                className={getClassName("distributorName")}
              >
                Distributor Name
                <em class="abt-icon abt-icon abt-icon-down-arrow"></em>
                <em class="abt-icon abt-icon abt-icon-up-arrow"></em>
              </th>
              <th
                onClick={() => requestSort("userEmail")}
                className={getClassName("userEmail")}
              >
                User Email
                <em class="abt-icon abt-icon abt-icon-down-arrow"></em>
                <em class="abt-icon abt-icon abt-icon-up-arrow"></em>
              </th>
              <th
                onClick={() => requestSort("country")}
                className={getClassName("country")}
              >
                Country
                <em class="abt-icon abt-icon abt-icon-down-arrow"></em>
                <em class="abt-icon abt-icon abt-icon-up-arrow"></em>
              </th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <DistibutorApproveTableUtilit
              itemsProperty={items}
              currentPage={currentPage}
            />
          </tbody>
        </table>
        <DistibutorPagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={items.length}
          pageSize={parseInt(document.querySelector("#distibutorLength").value)}
          onPageChange={(page) => setCurrentPage(page)}
        />
    </div>
  );
};