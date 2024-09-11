$(document).ready(function () {
    //superscript and subscript for sub-menu items
    $('.m-mega-menu__item a, .m-mega-menu__nested-menu a').contents().filter(function () {
      if (null != this.nodeValue && (this.nodeValue.search("<sup>") != -1 || this.nodeValue.search("<sub>") != -1))
        return this.nodeType === 3;
    }).replaceWith(function () {
      return this.nodeValue;
    });
  });