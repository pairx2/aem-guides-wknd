import React from 'react';
import Product from '../Product/index.jsx';

const ProductList = (props) => {
    return (
        <div className="row products__list">
            {props.products.map((product, index) => 
            <Product key={product.id} index={index} product={product}  labels={props.labels} subscription={props.subscription} onBtnClick={(e, product)=> props.onBtnClick(e, product)} 
            setLocalStorageFilters = {()=> props.setLocalStorageFilters()} skuFindRetailer={props.skuFindRetailer}  />)
            }
        </div>
    )
}

export default ProductList;