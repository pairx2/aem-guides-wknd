/**
 * MYFREESTYLE - USER TRANSATION HISTORY TABLE
 **/

/**
 * @function
 * Summary: Called after getPointHistory api request, to modify the response array.
 * Parameters: data {Object} is the API response.
 */
function updateResponseTransactionTable(data){
  // Sort array based on the createdDate

  if(data && data.length > 0) {
    for (let object of data) {
      if (object.createdDate) {
          object.createdDate = object.createdDate.replace(/-/g,'/');
      }
    }
    data.sort(function(a,b){
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  }

  return data;
}

/**
 * @function
 * Summary: Called after getPointHistory api request, to modify the rows.
 * Parameters: res {Object} is the API response.
 */

function updateRowTransactionTableFidelis(res){
  const rowType = res.data.type;
  const tableEle = $('[id*="mfs-transaction-table"], [id*="mfs-txn-table"]');

  // Get the column index to modify the data
  const tableHead = tableEle.find('thead');
  const titleColIndex = tableHead.find('th[data-name="title"]').index() + 1;
  const pointsColIndex = tableHead.find('th[data-name="point"]').index() + 1;
  const dateColIndex = tableHead.find('th[data-name="createdDate"]').index() + 1;

  $(res.row).attr({ 'data-table-txn-type': rowType, 'data-table-row': res.index + 1, 'class': 'mfs-txn-row mfs-txn-row--' + rowType });

  // Modify points Column
  const pointsColumn = $(res.row).find('td:nth-child('+pointsColIndex+')');
  const pointsTxt = pointsColumn.text();
  let minusPointsArr = $('input[name="minusRedeemPoints"]').attr('value').split(',');
  minusPointsArr = minusPointsArr.map(function (el) {return el.trim();});
  
  pointsColumn.addClass('mfs-txn-points points-added').empty().append(`<span class="points">${pointsTxt}</span>`);
  for (const element of minusPointsArr) {
    if(rowType == element){
      pointsColumn.removeClass('points-added').addClass('points-redeemed').empty().append(`<span class="points">${pointsTxt}</span>`)
    }  
  }

  // Modify Date Format
  const dateColumn = $(res.row).find('td:nth-child('+dateColIndex+')');
  const dateTxt = dateColumn.text();
  const oldDateFormat = new Date(dateTxt);
  const newDateFormat = oldDateFormat.getDate()+'.'+ (oldDateFormat.getMonth() + 1) +'.'+oldDateFormat.getFullYear();
  dateColumn.addClass('mfs-txn-date').empty().html('<span class="date">'+newDateFormat+'</span>');

  // Modify Title Column
  let titleColumn = $(res.row).find('td:nth-child('+titleColIndex+')');
  let titleTxt = titleColumn.text();
  let rowTypeArr = $('input[name="rowType"]').attr('value').split(',');
  rowTypeArr = rowTypeArr.map(function (el) {return el.trim();});

  const txnTitleText = $(`input[type="hidden"][name="${rowType}"]`).attr('value');
  let txnValue = titleTxt;

  if(rowTypeArr.includes(rowType)){
    if(rowType == 'voucher'){
      txnValue = res.data.id;
    }
    else if(rowType == 'order') {
      // Get the product name using product id from an array
      for (const element of productsArr) {
        if(element.product_id == res.data.productId){
          txnValue = element.product_name;
        }  
      }
    }
    
    titleColumn.empty().html(`<span class="mfs-txn-title"><strong>${txnTitleText}</strong></span><span class="mfs-txn-value">${txnValue}</span>`); 
  }

}