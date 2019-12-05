$(document).ready(function () {

  $(".nav-left_toggle").click(function () {
    $('.nav-panel').toggleClass("nav-panel-open");
  });

  /**
   *
   * BEGIN focus form-control
   *
   */

  var formControl = $(".form-control"),
    formGroup = ".form-group",
    formGroupFocus = "form-group-focus";

  formControl.focus(function () {
    $(this).closest(formGroup).addClass(formGroupFocus);
  });

  formControl.blur(function () {
    $(this).closest(formGroup).removeClass(formGroupFocus);
  });

  /**
   *
   * END focus form-control
   *
   */

});


//= init/transformicons.js

//= init/animated-gradient.js
