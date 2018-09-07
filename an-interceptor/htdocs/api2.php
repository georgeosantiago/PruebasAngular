<?php
	
$config = [
	["id" => "11","name" => "Superman"],
	["id" => "12","name" => "Batman"],
	["id" => "13","name" => "Robin"]
  ];

$json = json_encode($config);

// Send the output
header("content-type: application/json"); 
//header('Content-Type: text/javascript');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

//echo $_GET['callback']. '('. $json . ')';    
echo $json;
?>