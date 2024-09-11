$(document).ready(function () {
  let editMode = false;
  let homePage = $("#custhomepagepath").val();
  let thankYouPage = $("#custthankyoupage").val();
  setPageData("binNumber", "binNumber");
  setPageData("groupId", "groupId");
  setPageData("memberId", "memberId");
  setPageData("expirationDate", "expirationDate");
  setPageData("firstName", "firstName");
  let wcmmode = getCookie('wcmmode');

  function setPageData(key, elementId) {
    sessionStorage.getItem(key) != null && $("#" + elementId + "").text(sessionStorage.getItem(key));
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let value of ca) {
      let c = value.trim();
      if (c.startsWith(name)) {
        return c.substring(name.length);
      }
    }
    return "";
  }

  function redirctHomePage() {
    let signUpSuccessCookie = getCookie('signUpSuccess');
    let firstName = sessionStorage.getItem("firstName");
    if (signUpSuccessCookie != "1" || firstName == null) {
      window.location.href = homePage;
    }
  };

  const handleThankyouPage = () => {
    if (window.location.href.includes(thankYouPage)) {
      redirctHomePage();
      $('body').addClass("thank_you_hidecapcha");
    }
  };

  if (["preview", "edit"].includes(wcmmode)) {
    editMode = true;
  }

  if (!editMode) {
    handleThankyouPage();
  }
  const fsl3VCard = $('[name="fsl3-voucher-card"]').length !== 0;
  if (fsl3VCard) {
    $('body').addClass('fsl3-new-voucher-card');
  }
  if (window.location.href.includes(thankYouPage)) {
    $('body').addClass("thank_you_hidecapcha");
  }
});
