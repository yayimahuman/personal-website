<?php
$info = json_decode(file_get_contents("teadaddy.json"),true);
$info['time'] = date("H:i:s");
echo json_encode($info);

 ?>
