export const PRODUCT_TYPE = {
    SENSOR: 'SENSOR',
    READER: 'READER',
    SUBSCRIPTION: 'subscription'
};

export const getReaderOptions = ({productPageModel, productPrices}) => {
    let options = [];
    productPageModel?.productList?.forEach((val, index) => {
            let uom = productPrices[productPageModel.productList[index].sku]?.uom;
            options.push({
                value: productPageModel.productList[index].sku,
                label: 'measurement_'.concat(uom)
            })
        });
    return options;
};
