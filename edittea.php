<?php
$teaType = $_POST['teaType'];
$timeOfBrew = $_POST['time'];
if (!isset($teaType) || $teaType == "" || !isset($timeOfBrew) || $timeOfBrew == ""){
    $file = fopen("teadaddy.json","w") or die("Unable to open instructions file. Please try again.");
    fclose($file);
    echo "Field left blank. All instructions removed.";
}
else{
    //input verification here;
    //convert EST to server time (GMT b/c server is in england)
    $timeOfBrew = date('H:i:s', strtotime($timeOfBrew . " EST"));

    $json = array();
    $json['teaType'] = $teaType;
    $json['timeOfBrew'] = $timeOfBrew;
    $file = fopen("teadaddy.json","w") or die("Unable to open instructions file. Please try again.");
    fwrite($file, json_encode($json));
    fclose($file);
    echo "Instructions updated successfully.";
}
?>
