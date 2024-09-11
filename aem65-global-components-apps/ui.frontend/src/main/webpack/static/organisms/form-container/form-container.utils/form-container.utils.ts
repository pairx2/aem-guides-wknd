//
declare var window: any;

//
export class FormUtils {
    public isUtilInitialized: boolean;

    constructor () {
        this.isUtilInitialized = true;
    }

    /**
     * @method
     * @desc finds out if element is supposed to be part of the Request's header
     * @param { HTMLInputElement } inputField Hidden Input Field reference
     * @return { boolean } isHeaderField
     */
    public isHeaderField(inputField: HTMLInputElement): boolean {
        const dataset = inputField.dataset;
        const isHeader = dataset && dataset.request === 'header';

        // if no dataset found, can not be part of the header
        if(!dataset) {
            return false;
        } else {
            return isHeader;
        }
    }
}
