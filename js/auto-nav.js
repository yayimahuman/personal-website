// jQuery to collapse the navbar on scroll
navVisible = false;

function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

function xNavicon(){
    $(".top-bar").addClass("collapsed");
    $(".middle-bar").addClass("collapsed");
    $(".bottom-bar").addClass("collapsed");
}
function sandwichNavicon(){
    $(".top-bar").removeClass("collapsed");
    $(".middle-bar").removeClass("collapsed");
    $(".bottom-bar").removeClass("collapsed");
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        document.getElementById('btn-nav-toggle').disabled = true;
        window.setTimeout(disableToggle, 350);
        var $anchor = $(this);
        $('.collapse').collapse("hide");
        sandwichNavicon();
        navVisible = false;
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeOutExpo');
        event.preventDefault();
    });
});

//$('.navbar-toggle:visible').click();
// Closes the Responsive Menu on Menu Item Click
function toggleNav(){
    document.getElementById('btn-nav-toggle').disabled = true;
    window.setTimeout(disableToggle, 350);
    $('.collapse').collapse("toggle");
    if (navVisible){
        sandwichNavicon();
        navVisible = false;
    }
    else{
        xNavicon();
        navVisible = true;
    }
}
function disableToggle() {
    document.getElementById('btn-nav-toggle').disabled = false;
}
