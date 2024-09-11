import React, { useRef, useEffect, useState } from "react";
import DistibutorTable from "./DistibutorTable";
import { useSharedDistibutor } from "../shared/Distibutor";
import { distibutorService } from "../services/DistibutorService";
import { DistibutorAccordionWithCheckBox } from "./DistibutorAccordionWithCheckBox";

export const Distibutor = () => {
  const {
    distibutor,
    isLoading,
    isLoaded,
  } = useSharedDistibutor();
  const { getdistibutor } = distibutorService();
  useEffect(() => {
    getdistibutor();
  }, []);


  return (
    <>
    <div className="distibutor" >
      <div className={"distibutor-results-table"}>
        <DistibutorTable products={distibutor}  />
      </div>
      {isLoading ? (
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
