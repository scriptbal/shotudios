<?php

header("Content-Type: application/json");


require_once __DIR__ . "/config.php";

require_once __DIR__ . "/lib/response.php";
require_once __DIR__ . "/lib/security.php";
require_once __DIR__ . "/lib/validator.php";
require_once __DIR__ . "/lib/commission_number.php";
require_once __DIR__ . "/lib/discord.php";


securityCheck();


$data = validateCommission();


$commissionNumber = generateCommissionNumber();


$uploadedFiles = [];
$uploadedOriginalNames = [];


if(isset($_FILES['references'])){


foreach($_FILES['references']['tmp_name'] as $index=>$tmp){

    if(
        $_FILES['references']['error'][$index] === 0 &&
        is_uploaded_file($tmp)
    ){

        $uploadedFiles[] = $tmp;

        $uploadedOriginalNames[] =
            $_FILES['references']['name'][$index];

    }

}


}


sendDiscord(
    $commissionNumber,
    $data,
    $uploadedFiles,
    $uploadedOriginalNames
);


jsonSuccess([

    "commission"=>$commissionNumber,

    "uploaded"=>$uploadedOriginalNames

]);