$( document ).ready(function() {
    console.log("ready!");




    new WOW().init();

    $("#harry").addClass('animated zoomIn').css("visibility", "visible");
    setTimeout(function(){
        $("#harry-desc").addClass('animated zoomIn').css("visibility", "visible");

        setTimeout(function(){
            $("#harry-links").addClass('animated zoomIn').css("visibility", "visible");
        }, 300);

    }, 250);



});
