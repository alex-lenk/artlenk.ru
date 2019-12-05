var navLeft = $(".nav-left"),
  fixedClass = 'fixed';

jQuery(function ($) {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 140) {
      navLeft.addClass(fixedClass);
    }
    else if ($(this).scrollTop() < 140) {
      navLeft.removeClass(fixedClass);
    }
  });
});
