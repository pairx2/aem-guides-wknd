/**
 * Spinner component
 */
export class Spinner {
    private static spinnerOverlay: HTMLElement;
    private static count: any = 0;

    constructor() {
        let elem = document.createElement('div');
        elem.classList.add('a-spinner');
        elem.classList.add('d-none');
        elem.innerHTML = `<div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>`;
        document.body.appendChild(elem);

        Spinner.spinnerOverlay = elem;
    }

    /**
     * @function
     * @desc Method to show the Spinner
     * @param {Object} event
     */

    public static show(targetEl?: HTMLElement) {
        const styles: Array<any> = [];
        if (!targetEl) {
            styles.push('top: 0; left: 0; width: 100vw; height: 100vh;');
        } else {
            styles.push('top:' +targetEl.offsetTop + 'px')
            styles.push('left:' +targetEl.offsetLeft + 'px')
            styles.push('height:' +targetEl.offsetHeight + 'px')
            styles.push('width:' +targetEl.offsetWidth + 'px')
        }

        styles.push('z-index: 9999');

        Spinner.spinnerOverlay.setAttribute('style', styles.join(';'))
        Spinner.spinnerOverlay.classList.remove('d-none');

        Spinner.count++;
    }

    /**
     * @function
     * @desc Method to hide the Spinner
     * @param {Object} event
     */

    public static hide() {
        Spinner.count--;
        if(Spinner.count <= 0) {
            Spinner.count = 0;
            Spinner.spinnerOverlay.classList.add('d-none');
        }
    }
}

$(function () {
    new Spinner();
});

