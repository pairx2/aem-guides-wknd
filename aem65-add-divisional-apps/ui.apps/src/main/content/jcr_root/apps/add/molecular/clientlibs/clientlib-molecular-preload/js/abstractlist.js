
var filterListVertical = (event) => {
  document.dispatchEvent(new CustomEvent('verticalFilter:clicked', { detail: event.target.dataset.value }));
}

var filterListHorizontal = (event) => {
  document.dispatchEvent(new CustomEvent('horizontalFilter:clicked', { detail: event.target.dataset.value }));
}