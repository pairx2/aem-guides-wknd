import React, { useRef, useEffect, useState } from "react";
import DistibutorApprovedTable from "./DistibutorApprovedTable";
import { useSharedDistibutor } from "../shared/Distibutor";
import { distibutorService } from "../services/DistibutorService";
import { DistibutorAccordionWithCheckBox } from "./DistibutorAccordionWithCheckBox";

export const DistibutorApprove = () => {
  const { distibutorApproveData, isLoadedApproveData, isLoadingApproveData } =
    useSharedDistibutor();
  const { getdistibutorApproved } = distibutorService();
  const [filterFacts, setFilterFacts] = useState([]);
  const [approveTableData, setApproveTableData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [loadedTableSort, setLoadedTableSort] = useState(false);

  useEffect(() => {
    getdistibutorApproved(successCallBackOption);
  }, []);

  const successCallBackOption = (data) => {
    setApproveTableData(data);

    const distibutorFilterComapny = [
      ...new Set(data.map((item) => item.companyName)),
    ];
    var distCompany = [];
    if (distibutorFilterComapny.length != 0) {
      for (let i in distibutorFilterComapny) {
        var obj = {
          value: distibutorFilterComapny[i],
          state: "idle",
          facetIndex: i + 1,
          valueIndex: i + 1,
          distibutor: "company",
        };
        distCompany.push(obj);
      }
    }

    const distibutorFilterDistibutorName = [
      ...new Set(data.map((item) => item.distributorName)),
    ];
    var distributorName = [];
    if (distibutorFilterDistibutorName.length != 0) {
      for (let i in distibutorFilterDistibutorName) {
        var obj = {
          value: distibutorFilterDistibutorName[i],
          state: "idle",
          facetIndex: i + 1,
          valueIndex: i + 1,
          distibutor: "distributorName",
        };
        distributorName.push(obj);
      }
    }

    const distibutorFilterCountry = [
      ...new Set(data.map((item) => item.country)),
    ];
    var distCountry = [];
    if (distibutorFilterCountry.length != 0) {
      for (let i in distibutorFilterCountry) {
        if (distibutorFilterCountry[i] != undefined) {
          var obj = {
            value: distibutorFilterCountry[i],
            state: "idle",
            facetIndex: i + 1,
            valueIndex: i + 1,
            distibutor: "country",
          };
          distCountry.push(obj);
        }
      }
    }

    var filterArray = [
      {
        facetId: "company",
        field: "company",
        name: "Company Name",
        moreValuesAvailable: false,
        values: distCompany,
      },
      {
        facetId: "distributorName",
        field: "distributorName",
        name: "Distributor Name",
        moreValuesAvailable: false,
        values: distributorName,
      },
      {
        facetId: "Country",
        field: "country",
        name: "Country",
        moreValuesAvailable: false,
        values: distCountry,
      },
    ];
    setFilterFacts(filterArray);
  };

  const onChangeChechedCallBack = (checkedData) => {
    setLoadedTableSort(true);
    var filterFactsData = filterFacts;
    var filterTile = filterFactsData.filter(
      (x) => x.field === checkedData.distibutor
    );
    var filterTitleIndex = filterFactsData.findIndex(
      (obj) => obj.field === checkedData.distibutor
    );

    var filterData = filterTile[0].values;
    var objectIndex = filterData.findIndex(
      (y) => y.valueIndex === checkedData.valueIndex
    );

    if (filterData[objectIndex].state == "selected") {
      filterData[objectIndex].state = "idle";
    } else {
      filterData[objectIndex].state = "selected";
    }

    filterFactsData[filterTitleIndex] = filterTile[0];
    setFilterFacts(filterFactsData);

    var filterSelected = [];
    for (let j in filterFacts) {
      var filterValues = filterFacts[j].values;
      for (let k in filterValues) {
        if (filterValues[k].state == "selected") {
          if (filterValues[k].distibutor == "country") {
            var obj = {
              country: filterValues[k].value,
            };
            filterSelected.push(obj);
          } else if (filterValues[k].distibutor == "company") {
            var obj = {
              companyName: filterValues[k].value,
            };
            filterSelected.push(obj);
          } else if (filterValues[k].distibutor == "distributorName") {
            var obj = {
              distributorName: filterValues[k].value,
            };
            filterSelected.push(obj);
          }
        }
      }
    }

    if (filterSelected.length != 0) {
      let res = (res = distibutorApproveData.filter((row) => {
        for (const obj of filterSelected) {
          if (Object.keys(obj).every((k) => obj[k] == row[k])) {
            return row;
          }
        }
      }));
      setApproveTableData(res);
    } else {
      setApproveTableData(distibutorApproveData);
    }

    setTimeout(() => {
      setLoadedTableSort(false);
    }, 200);
  };

  return (
    <>
      <div className="distibutor">
        <div className={"distibutor-results-table"}>
          <div className="distibutor-approval-table">
            <div className="distibutor__option">
              {filterFacts.map((data, key) => {
                return (
                  <DistibutorAccordionWithCheckBox
                    onChangeCheched={(checkedFact) => {
                      onChangeChechedCallBack(checkedFact);
                    }}
                    data={data}
                    indexOfKey={key}
                  />
                );
              })}
            </div>
            {loadedTableSort ? (
              <div></div>
            ) : (
              <DistibutorApprovedTable products={approveTableData} />
            )}
          </div>
        </div>
        {isLoadingApproveData ? (
          <div class="a-spinner">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
