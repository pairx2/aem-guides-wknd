import React from 'react';
import Product from './Product.jsx';

const ProductList = (props) => {
    return (
        <section className="row g-0 search-page-product__list">
            {props.products.map((product, index) => <Product key={index} product={product} labels={props.labels} index={index} />)}
        </section>
    )
}

export default ProductList;