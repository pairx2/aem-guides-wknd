$(document).ready(function () {
  if ($(".search-filter-static-article").length && isOnPublish()) {
    $(".search-filter-static-article .article-link").each(function () {
      let completeDatePlaceHolder = $(this).find(
        ".article-details .article-date"
      );
      const completeDate = completeDatePlaceHolder.text();
      const date = completeDate ? new Date(completeDate) : "";
      const year = date ? date.getFullYear() : "";
      const monthArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = date ? monthArray[date.getMonth()] : "";
      const day = date ? date.getDate() : "";
      const completeDateString = month + ". " + day + ", " + year;
      completeDatePlaceHolder.text(completeDateString);
    });
  }
});
