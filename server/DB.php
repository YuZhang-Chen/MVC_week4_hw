<?php

function DB() {
    $db_host = 'localhost';
    $db_name = 'erp';
    $db_user = 'root';
    $db_password = '';
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
    $response = array();
    try {
        $conn = new PDO($dsn, $db_user, $db_password);
        $response = ['status' => 200, 'message' => "PDO建立成功", 'result' => $conn];
    } catch (PDOException $e) {
        $response = ['status' => $e->getCode(), 'message' => $e->getMessage()];
    }
    return $response;
}
