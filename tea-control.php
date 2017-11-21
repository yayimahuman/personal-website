<?php
$info = json_decode(file_get_contents("teadaddy.json"),true);
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Harry Dong">
    <meta name="robots" content="noindex">

    <title>Tea Control</title>

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/animate.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,400" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="css/inputs.css" />
    <link href="css/tea.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="js/tea.js"></script>

</head>

<body>

    <i class="fa fa-cogs fa-5x background-icon"></i>

    <section class="section-dash" id="tea">

        <form action="edittea.php" method="post" id="tea-form">

            <div class="radio-group">
                <h3>Tea Type</h3>

                <input type="radio" id="option-10" name="teaType" value="green"
                <?php if (isset($info['teaType']) && $info['teaType'] == "green"){
                    //if teatype is green, check off green as default
                    echo 'checked="checked"';
                }?>>
                <label class="custom-radio" for="option-10">Green</label>

                <input type="radio" id="option-11" name="teaType" value="black"
                <?php if (isset($info['teaType']) && $info['teaType'] == "black"){
                    //if teatype is green, check off green as default
                    echo 'checked="checked"';
                }?>>
                <label class="custom-radio" for="option-11">Black</label>

             </div>

            <div id="order-entry-input">
                <div class="col-sm-12">
                    <span class="input input--haruki">
                        <input name="time" class="input__field input__field--haruki" type="text"
                        <?php if (isset($info['timeOfBrew']) && $info['timeOfBrew'] != ""){
                            date_default_timezone_set("America/New_York");
                            $timeOfBrew = date('h:i a', strtotime($info['timeOfBrew']. " UTC"));
                            if (substr($timeOfBrew,0,1) == '0'){//remove leading zero
                                $timeOfBrew = substr($timeOfBrew,1);
                            }
                            //set time
                            echo 'value="' . $timeOfBrew . '"';
                        }?>
                        />

                        <label class="input__label input__label--haruki" for="input-1">
                            <span class="input__label-content input__label-content--haruki">Time of Brew</span>
                        </label>
                    </span>
                </div>

            <div class="clearfix"></div>

            <input type="submit" id="submit" class="btn btn-outline btn-xl"></input>
        </form>


        <div class='clearfix'></div>
        <br><br>

        <div id="response"></div>

    </section>



    <script src="js/classie.js"></script>
    <script>

        (function() {
            // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
            if (!String.prototype.trim) {
                (function() {
                    // Make sure we trim BOM and NBSP
                    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    String.prototype.trim = function() {
                        return this.replace(rtrim, "");
                    };
                })();
            }

            [].slice.call( document.querySelectorAll( "input.input__field" ) ).forEach( function( inputEl ) {
                // in case the input is already filled..
                if( inputEl.value.trim() !== "" ) {
                    classie.add( inputEl.parentNode, "input--filled" );
                }

                // events:
                inputEl.addEventListener( "focus", onInputFocus );
                inputEl.addEventListener( "blur", onInputBlur );
            } );

            function onInputFocus( ev ) {
                classie.add( ev.target.parentNode, "input--filled" );
            }

            function onInputBlur( ev ) {
                if( ev.target.value.trim() === "" ) {
                    classie.remove( ev.target.parentNode, "input--filled" );
                }
            }
        })();

    </script>


</body>

</html>
