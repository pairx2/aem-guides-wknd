import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';

const searchFacet = () => {
  const [facets, setFacet] = useState({
    isSearching : false,
    currentFacets: []
  });

  const setSearchFacet = useCallback( (f) =>{
      setFacet(f);
  },  []);

  return {
    facets,
    setSearchFacet
  };
}

export const useSharedFacet = () => useBetween(searchFacet);