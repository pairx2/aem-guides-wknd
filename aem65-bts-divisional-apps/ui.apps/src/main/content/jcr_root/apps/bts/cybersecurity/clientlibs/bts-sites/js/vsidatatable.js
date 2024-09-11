// vsi data table
window.addEventListener("DOMContentLoaded", function () {

    // Close helper modals when open
    $('.sidebar-modal')?.on('click', function () {
        $(this).removeClass('active');
    });

    // close right drawer
    $('#vsiSidebar .sidebar-close')?.on('click', function () {
        $('.vsi-sidebar').removeClass('active');
    });

    // Only Run when VSI Data Table Component is present
    if ($("#vsiDataTable").length < 1) {
        return;
    }

    // min-max risk score --- start-end date
    let minDate, maxDate;

    // search filters
    $.fn.dataTable.ext.search.push(
        async function (settings, data, dataIndex) {
            let searchFlag = false;
            searchFlag = await vsiTableSearchPush(settings, data, dataIndex, minDate, maxDate);
            return searchFlag;
        }
    );

    // reformat date
    $.fn.dataTable.render.moment = function (from, to, locale) {
        if (arguments.length === 1) {
            locale = 'en';
            to = from;
            from = 'YYYY-MM-DD';
        }
        else if (arguments.length === 2) {
            locale = 'en';
        }

        return async function (d, type, row) {
            if (!d) {
                return await vsiMomentFormat1(type, 0, d);
            }
            let m = window.moment(d, from, locale, true);
            return m.format(await vsiMomentFormat(type, 'x', to));
        };
    };

    minDate = new DateTime($('#minDate'), {
        format: 'DD MMMM YYYY'
    });
    maxDate = new DateTime($('#maxDate'), {
        format: 'DD MMMM YYYY'
    });
    const table = $('.vsi-table').DataTable({
        columnDefs: [
            { targets: [4, 5, 6, 7, 8, 10], visible: false }
        ],
        dom: '<"top"f>rt<"bottom"lp>',
        initComplete: function () {
            this.api().columns(9).every(function () {
                let column = this;
                let select = $('<select><option value=""></option></select>')
                    .appendTo($('#selectDropdown'))
                    .on('change', function () {
                        let val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        },
        pageLength:12,
        language: {
            paginate: {
                previous: "<em class='abt-icon abt-icon-left-arrow u-ltr'></em>",
                next: "<em class='abt-icon abt-icon-right-arrow u-ltr'></em>"
            },
        lengthMenu: $('#show-msg').val()+'<select>' +
                        '<option value="12">12</option>' +
                        '<option value="24">24</option>' +
                        '<option value="36">36</option>' +
                        '</select>'+$('#per-page-msg').val(),

        }
    });

//Sorting table data based on status[Pending]

  table.order( [9,'desc'] ).draw();
  let $tdLenth = $('#vsiDataTable tbody tr').find('td[data-pending-status="pending"]').length;

  if($tdLenth == 0){
	table.order( [0,'desc'] ).draw();
  }

    // datatables search field
    $('#vsiDataTable_filter').insertBefore('#selectDropdown');
    $('#vsiDataTable_filter input').insertBefore('#vsiDataTable_filter label');
    $('#vsiDataTable_filter input').attr('placeholder', 'Vulnerability Title / CVE ID');
    $('#selectDropdown option').eq(0).html('Status');

    // redraw table on risk score and date change
    $('.select-risk-range').on('click', function () {
        $('#selectDateRange').removeClass('active');
        $('#selectRiskRange').toggleClass('active');
    });
    $('#selectRiskRange .close-btn').on('click', function () {
        $('#selectRiskRange').removeClass('active');
    });
    $('.select-date-range').on('click', function () {
        $('#selectRiskRange').removeClass('active');
        $('#selectDateRange').toggleClass('active');
    });
    $('#selectDateRange .close-btn').on('click', function () {
        $('#selectDateRange').removeClass('active');
    });
    $('#minRisk, #maxRisk').keyup(function () {
        table.draw();
    });
    $('#minDate, #maxDate').on('change', function () {
        table.draw();
    });

    // CLEAR
    $('#clearFilters').on('click', function (e) {
        e.preventDefault();
        $('input').each(function () {
            $(this).val('');
            table.column($(this).data()).search('', false, false);
        });
        $('#selectDropdown select').val('');
        minDate.destroy();
        minDate = new DateTime($('#minDate'), {
            format: 'DD MMMM YYYY'
        });
        maxDate.destroy();
        maxDate = new DateTime($('#maxDate'), {
            format: 'DD MMMM YYYY'
        });
        table.search('').columns().search('').draw();
    });

    // right drawer
    $('.vsi-table').on('click', '.filter-list > tr', function () {
        const vulID = table.row(this).data()[3];
        const vulType = table.row(this).data()[4];
        const vulTitle = table.row(this).data()[2];
        const vulRisk = table.row(this).data()[0];
        const vulDate = table.row(this).data()[1];
        const vulSource = table.row(this).data()[5];
        const vulStatus = table.row(this).data()[9];
        const vulDecision = table.row(this).data()[6];
        const vulResponse = table.row(this).data()[7];
        const vulDetails = table.row(this).data()[8];
        const vulRemDate = table.row(this).data()[10];

        $('#vsiSidebar .cve').html(vulID);
        $('#vsiSidebar .sidebar-type .type').html(vulType);
        $('#vsiSidebar .vsi-title').html(vulTitle);
        $('#vsiSidebar .risk-score').html(vulRisk);
        $('#vsiSidebar .sidebar-date .type').html(vulDate);
        $('#vsiSidebar .sidebar-source .source').html(vulSource);
        $('#vsiSidebar .sidebar-status .type').html(vulStatus);
        $('#vsiSidebar .sidebar-decision .decision').html(vulDecision);
        $('#vsiSidebar .sidebar-oc .response').html(vulResponse);
        $('#vsiSidebar .sidebar-details .details').html(vulDetails);
        $('#vsiSidebar .sidebar-remdate .remdate').html(vulRemDate);
        $('.vsi-sidebar').addClass('active');
    });

    // modal open and close
    $('.sidebar-id span').on('click', function () {
        $('#vsiVulID').addClass('active');
    });
    $('.sidebar-type span').on('click', function () {
        $('#vsiVulType').addClass('active');
    });
    $('.sidebar-risk span').on('click', function () {
        $('#vsiInitRiskScore').addClass('active');
    });
    $('.sidebar-source span').on('click', function () {
        $('#vsiVulSource').addClass('active');
    });
    $('.sidebar-status span').on('click', function () {
        $('#vsiVulStatus').addClass('active');
    });
    $('.sidebar-decision span').on('click', function () {
        $('#vsiAssessDecision').addClass('active');
    });
    $('.sidebar-response span').on('click', function () {
        $('#vsiVulResponse').addClass('active');
    });
    $('.sidebar-details span').on('click', function () {
        $('#vsiResDetails').addClass('active');
    });
    $('.sidebar-remdate span').on('click', function () {
        $('#vsiRemDate').addClass('active');
    });
    // end modal js
});

async function vsiTableSearchPush(settings, data, dataIndex, minDate, maxDate) {
    let searchFlag = false;
    let minRiskScore = parseFloat($('#minRisk').val(), 10);
    let maxRiskScore = parseFloat($('#maxRisk').val(), 10);
    let risk = parseFloat(data[0]) || 0;

    const minDateTime = minDate.val();
    const maxDateTime = maxDate.val();
    const date = new Date(data[1]);

    const withinRisk = await vsiWithinRiskVal(minRiskScore, maxRiskScore, risk);

    const withinDates = await vsiWithinDates(minDateTime, maxDateTime, date);

    if (withinRisk && withinDates) {
        searchFlag = true;
    }
    return searchFlag;
}

const vsiWithinRiskVal = async (minRiskScore, maxRiskScore, risk) => (
    (isNaN(minRiskScore) && isNaN(maxRiskScore)) ||
    (isNaN(minRiskScore) && risk <= maxRiskScore) ||
    (minRiskScore <= risk && isNaN(maxRiskScore)) ||
    (minRiskScore <= risk && risk <= maxRiskScore)
);

const vsiWithinDates = async (minDateTime, maxDateTime, date) => (
    (minDateTime === null && maxDateTime === null) ||
    (minDateTime === null && date <= maxDateTime) ||
    (minDateTime <= date && maxDateTime === null) ||
    (minDateTime <= date && date <= maxDateTime)
);

const vsiMomentFormat = async (type, val1, val2) => type === 'sort' || type === 'type' ? val1 : val2;
