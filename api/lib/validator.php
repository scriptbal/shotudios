<?php

require_once __DIR__ . "/response.php";

/*
|--------------------------------------------------------------------------
| Validate Commission Form
|--------------------------------------------------------------------------
*/

function validateCommission(): array
{

    $data = [

        "name" => htmlspecialchars(
            trim($_POST["name"] ?? "")
        ),

        "contact" => htmlspecialchars(
            trim($_POST["contact"] ?? "")
        ),

        "service_id" => (int) ($_POST["service_id"] ?? 0),

        "package_id" => (int) ($_POST["package_id"] ?? 0),

        "service" => htmlspecialchars(
            trim($_POST["service"] ?? "")
        ),

        "package" => htmlspecialchars(
            trim($_POST["package"] ?? "")
        ),

        "price" => htmlspecialchars(
            trim($_POST["price"] ?? "")
        ),

        "price_idr" => htmlspecialchars(
        trim($_POST["price_idr"] ?? "")
        ),

        "delivery" => htmlspecialchars(
            trim($_POST["delivery"] ?? "")
        ),

        "description" => htmlspecialchars(
            trim($_POST["description"] ?? "")
        )

    ];

    /*
    |--------------------------------------------------------------------------
    | Required Validation
    |--------------------------------------------------------------------------
    */

    if (

        empty($data["name"]) ||

        empty($data["contact"]) ||

        empty($data["service"]) ||

        empty($data["package"]) ||

        empty($data["description"])

    ) {

        jsonError(
            "Please complete all required fields."
        );

    }

    if (

    $data["service_id"] <= 0 ||

    $data["package_id"] <= 0

){

    jsonError("Invalid service.");

}

    return $data;

}