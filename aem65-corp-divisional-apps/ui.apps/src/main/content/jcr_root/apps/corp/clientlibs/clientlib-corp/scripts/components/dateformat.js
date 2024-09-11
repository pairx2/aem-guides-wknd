$(document).ready(function () {
  if ($(".date-formate").length > 0 && isOnPublish()) {
    const option_1 = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const option_2 = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = new Date(
      $(".date-formate").text()
    ).toLocaleDateString("en-US", option_1);
    const sp = formattedDate.split(" ");
    const formattedDateValid = sp[0] + ". " + sp[1] + " " + sp[2];
    if (sp[0] === "May" || sp[0] === "Jun" || sp[0] === "Jul") {
      const formattedDateFull = new Date(
        $(".date-formate").text()
      ).toLocaleDateString("en-US", option_2);
      $(".date-formate").text(formattedDateFull);
    } else {
      $(".date-formate").text(formattedDateValid);
    }
  }
});
