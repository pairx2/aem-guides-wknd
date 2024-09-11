class ProductsCompare {
    private productCompareTableRow: NodeListOf<HTMLElement>;
    private container: HTMLElement;
    constructor(ele: HTMLElement) {
        this.container = ele;

        this.productCompareTableRow = this.container.querySelectorAll('.o-products-compare-data-col');
        setTimeout(function() {
            this.productCompareHeight();
        }.bind(this), 500);
       


    }

    public productCompareHeight() {
        this.productCompareTableRow.forEach(function (item: any) {
            const fixedColHeight = item.querySelector('td')?.offsetHeight;
            item.querySelector('th').height = fixedColHeight; 
        })
    }

}




$(document).ready(function () {
    const allAccordion = document.querySelectorAll('[data-js-component="products-compare"]');
    allAccordion.forEach((ele) => {
        new ProductsCompare(ele as HTMLElement);
    });
});