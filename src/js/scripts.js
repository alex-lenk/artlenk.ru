$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        items: 1,
        smartSpeed: 450
    });

    $(".dt-menu-toggle").click(function () {
        $(this).next().toggleClass("open_menu");
    });

    $(".menu-parent").click(function () {
        $(this).children('.menu-dropdown').toggleClass("open_dropdown");
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});
