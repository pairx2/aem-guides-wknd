$(function () {
  $(
    "#social-media-icons  .columncontrol__column .image,#social-media-icons-in .columncontrol__column .image, #social-media-icons-single-row .columncontrol__column .image, #social-media-icons-single-row-3-iteam .columncontrol__column .image, #social-media-icons-single-row-3-iteam .columncontrol__column .image, #social-media-icons-two-column .columncontrol__column .image, .columncontrol-2-col-social .columncontrol__column .image, .columncontrol-5-col-social .columncontrol__column .image"
  ).click(function (e) {
    e.stopPropagation();
    $(this).parent().find("a")[0].click();
  });

  $(
    ".productsection .o-product-section__container .o-product-section__content"
  ).click(function (e) {
    e.stopPropagation();
    $(this)
      .parent()
      .find(".o-product-section__image-wrapper")
      .find("a")[0]
      .click();
  });
});
