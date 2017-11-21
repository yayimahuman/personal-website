$(document).ready(function() {

    console.log("ready!");

    var type = $("input[name='teaType']:checked").val();
    console.log("tea selected:" + type);
    if (type == "green"){
        $("body").removeClass("black").addClass("green");
    }
    else if (type == "black"){
        $("body").removeClass("green").addClass("black");
    }

    $("input[name='teaType']").on("change",function(){
        type = $("input[name='teaType']:checked").val();
        console.log("tea selected:" + type);
        if (type == "green"){
            $("body").removeClass("black").addClass("green");
        }
        else if (type == "black"){
            $("body").removeClass("green").addClass("black");
        }
    });

    var form = $('#tea-form');
    $(form).submit(function(event) {
        $("#response").html("processing...");
        //Stop the browser from submitting the form.
        event.preventDefault();

        //Serialize the form data.
        var formData = $(form).serialize();

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(data) {
            //write echoed response to original page
            $("#response").html(data);
        });

        return false;
    });

});
