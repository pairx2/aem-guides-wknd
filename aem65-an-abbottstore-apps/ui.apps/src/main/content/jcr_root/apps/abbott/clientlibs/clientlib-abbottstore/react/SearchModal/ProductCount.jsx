import React from "react";

const ProductCount = props => (
  <div className="popular-products">
    <span className="popular-products__list">Products</span>
    <a className="popular-products__categories" href={`/search.html?q=${props.term}`}>
      <span className="popular-products__categories--all">See All</span>
      <span className="popular-products__categories-all">
        {props.totalCount}
      </span>
    </a>
  </div>
);

export default ProductCount;
