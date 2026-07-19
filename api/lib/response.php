<?php

/*
|--------------------------------------------------------------------------
| JSON Success Response
|--------------------------------------------------------------------------
*/

function jsonSuccess(array $data = []): void
{
    http_response_code(200);

    echo json_encode(
        array_merge(
            [
                "success" => true
            ],
            $data
        )
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| JSON Error Response
|--------------------------------------------------------------------------
*/

function jsonError(string $message, int $statusCode = 400, array $extra = []): void
{
    http_response_code($statusCode);

    echo json_encode(
        array_merge(
            [
                "success" => false,
                "message" => $message
            ],
            $extra
        )
    );

    exit;
}