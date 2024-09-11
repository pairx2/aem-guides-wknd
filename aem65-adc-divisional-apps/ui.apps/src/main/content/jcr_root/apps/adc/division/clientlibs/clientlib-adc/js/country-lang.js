/**
 * Add class << country-langauge >> in body
**/
$(function () {
  const currPageUrl = window.location.pathname,
    langRegex = /\/([a-z]{2}-[a-z]{2})\//i;
  let result;

  if ((result = langRegex.exec(currPageUrl)) !== null) {
    document.body.classList.add(result[1]);
  }
});