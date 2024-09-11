/**********************************
Pagination
**********************************/

$(window).on("load", function () {
  if (
    isOnPublish() &&
    $(".pagination").length &&
    $(".pagination .m-pagination-static__content .m-card").length
  ) {
    loadCardImages();
  }

  $(".o-search-results-filter nav.a-pagination").on("click", function () {
    $("html").animate({ scrollTop: 0 }, "slow");
  });
});

/**
 * @function
 * Summary: Function to load the images of lazyloading cards inside pagination
 */
function loadCardImages() {
  $(".pagination .m-pagination-static__content .m-card").each(function () {
    let cardImage = $(this).find(".cmp-image__image");
    if (cardImage.hasClass("cmp-image__image--is-loading")) {
      let imgSrc = cardImage.parent().attr("data-asset");
      cardImage.attr("src", imgSrc);
      cardImage.removeClass("cmp-image__image--is-loading");
    }
  });

  // Bind the click event to pagination links each time the function runs as the pagination links gets refreshed for each click
  $(".pagination .m-pagination-static__links a").on("click", function () {
    setTimeout(function () {
      loadCardImages();
    }, 300);
  });
}

// Pagination for stories component

$(function () {
  if (isOnPublish() && $(".pagination-numbers").length) {
    const paginationNumbers =
      document.getElementsByClassName("pagination-numbers");
    Object.keys(paginationNumbers).forEach((i) => {
      let paginationNumbers_i = paginationNumbers[i];
      const listItems = $(paginationNumbers_i)
        .parent()
        .parent()
        .parent()
        .find("div.story-card");
      const nextButton = document.getElementsByClassName("next-button");
      const prevButton = document.getElementsByClassName("prev-button");

      const paginationLimit = 3;
      const pageCount = Math.ceil(listItems.length / paginationLimit);
      var currentPage = [];
      currentPage[i] = 1;

      const disableButton = (button) => {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
      };

      const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
      };

      const handlePageButtonsStatus = () => {
        if (currentPage[i] === 1) {
          disableButton(prevButton[i]);
        } else {
          enableButton(prevButton[i]);
        }

        if (pageCount === currentPage[i]) {
          disableButton(nextButton[i]);
        } else {
          enableButton(nextButton[i]);
        }
      };

      const handleActivePageNumber = () => {
        paginationNumbers_i
          .querySelectorAll(".pagination-number")
          .forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage[i]) {
              button.classList.add("active");
            }
          });
      };

      const appendPageNumber = (index) => {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);

        paginationNumbers_i.appendChild(pageNumber);
      };

      const getPaginationNumbers = () => {
        for (let j = 1; j <= pageCount; j++) {
          appendPageNumber(j);
        }
      };

      const setCurrentPage = (pageNum) => {
        currentPage[i] = pageNum;

        handleActivePageNumber();
        handlePageButtonsStatus();

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;
        listItems.each((index, item) => {
          $(item).addClass("hidden");
          if (index >= prevRange && index < currRange) {
            $(item).removeClass("hidden");
          }
        });
      };

      const setVisiblePagination = (pageNum) => {
        paginationNumbers_i
          .querySelectorAll(".pagination-number")
          .forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));
            $(button).removeClass("d-none");

            if (pageNum == 1 || pageNum == 2) {
              if (pageIndex > 5) {
                $(button).addClass("d-none");
              }
            } else if (pageNum == pageCount || pageNum == pageCount - 1) {
              if (pageIndex < pageCount - 4) {
                $(button).addClass("d-none");
              }
            } else {
              if (
                pageIndex != pageNum &&
                pageIndex != pageNum - 1 &&
                pageIndex != pageNum - 2 &&
                pageIndex != pageNum + 1 &&
                pageIndex != pageNum + 2
              ) {
                $(button).addClass("d-none");
              }
            }
          });
      };

      window.addEventListener("load", () => {
        getPaginationNumbers();
        setCurrentPage(1);
        setVisiblePagination(1);

        $(prevButton[i]).click(function () {
          setCurrentPage(currentPage[i] - 1);
          setVisiblePagination(currentPage[i]);
        });

        $(nextButton[i]).click(() => {
          setCurrentPage(currentPage[i] + 1);
          setVisiblePagination(currentPage[i]);
        });

        paginationNumbers_i
          .querySelectorAll(".pagination-number")
          .forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));

            if (pageIndex) {
              button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
                setVisiblePagination(pageIndex);
              });
            }
          });
      });
    });
  }
});

// Pagination for expert page
$(function () {
  const paginationNumbers = document.getElementById("pagination-numbers");
  const paginatedList = document.getElementById("paginated-list");
  const listItems = paginatedList.querySelectorAll(".expert-member");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");
  const paginationLimit = parseInt(document.getElementById("noofpeople").innerText);
  const pageCount = Math.ceil(listItems.length / paginationLimit);
  let currentPage = 1;

  const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };

  const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };

  const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }

    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };

  const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };

  const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
  };

  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
  };

  window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
      setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
      setCurrentPage(currentPage + 1);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));

      if (pageIndex) {
        button.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  });
});
