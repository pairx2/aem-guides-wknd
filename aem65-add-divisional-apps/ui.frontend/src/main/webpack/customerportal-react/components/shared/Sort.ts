import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';

const searchSort = () => {
  const [sort, setSort] = useState({ isSearching : false, fields : {}});
  const setSearchSort = useCallback( (s) => setSort(s), []);

  return {
    sort,
    setSearchSort
  };
}

export const useSharedSort = () => useBetween(searchSort);