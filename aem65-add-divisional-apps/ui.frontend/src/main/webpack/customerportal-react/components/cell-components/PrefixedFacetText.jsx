import React from "react";
import {useSharedFilters} from "../shared/Filters";

export const PrefixedFacetText = (props) => {
  const {value,field} = props;
  const {formatPrefixedFacet} = useSharedFilters();
  const valueStr = formatPrefixedFacet(value);
  
  return (<span className={field}> {valueStr}</span>);
}