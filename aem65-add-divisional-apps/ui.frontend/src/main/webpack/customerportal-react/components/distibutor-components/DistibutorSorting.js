import { useState, useMemo } from "react";

const useSortableData = (products, config = null) => {
  const [sortConfig, setSortConfig] = useState({direction: "ascending",
  key: "userName"});

  const sortedItems = useMemo(() => {
    const sortedProducts = [...products];
    if (sortConfig !== null) {
      sortedProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedProducts;
  }, [products, sortConfig]);

  const requestSort = (key) => {
    console.log("key",key);
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
