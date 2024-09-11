import 'bootstrap';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4';
import { Common } from '../../common';
/**
 * @function
 * @desc class for the data table variation component
 */

declare var window: any;

(function () {
    'use-strict';

    class CustomTable {
        private parentElement: HTMLElement;
        private tableElement: HTMLElement;
        private customTableId: string;
        private callbackList: any = {};
        public columns: any = [];
        public thLength: any = 0;
        private apiUrl: string = null;
        private dataSet: any = null;
        private apiResponse: {
            errorCode: number,
            requestId: string,
            response: Object,
            status: Boolean,
        };
        private pageLength: any = 0;
        private noResultTxt: string = null;
        private paginationStatus: any;
        private isPreviewMode: any;
        private colmnKeyErrTxt: any;
        private showTxt: any;
        private perPageTxt: any;
        private damData: any;
        private dataSourceType: any;
        private filterColumns: Array<Number> = [];
        private hideColumnIndex: Array<Number> = [];
        private rangeInputs: JQuery<HTMLElement>;
        private rangeInputElements: JQuery<HTMLElement>;
        private rangeDateElements: JQuery<HTMLElement>;
        private resetButton: HTMLElement;
        private dataTable: any;
        private eslDataMethodAction: string;
        private bulkSelect: string;
        private sortStatus: any;

        constructor(ele: HTMLElement) {
            this.parentElement = ele;
            this.customTableId = ele.getAttribute('id');
            this.getDOMElementVal();
            this.tableElement = ele.querySelector('table');
            this.getColumnNames();
            this.damData = this.parentElement.querySelector('input[name="jsonDataSource"]');
            this.dataSourceType = this.parentElement.querySelector('input[name="dataSourceType"]');
            this.initCallbackBucket();

            if (this.isPreviewMode === 'false') {
                if (this.dataSourceType?.value == 'jsonDataSource') {
                    this.buildTableJsonData();
                }
                else if (this.dataSourceType?.value == 'eslDataSource') {
                    this.fetchTableEslData();
                }
                this.parentElement.querySelector('.edit-row-pop-up') && this.parentElement.querySelector('.edit-row-pop-up').setAttribute('style', 'display:none');
                this.parentElement.querySelector('.delete-row-pop-up') && this.parentElement.querySelector('.delete-row-pop-up').setAttribute('style', 'display:none');
            } else {
                this.parentElement.querySelector('.edit-row-pop-up') && this.parentElement.querySelector('.edit-row-pop-up').removeAttribute('style');
                this.parentElement.querySelector('.delete-row-pop-up') && this.parentElement.querySelector('.delete-row-pop-up').removeAttribute('style');
            }

            if (this.parentElement.querySelector('.m-custom-table__header .row').children.length == 0) {
                this.parentElement.querySelector('.m-custom-table__header').setAttribute('style', 'display:none');
            }
        }

        private initCallbackBucket() {
            // Add customTableCallbacks container to public namespace
            window.customTableCallbacks = window.customTableCallbacks || {};

            // Table ID
            const tableId = this.customTableId;
            const updateCreatedRowFuncName = this.parentElement.querySelector('input[name="updateCreatedRow"]').getAttribute('value');
            const updateRequestFuncName = this.parentElement.querySelector('input[name="updateRequest"]').getAttribute('value');
            const updateResponseFuncName = this.parentElement.querySelector('input[name="updateResponse"]').getAttribute('value');

            if (!tableId) {
                return;
            }

            if (!window.customTableCallbacks[tableId]) {
                window.customTableCallbacks[tableId] = {};
            }

            const callbackList = window.customTableCallbacks[tableId];

            callbackList.updateCreatedRow = updateCreatedRowFuncName;
            callbackList.updateRequest = updateRequestFuncName;
            callbackList.updateResponse = updateResponseFuncName;

            this.setCallbackBucket(this.customTableId);
        }

        private getDOMElementVal() {
            this.parentElement.classList.add('m-custom-table__content--loading');
            this.isPreviewMode = document.querySelector<HTMLInputElement>('[name="wcmMode"]').value;
            this.pageLength = this.parentElement.querySelector<HTMLInputElement>('[name="tableRowCount"]').value;
            this.apiUrl = this.parentElement.querySelector<HTMLInputElement>('[name="eslDataSource"]').value;
            this.eslDataMethodAction = this.parentElement.querySelector<HTMLInputElement>('[name="eslDataSourceMethodAction"]').value;
            this.noResultTxt = this.parentElement.querySelector<HTMLInputElement>('[name="noResultsFoundText"]').value;
            this.paginationStatus = this.parentElement.querySelector<HTMLInputElement>('[name="paginationEnabled"]').value;
            this.colmnKeyErrTxt = this.parentElement.querySelector<HTMLInputElement>('[name="columnKeyErrText"]').value;
            this.showTxt = this.parentElement.querySelector<HTMLInputElement>('[name="showText"]').value;
            this.perPageTxt = this.parentElement.querySelector<HTMLInputElement>('[name="perPageText"]').value;
            this.rangeInputs = $(this.parentElement).find('.m-custom-table__header .m-custom-table_drop-down__range');
            this.rangeInputs.children('.m-custom-table_drop-down__range--modal').addClass('d-none'); // Hide the range modals
            this.sortStatus = (this.parentElement.querySelector<HTMLInputElement>('[name="disableDefaultSorting"]').value == "true") ? "false" : "true";
            this.parentElement.querySelectorAll<HTMLElement>('.m-custom-table table thead th').forEach((item: HTMLElement, index: Number) => {
                if (item.getAttribute('data-filter-required') == 'true' && ["false", null].includes(item.getAttribute('data-range-required')))
                    this.filterColumns.push(index);
                const colVisibility: string = item.getAttribute('data-visibility');
                if (colVisibility && !JSON.parse(colVisibility)) {
                    this.hideColumnIndex.push(index);
                }
            });
            this.resetButton = this.parentElement.querySelector<HTMLElement>('.m-custom-table__header-btn-reset a');
            this.pageLength = (this.pageLength?.length && Number(this.pageLength) > 0) ? this.pageLength : 12;
            this.bulkSelect = this.parentElement.querySelector<HTMLInputElement>('[name="enableBulkSelect"]').value;
        }

        // Get column name from DOM elements

        private getColumnNames() {
            let cols = [];
            var $ele = this.parentElement;
            const $editIconEle = $ele.querySelector('.edit-row-pop-up');
            const $deleteIconEle = $ele.querySelector('.delete-row-pop-up');
            let tblIcons = function (data, type, row) {
                let editIconHtml = $editIconEle ? $editIconEle.innerHTML : '';
                let deleteIconHtml = $deleteIconEle ? $deleteIconEle.innerHTML : '';
                let editIc = editIconHtml.trim();
                let deleteIc = deleteIconHtml.trim();
                if (type === 'display') {
                    return editIc + deleteIc;
                }
                $(row).addClass('m-customtable__table-row');
                return data;
            };

            let $thLength = this.tableElement.querySelectorAll('th').length - 1;
            this.tableElement.querySelectorAll('th').forEach(function (el, i) {
                let obj = new Object();
                obj['data'] = el.getAttribute('data-name');
                if (i === $thLength) {
                    if ($editIconEle || $deleteIconEle) {
                        obj['render'] = tblIcons;
                    }
                }
                cols.push(obj);
            });
            this.columns = cols;
        }

        /**
         * @function
         * @desc fetches callbacks for the current form instance from the callback-bucket
         * @param {String} tableId form ID
         */
        public setCallbackBucket(tableId: string) {

            // if tableId not given, do nothing
            if (!tableId) {
                return;
            }

            const callbackBucket = window.customTableCallbacks;
            this.callbackList = callbackBucket[tableId];
        }

        private setRowSpecificData() {
            var table = $(this.tableElement).DataTable();
            $(this.tableElement).on('click', '.a-link__text', function () {
                sessionStorage.setItem('rowData', JSON.stringify(table.row(this.closest('tr')).data()));
            });
        }

        //Crete Datatable with configurations

        private createCustomTable(ele) {
            let _this = this;
            $.fn.dataTable.ext.errMode = 'none';
            $(ele).on('error.dt', function (e, settings, techNote, message) {
              console.log("Exception in column value:::"+message);

            });

          let columnDefs: any = [
            {
              targets: '_all',
              className: 'm-customtable__table-col-data',
            },
          ];

          if (this.bulkSelect === 'true') {
            columnDefs.push({
              targets: [0],
              className: 'select-checkbox',
              orderable: false
            });
          }

            this.dataTable = $(ele).DataTable({
                "data": this.dataSet,
                "searching": true,
                "responsive": true,
                "paging": JSON.parse(this.paginationStatus),
                "info": JSON.parse(this.paginationStatus),
                "columns": this.columns,
                "ordering": JSON.parse(this.sortStatus),
                columnDefs,
                select: {
                  style: "multi",
                  selector: "td:first-child",
                },
                "dom": '<"center">rt<"bottom"lp>',
                initComplete: function() {
                    let _this_1 = this;
                    _this.initHeaderFilters(_this_1);
                },
                createdRow: function (row, data, index) {
                    const resData = _this.apiResponse ? _this.apiResponse.response : _this.dataSet;
                    const combinedRowData = { row, data, index, resData };
                    Common.callbackFuncExec(combinedRowData, _this.callbackList.updateCreatedRow);
                },
                pageLength: Number(this.pageLength),
                language: {
                    paginate: {
                        previous: "<em class='abt-icon abt-icon-left-arrow u-ltr'></em>",
                        next: "<em class='abt-icon abt-icon-right-arrow u-ltr'></em>"
                    },
                    lengthMenu: this.showTxt + ' <select>' +
                        `<option value="${this.pageLength}">${this.pageLength}</option>` +
                        `<option value="${this.pageLength * 2}">${this.pageLength * 2}</option>` +
                        `<option value="${this.pageLength * 3}">${this.pageLength * 3}</option>` +
                        `<option value="${this.pageLength * 4}">${this.pageLength * 4}</option>` +
                        '</select> ' + this.perPageTxt,
                    zeroRecords: this.noResultTxt
                }
            });
            this.setRowSpecificData();
            this.initReset();
            // Custom search functionality
            const searchBox = this.parentElement.querySelector('[name="search-input"]') as HTMLInputElement;
            searchBox?.addEventListener('keyup', function (this: HTMLInputElement, ev: Event) {
                // dataTable.column(0).search(this.value).draw();
                _this.dataTable.search(this.value).draw();
            });

          $('#selectedRowCallbackBtn') &&
            $('#selectedRowCallbackBtn').on(
              'click',
              function () {
                let selectedRows = this.rows({ selected: true }).data();
                if (!selectedRows.length) return;
                // areRowSelected is set to true to Execute a updateCreatedRow callback function to return all the Selected Rows id
                Common.callbackFuncExec({ selectedRows, areRowSelected: true }, _this.callbackList.updateCreatedRow);
              }.bind(this.dataTable)
            );

          $('#selectAllRowCheckbox') &&
            $('#selectAllRowCheckbox').on(
              'change',
              function (e) {
                if (e.currentTarget.checked) {
                  this.rows().select();
                } else {
                  this.rows().deselect();
                }
              }.bind(this.dataTable)
            );

          // function to trigger different types of checkbox
          this.dataTable.on('select deselect', function () {
              let SelectedRowCount = this.rows({ selected: true }).nodes().length;
              const totalRowsCount = this.rows().count();
              if (SelectedRowCount >= 1) {
                $('#selectAllRowCheckbox').prop('checked', true);
                $('#selectedRowCallbackBtn').addClass('active')
                // if all the rows are selected, mark the header checkbox with tick option
                if (totalRowsCount === SelectedRowCount) {
                  $('#selectAllRowCheckbox').parent().addClass('a-checkbox--indeterminate');
                  $('#selectAllRowCheckbox').parent().removeClass('a-checkbox--indeterminate-few');
                }
                // if some rows are selected, mark the header checkbox with indeterminate (-) option
                else {
                  $('#selectAllRowCheckbox').parent().addClass('a-checkbox--indeterminate a-checkbox--indeterminate-few');
                }
              } else {
                $('#selectAllRowCheckbox').prop('checked', false);
                $('#selectedRowCallbackBtn').removeClass('active')
                $('#selectAllRowCheckbox').parent().removeClass(['a-checkbox--indeterminate','a-checkbox--indeterminate-few']);
              }
            }.bind(this.dataTable)
          );
        }

        /* Function to update attritubes based on addition parameter passed. Suitable for cloned components to maintain unique attributes */
        private attributeUpdater(ele: JQuery<HTMLElement>, updateSet: string[], addition: number, placeholder: string) {
            if (ele.length && updateSet.length) {
                for (let attribute of updateSet) {
                    ele.find(`[${attribute}*="${placeholder}"]`).each(function() {
                        $(this).attr(attribute, $(this).attr(attribute).replace(new RegExp(placeholder, 'g'), `${placeholder}_${addition}`));
                    });
                }
            }
        }

        /* Function to apply dynamic dropdown filters to columns and hide columns based on authoring selections */
        private initHeaderFilters(dataTableThis: any): void {
            let _this = this;
            /* Apply filter to the columns that has dropdown filter checkbox checked */
            this.filterColumns.forEach((col: number) => {
                let customDropdown = $(this.parentElement).find(`.m-custom-table_drop-down__filter--col-${col} .a-dropdown__menu`);
                let customDropdownEle = customDropdown.parents('.options');
                this.attributeUpdater(customDropdownEle, ['id', 'for', 'aria-labelledby'], col, 'dropdownId');

                dataTableThis.api().columns(col).every(function () {
                    var column = this;
                    customDropdown.on('click keydown keyup', function () {
                        setTimeout(() => {
                            var val = $.fn.dataTable.util.escapeRegex(<string>$(this).find('.selected')?.attr('data-optionvalue'));
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        }, 200);
                    });
                    column.data().unique().sort().each(function (d: string, j: number) {
                        d !== null && ('' + d).length && customDropdown.append(
                            `<li id="${customDropdown.attr('aria-labelledby')}_${j + 2}" data-optionvalue="${d}">
                                <span class= "a-dropdown__option-text">${d}</span>
                            </li>`
                        );
                    });
                    let filterAllLabel = $(customDropdown).parents('.m-custom-table').find('.m-custom-table__table thead th')[col];
                    if (filterAllLabel) {
                        let firstDropdownLi: JQuery<HTMLLIElement> = customDropdown.find('li').eq(0)
                        firstDropdownLi
                            .attr('data-optionvalue', '')
                            .attr('aria-selected', 'true')
                            .addClass('selected selectedColor')
                            .children().text(filterAllLabel.getAttribute('data-filter-all-text'));
                        firstDropdownLi.parent().attr('aria-activedescendant', firstDropdownLi.attr('id'));
                        firstDropdownLi
                            .parents('.a-dropdown__field')
                            .find('.a-dropdown__placeholder')
                            .removeClass('a-dropdown__placeholder')
                            .addClass('a-dropdown-selected')
                            .text(filterAllLabel.getAttribute('data-filter-all-text'));
                    }
                });
            });

            /* Hide columns that has hide column checked */
            this.hideColumnIndex.forEach((col: number) => {
                dataTableThis.api().columns(col).visible(false);
            });

            /* Initialize Range filter */
            let rangeInputsEle = this.rangeInputs;
            this.rangeInputElements = $(this.parentElement).find('.m-custom-table__header .m-custom-table_drop-down__range:has(input:not([type="date"],[class*="date"]))');
            this.rangeDateElements = $(this.parentElement).find('.m-custom-table__header .m-custom-table_drop-down__range:has(input[type="date"], .a-date-picker input[class*="date-picker"])');

            /* Open Range modal on click/Enter on Range label and close on enter/tab/esc */
            rangeInputsEle.on('click keyup', '.m-custom-table_drop-down__range--label', function (e: JQuery.Event & { target: HTMLElement }) {
                e.stopPropagation();
                if (e?.type == 'click' || e?.which == 13) {
                    if (!$(e.target).parent().children('.m-custom-table_drop-down__range--modal').hasClass('d-none')) {
                        $(this).next().toggleClass('d-none');
                    } else {
                        rangeInputsEle.length > 1 && rangeInputsEle.children('.m-custom-table_drop-down__range--modal').addClass('d-none');
                        $(this).next().toggleClass('d-none');
                    }
                }

                if (e?.which == 27 || e?.which == 9) {
                    $(this).next().addClass('d-none');
                }
            });

            /* Code to close the modal on click of link within modal */
            rangeInputsEle.find('.a-link a').attr('href', 'javascript:void(0)');
            rangeInputsEle.on('click', '.a-link a', function () {
                $(this).parents('.m-custom-table_drop-down__range--modal').addClass('d-none');
                _this.generateRangeLabel($(this).parents('.m-custom-table_drop-down__range'));
            });

            /* Prevent Range modal from closing when clicked inside the modal */
            rangeInputsEle.on('click', '.m-custom-table_drop-down__range--modal', function (e: JQuery.Event) {
                e.stopPropagation();
            });

            /* Close Range modal on click of somewhere on the page other than Range modal and date picker */
            $(document).on("click", () => {
                rangeInputsEle.each(function () {
                    let rangeModal: JQuery<HTMLElement> = $(this).find('.m-custom-table_drop-down__range--modal');
                    let datePickerActive: JQuery<HTMLElement> = $(this).find('.a-input-grp');
                    if (!rangeModal.hasClass('d-none') && !datePickerActive.hasClass('active') && ($('.litepicker').css('display') == 'none')) {
                        rangeModal.addClass('d-none');
                        _this.generateRangeLabel($(this));
                    }
                });
            });

            rangeInputsEle.find('input').on('keyup input', function () {
                _this.dataTable.draw();
            });

            /* Code that gets exectued when some value is entered/selected in filters on table header */
            $.fn.dataTable.ext.search.push(
                function (settings: object, data: object, dataIndex: number) {

                    let searchFlag = false;
                    let withinNumbers = true, withinDates = true;

                    /* Filtering each row based on numeric range inputs */
                    this.rangeInputElements.length && this.rangeInputElements.each(function () {
                        let minRange: number = parseFloat(<string>$(this).find('input[name="min-range"]').val());
                        let maxRange: number = parseFloat(<string>$(this).find('input[name="max-range"]').val());
                        let rangeCol: number = +$(this)
                            .attr('class')
                            .split(' ')
                            .find(ele => ele.indexOf('m-custom-table_drop-down__range--col-') > -1)
                            .replace('m-custom-table_drop-down__range--col-', '');
                        let colData: number = parseFloat(data[rangeCol]) || 0;

                        withinNumbers = withinNumbers && (
                            (isNaN(minRange) && isNaN(maxRange)) ||
                            (isNaN(minRange) && colData <= maxRange) ||
                            (minRange <= colData && isNaN(maxRange)) ||
                            (minRange <= colData && colData <= maxRange)
                        );
                    });

                    /* Filtering each row based on date range inputs */
                    this.rangeDateElements.length && this.rangeDateElements.each(function () {
                        let minDate: Date | string = <string>$(this).find('input[name="min-range"]').val();
                        let maxDate: Date | string = <string>$(this).find('input[name="max-range"]').val();
                        minDate = minDate.length ? new Date(minDate) : '';
                        maxDate = maxDate.length ? new Date(maxDate) : '';
                        let rangeCol: number = +$(this)
                            .attr('class')
                            .split(' ')
                            .find(ele => ele.indexOf('m-custom-table_drop-down__range--col-') > -1)
                            .replace('m-custom-table_drop-down__range--col-', '');
                        let colDate: Date | string = new Date(data[rangeCol]) || '';
                        withinDates = withinDates && (
                            (minDate === '' && maxDate === '') ||
                            (minDate === '' && colDate <= maxDate) ||
                            (minDate <= colDate && maxDate === '') ||
                            (minDate <= colDate && colDate <= maxDate)
                        );
                    });

                    /* Show only the row which satisfies numeric and date ranges */
                    if (withinNumbers && withinDates) {
                        searchFlag = true;
                    }
                    return searchFlag;
                }.bind(this)
            );
        }

        private initReset(): void {

            let _this = this;
            let rangeInputEle = this.rangeInputElements;
            let rangeDateEle = this.rangeDateElements;

            $(_this.resetButton).attr('disabled', 'disabled').addClass('disabled');

            _this.rangeInputs.find('input').on('keyup input', function () {
                _this.toggleReset();
            });

            $(_this.parentElement).find('[name="search-input"]').on('keyup input', function () {
                _this.toggleReset();
            });

            $(_this.parentElement).find('.options .a-dropdown__field li').on('keyup click', function () {
                setTimeout(function() {
                    _this.toggleReset();
                }, 200);
            });

            _this.resetButton?.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
                e.preventDefault();
                const searchBox = $(this).parents('.m-custom-table__header').find('[name="search-input"]') as JQuery<HTMLElement>;
                const dropdownFilters = $(this).parents('.m-custom-table__header').find('.m-custom-table_drop-down__filter') as JQuery<HTMLElement>;
                searchBox.val('');
                dropdownFilters.each(function () {
                    $(this).find('li').eq(0).trigger('click');
                });
                rangeInputEle.length && rangeInputEle.find('input').val('');
                rangeDateEle.length && rangeDateEle.find('input').val('').parents('.input-group.a-input-grp')?.removeClass('selected');
                _this.rangeInputs.each(function () {
                    _this.generateRangeLabel($(this));
                });
                $(this).trigger('focus');
                _this.dataTable.search('').columns().search('').draw();
                $(this).attr('disabled', 'disabled').addClass('disabled');
            });
        }

        private getRequestBody(): any {
            let body: any = {};
            body = Common.getPageParamsForBodyConfig();
            return JSON.stringify(body);
        }

        private getHeaders(): any {
            let header: any = {}
            header = Common.getPageParamsForHeader();
            header['Content-Type'] = 'application/json';
            // Add token if available
            let token;
            if (sessionStorage.getItem('id.token') || localStorage.getItem('id.token')) {
                token = sessionStorage.getItem('id.token') || localStorage.getItem('id.token');
            } else if (Common.getCookie('id.token')) {
                token = Common.getCookie('id.token');
            }

            if (token) {
                header['x-id-token'] = token;
            }

            return header;
        }

        // Fetch User Permission list data
        private fetchTableEslData() {
            let customTableData: any = {
                queryParam: '',
                headers: this.getHeaders(),
                body: {}
            };
            let _this = this;
            const additionalElem = document.querySelectorAll('[type="hidden"][id="additional-body-param"]');
            if (JSON.parse(this.getRequestBody()).ACTION) {
                customTableData.body['action'] = JSON.parse(this.getRequestBody()).ACTION;
            }
            if (additionalElem.length > 0) {
                additionalElem.forEach((additionalElem: HTMLInputElement) => {
                    customTableData.body[additionalElem.name] = additionalElem.value;
                });
            }

            let newData: any = Common.callbackFuncExec(customTableData, _this.callbackList.updateRequest);

            let fetchOptions:any = {
                method: this.eslDataMethodAction,
                mode: "cors",
                cache: "no-cache",
                headers: newData.headers,
                body: JSON.stringify(newData.body)
            }

            const endUrl: any = JSON.parse(this.getRequestBody()).API_BASE + this.apiUrl;
            let fullEndPointUrl: any = endUrl;
            let urlParm: string = (newData.queryParam).length > 0 ? JSON.stringify(newData.queryParam) : '';
            if (this.eslDataMethodAction == "POST") {
                if (urlParm !== '') {
                    fullEndPointUrl = endUrl + "?" + urlParm;
                }
            } else if (this.eslDataMethodAction == "GET") {
                delete fetchOptions.body;
                let timestamp = new Date().valueOf();
                fullEndPointUrl = endUrl + "?q=" + timestamp;
                if (urlParm !== '') {
                    fullEndPointUrl = endUrl + "?q=" + timestamp + "&" + urlParm;
                }
            }

            fetch(fullEndPointUrl, fetchOptions)
            .then((resp) => resp.json())
            .then(function (data: any) {
                this.apiResponse = data; // Complete response data stored in a variable
                this.dataSet = _this.findArrayInResponse(data.response); // Response data endpoint used to build table
                Common.callbackFuncExec(this.dataSet, _this.callbackList.updateResponse);
                this.createCustomTable(this.tableElement);
            }.bind(this))
            .then(() => {
                this.parentElement.classList.remove('m-custom-table__content--loading');
                (this.apiResponse.errorCode == 0) ? this.parentElement.classList.add('m-custom-table__content--complete') : this.parentElement.classList.add('m-custom-table__content--error');
            })
            .catch((err) => {
                this.parentElement.classList.remove('m-custom-table__content--loading');
                this.parentElement.classList.add('m-custom-table__content--error');
            });
        }
      
        private buildTableJsonData() {
            fetch(this.damData.value)           //api for the get request
                .then(response => response.json())
                .then((resData) => {
                    this.dataSet = resData;
                    Common.callbackFuncExec(this.dataSet, this.callbackList.updateResponse);
                    this.createCustomTable(this.tableElement);
                })
                .then(() => {
                    this.parentElement.classList.remove('m-custom-table__content--loading');
                    this.parentElement.classList.add('m-custom-table__content--complete');
                })
                .catch(() => {
                    this.parentElement.classList.remove('m-custom-table__content--loading');
                    this.parentElement.classList.add('m-custom-table__content--error');
                });
        }

        /* Function to search through response object of API and select first non empty array occurance from response */
        private findArrayInResponse(res: object) {
            if (Array.isArray(res) && res.length) return res;
            for (const [key, value] of Object.entries(res)) {
                if (Array.isArray(res[key]) && res[key].length) {
                    return res[key];
                }
                if (!Array.isArray(res[key]) && typeof res[key] == 'object') {
                    return this.findArrayInResponse(res[key]);
                }
            }
        }

        private generateRangeLabel(ele: JQuery<HTMLElement>): void {
            let rangeLabel: string = '';
            let rangeLabelEle: JQuery<HTMLElement> = ele.find('.m-custom-table_drop-down__range--label');
            let RangeType: string = $(ele).find(':has(input[type="date"], .a-date-picker input[class*="date-picker"])').length ? 'date' : 'numeric';
            let minVal: string = <string>ele.find('input[name="min-range"]').val();
            let maxVal: string = <string>ele.find('input[name="max-range"]').val();

            /* If minimum range and maximum range values are not entered/selected */
            if (minVal.length == 0 && maxVal.length == 0) {
                rangeLabel = rangeLabelEle.attr('data-label');
            } else {

                if (RangeType === 'date') {
                    let minDateFallbackVal: string = '01 Jan 1970';
                    let maxDateFallbackVal: string = this.formatDate(new Date());
                    let minDate: string = minVal.length ? this.formatDate(new Date(minVal)) : minDateFallbackVal;
                    let maxDate: string = maxVal.length ? this.formatDate(new Date(maxVal)) : maxDateFallbackVal;
                    rangeLabel = `${minDate} to ${maxDate}`;
                } else {
                    let minNumFallbackVal: string = <string>ele.find('input[name="min-range"]').attr('aria-label');
                    let maxNumFallbackVal: string = <string>ele.find('input[name="max-range"]').attr('aria-label');
                    let minNum: string = minVal.length ? minVal : minNumFallbackVal;
                    let maxNum: string = maxVal.length ? maxVal : maxNumFallbackVal;
                    rangeLabel = `${minNum} to ${maxNum}`;
                }
            }
            rangeLabelEle.text(rangeLabel);
        }

        private formatDate(dateInput: Date): string {
            let date: number = dateInput.getDate();
            let month: string = dateInput.toLocaleString('en-US', { month: 'short' });
            let year: number = dateInput.getFullYear();
            return `${date} ${month} ${year}`;
        }

        private toggleReset(): void {
            let filterSelected: Boolean = false,
                rangeEntered: Boolean = false,
                searchEntered: Boolean = false;
            $(this.parentElement).find('.m-custom-table_drop-down__filter .a-dropdown__field').each(function () {
                if ($(this).find('.selected').index() > 0 && !filterSelected) {
                    filterSelected = true;
                    return false;
                }
            });


            !filterSelected && $(this.rangeInputs).find('input').each(function () {
                let inputVal: string = <string>$(this).val();
                if (inputVal.length > 0 && !rangeEntered) {
                    rangeEntered = true;
                    return false;
                }
            });

            !filterSelected && !rangeEntered && $(this.parentElement).find('[name="search-input"]').each(function () {
                let searchVal: string = <string>$(this).val();
                if (searchVal.length > 0 && !searchEntered) {
                    searchEntered = true;
                    return false;
                }
            });

            if (!filterSelected && !rangeEntered && !searchEntered) {
                $(this.resetButton).attr('disabled', 'disabled').addClass('disabled');
            } else {
                $(this.resetButton).removeAttr('disabled').removeClass('disabled');
            }
        }
    }

    $(document).ready(function () {
        document.querySelectorAll('[data-js-component="customtable"]').forEach(function (ele) {
            new CustomTable(ele as HTMLElement);
        });
    });

})();
