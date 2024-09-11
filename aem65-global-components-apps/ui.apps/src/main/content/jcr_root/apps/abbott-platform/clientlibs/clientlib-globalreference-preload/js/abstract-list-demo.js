/** Abstract List Demo
 * 
 * Preload function, which can be used by Abstract List component on demo page.
*/

function abstractListOnClick(event) {
  const { title, value } = event.target.dataset;
  window.alert("Title: " + title + "\nValue: " + value);
}

