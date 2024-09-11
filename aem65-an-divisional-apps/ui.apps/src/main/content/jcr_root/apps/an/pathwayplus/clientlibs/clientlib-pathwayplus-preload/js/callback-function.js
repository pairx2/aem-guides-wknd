let domElement = document.querySelectorAll(".m-search-bar__input-field");
let filterClassClick="";
for (const element of domElement) {
  element.addEventListener(
    "click",
    function(event) {
      filterClassClick = event.target.getAttribute("id");
    },
    false
  );
}
if (
  filterClassClick && document.getElementById(filterClass) != null &&
  document
    .getElementById(filterClass)
    .closest(".o-search-res")
    .querySelectorAll(".o-search-res__container .o-search-res__results")[0]
    .children.length
) {
  document
    .getElementById(filterClassClick)
    .closest(".o-search-res")
    .querySelectorAll(".o-search-res__container .o-search-res__results")[0]
    .children[0].classList.remove("removetd");
}
function addCol(results){
  let col = [];
  for (const element of results) {
    for (let key in element) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
}

function checkTd(table){
  if (table &&table.classList.contains("removetd")) {
    table.classList.remove("removetd");
  }
}

function deleteTblRow(table){
  for (let itable = 1; itable < table.rows.length; ) {
    table.deleteRow(itable);
  }
}

function addColumns(table, tabledata){
    for (let row = 0, n = table&&table.rows.length; row < n; row++) {
      for (let cols = 0, m = table.rows[row].cells.length; cols < m; cols++) {
        tabledata[cols] = table.rows[row].cells[cols].getAttribute(
          "data-table-value"
        );
      }
    }
}
function addRowData(results, tabledata, table){
  let tr;
    for (const element of results) {
      tr = table.insertRow(-1);
      for (const i of tabledata) {
        for (const j of col) {
          if (tabledata[i] == col[j]) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = element[col[j]];
          }
        }
      }
    }
}

function tableCreation(results, filterClass) {
  filterClass = filterClass?filterClass.split(" ").join("_"):filterClassClick;
  
  results.forEach(function(result) {
    addCol(results);
    let table = filterClass?document
      .getElementById(filterClass)
      .closest(".o-search-res")
      .querySelectorAll(".o-search-res__container .o-search-res__results")[0]
      .children[0]:"";

    checkTd(table);
    deleteTblRow(table);
    
    let tabledata = [];
    addColumns(table, tabledata);
    addRowData(results, tabledata, table)
    
    let cloneNode = this.templateEle.content
     .cloneNode(true)
     .querySelector(":first-child");
    let tempStr = cloneNode.outerHTML;
   templateStr.push(tempStr);
    return templateStr;
  });
}
