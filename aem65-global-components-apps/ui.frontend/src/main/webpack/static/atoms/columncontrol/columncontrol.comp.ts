class ColumnControl {

    constructor(columnsContainer: HTMLElement) {
        this.hideEmptyColumns(columnsContainer);
    }

    // Hide Empty Columns on mobile.
    private hideEmptyColumns(columnWrapper: HTMLElement) {
        columnWrapper.querySelectorAll('.columncontrol__column').forEach(function (column) {
            if (!column.children.length) {
                column.classList.add('d-none', 'd-md-block');
            }
        });
    }
}

$(function () {
    document.querySelectorAll('.column-empty-mobile--hide').forEach(function (ele) {
        new ColumnControl(ele as HTMLElement);
    })
})