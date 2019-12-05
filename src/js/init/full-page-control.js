/**
 * Created by newuser on 03.07.17.
 */
(function ($) {
  var section = 1;
  var noscrol = false;
  var startEl = $('.home-header'),
    ourMission = $('.our-mission'),
    ourWork = $('.our-work');


  $('html,body').on('wheel', function (event) {

    WinTop = $(window).scrollTop();
    console.log(WinTop);
    console.log(section);

    if (WinTop < 50) {
      if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        scrollHome('top', 0);
      }
      else {
        scrollHome('bottom', 0);
      }
    }
  });


  function scrollHome(direction, WinTop) {

    if (section == 3) {
      noscrol = false;
    }

    if (!noscrol && WinTop == 0) {

      noscrol = true;

      if (direction == 'bottom') {
        if (section == 1) {
          section = 2;
          startEl.addClass('header-out');
          ourMission.addClass('second-active block-out');

        }
        else if (section == 2) {
          section = 3;
        }


      }
      else if (direction == 'top') {


        if (section == 3) {
          section = 2;

          ourWork.removeClass('active-work');
          ourMission.addClass('second-active');
        }
        else if (section == 2) {
          section = 1;
          startEl.removeClass('header-out');
          ourMission.removeClass('block-out');
          ourMission.removeClass('second-active');

        } else if (section == 1) {
          ourMission.removeClass('second-active');

        }
      }

      if (section == 3) {
        ourMission.removeClass('second-active');
        ourWork.addClass('active-work');
        setTimeout(function () {
          setTimeout(function () {
            // videoshow();
          }, 1000);

          $('html').removeClass('no-scroll');

        }, 1000);
      }
      else {
        $('html').addClass('no-scroll');
      }

      setTimeout(function () {
        noscrol = false;
      }, 1000);
    }
  }


})(jQuery);
