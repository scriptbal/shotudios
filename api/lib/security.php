<?php

declare(strict_types=1);

require_once __DIR__ . "/response.php";

/*
|--------------------------------------------------------------------------
| Security Check
|--------------------------------------------------------------------------
*/

function securityCheck(): void
{
    // Honeypot
    if (!empty($_POST["website"])) {

        jsonError("Spam detected.");

    }

    // Hanya menerima POST
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {

        jsonError("Invalid request.", 405);

    }
}