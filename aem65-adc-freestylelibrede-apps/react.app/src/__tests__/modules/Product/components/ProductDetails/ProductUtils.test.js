import '@testing-library/jest-dom/extend-expect';
import {getReaderOptions} from '../../../../../modules/Product/components/ProductDetails/ProductUtils';

describe('getReaderOptions with productPagemodel & productPrices', () => {
    const productPageModel = {
        productList: [
            { sku: 'sku1' },
            { sku: 'sku2' }
        ]
    };
 
    const productPrices = {
        sku1: { uom: 'kg' },
        sku2: { uom: 'm' }
    };
 
    it('should return an array of options with correct values and labels', () => {
        const expectedOptions = [
            { value: 'sku1', label: 'measurement_kg' },
            { value: 'sku2', label: 'measurement_m' }
        ];
        expect(getReaderOptions({ productPageModel, productPrices })).toEqual(expectedOptions);
    });
 
    it('should handle empty productPageModel', () => {
        const emptyProductPageModel = { productList: [] };
        expect(getReaderOptions({ productPageModel: emptyProductPageModel, productPrices })).toEqual([]);
    });
 
    it('should handle missing productPrices for a SKU', () => {
        const incompleteProductPrices = { sku1: { uom: 'kg' } };
        const expectedOptions = [
            { value: 'sku1', label: 'measurement_kg' },
            { value: 'sku2', label: 'measurement_undefined' }
        ];
        expect(getReaderOptions({ productPageModel, productPrices: incompleteProductPrices })).toEqual(expectedOptions);
    });
});

describe('getReaderOptions', () => {
 it('should return an empty array for missing options', () => {
    expect(getReaderOptions({ productPageModel: undefined }, {productPrices: "sd"})).toEqual([]);
    expect(getReaderOptions({ productPageModel: {} }, { productPrices: {} })).toEqual([]);
    expect(getReaderOptions({ productPageModel: {} }, { productPrices: undefined})).toEqual([]);
    expect(getReaderOptions({ productPageModel: {} }, {productPrices: {}})).toEqual([]);
    });
});