<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$serverName = "";
$connectionOptions = array(
    "Database" => "",
    "Uid" => "",
    "PWD" => "",
    "TrustServerCertificate" => true,
    "CharacterSet" => "UTF-8"
);

// Establishes the connection
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    http_response_code(404);
    die(json_encode(array("error" => "Could not connect to the database")));
}

$type = $_GET["type"];

if ($type == "calls"){
    $sql = "SELECT DISTINCT dbo.activitySigns.activitySign as activitySign, countryCode, clientPhoneNum as contact, date, resolve, topic, orderNum, summary  FROM dbo.callSummary, dbo.activitySigns WHERE dbo.callSummary.activitySign = dbo.activitySigns.activitySign";

}
else if($type == "emails"){
    $sql = "SELECT DISTINCT activitySign, orderNum, email as contact, countryCode, topic, summary, resolve, date FROM dbo.emailSummary";
}
else{
    $sql = "SELECT DISTINCT orderNum, countryCode, topic, summary, resolve, date FROM dbo.amioSummary";
}

// Select Query


$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    http_response_code(404);
    die(json_encode(array("error" => "Query execution failed")));
}

$data = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    array_push($data, $row);
}


//$data = utf8ize($data);

$jsonData = json_encode($data);

if ($jsonData === false) {
    echo json_encode(array(
        "error" => "JSON encoding failed",
        "json_last_error" => json_last_error(),
        "json_last_error_msg" => json_last_error_msg()
    ));
} else {
    echo $jsonData;
}

sqlsrv_close($conn);


?>

