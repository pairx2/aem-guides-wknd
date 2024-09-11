$(document).ready(function () {
 $("#cardfirst").one(function(){
  var symbol = $("#videofirst")[0].src.indexOf("?") > -1 ? "&" : "?";
  $("#video1")[0].src += symbol + "autoplay=1";
 });
});