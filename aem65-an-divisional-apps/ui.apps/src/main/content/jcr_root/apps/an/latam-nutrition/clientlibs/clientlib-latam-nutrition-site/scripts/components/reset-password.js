$(document).ready(function () {
  $(document).on(
    "change keyup",
    ".a-container--reset-pass .a-input-control",
    function (e) {
      $(".a-container--reset-pass .a-input-control").each(function () {
        let value = this.value;
        let isErrorCameText = $(".a-container--reset-pass")
          .find(".form-group")
          .hasClass("validation-error");

        return value && value.trim() != "" && !isErrorCameText ? true:false;
      });
    }
  );
});
