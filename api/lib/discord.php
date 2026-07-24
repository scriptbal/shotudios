<?php

require_once __DIR__ . "/response.php";


error_log(print_r($_FILES, true));

function sendDiscord(
    string $commissionNumber,
    array $data,
    array $uploadedFiles,
    array $uploadedOriginalNames
): void {

    // Bersihkan description
    $data['description'] = str_replace(
        "```",
        "'''",
        $data['description']
    );

    $data['description'] = mb_substr(
        $data['description'],
        0,
        1000
    );

    /*
    |--------------------------------------------------------------------------
    | Discord Payload
    |--------------------------------------------------------------------------
    */

    $payload = [

        "allowed_mentions" => [
            "parse" => []
        ],

        "embeds" => [[

            "title" => "📩 New Commission",

            "fields" => [

                [

                    "name" => "Commission ID",

                    "value" => $commissionNumber,

                    "inline" => true

                ]

            ],

            "color" => hexdec("3B82F6"),

            "description" =>
                "**🆔 Commission**\n{$commissionNumber}\n\n".
                "**👤 Client**\n{$data['name']}\n\n".
                "**📱 Contact**\n{$data['contact']}\n\n".
                "**🎨 Service**\n{$data['service']}\n\n".
                "**📦 Package**\n{$data['package']}\n\n".
                "**💰 Price**\n$" .
                    number_format((float)$data["price"],0) .
                    " / Rp " .
                    number_format((int)$data["price_idr"],0,",",".") .
                    "\n\n".
                "**⏳ Delivery**\n{$data['delivery']}\n\n".
                "**📝 Description**\n```{$data['description']}```\n\n".
                "**📎 References**\n".
                (
                    empty($uploadedOriginalNames)
                        ? "No files"
                        : "• " . implode("\n• ", $uploadedOriginalNames)
                ),

            "footer" => [
                "text" => "Shotudios Commission System"
            ],

            "timestamp" => gmdate("c")

        ]]

    ];

    /*
    |--------------------------------------------------------------------------
    | Send
    |--------------------------------------------------------------------------
    */

    $payloadJson = json_encode($payload);

    $post = [

        "payload_json" => $payloadJson

    ];

foreach ($uploadedFiles as $index => $file) {

    if(
    file_exists($file) &&
    is_readable($file)
){

$post["files[$index]"] = new CURLFile(

    $file,

    mime_content_type($file) ?: "application/octet-stream",

    $uploadedOriginalNames[$index]

);

    }

}

    $ch = curl_init(DISCORD_WEBHOOK);

    curl_setopt_array($ch, [

        CURLOPT_POST => true,

        CURLOPT_RETURNTRANSFER => true,

        CURLOPT_POSTFIELDS => $post

    ]);

    $response = curl_exec($ch);

    $status = curl_getinfo(
        $ch,
        CURLINFO_HTTP_CODE
    );

    $error = curl_error($ch);

    curl_close($ch);

    if ($error) {

        jsonError($error);

    }

    if ($status < 200 || $status >= 300) {

        jsonError(

            "Discord returned HTTP {$status}",

            400,

            [

                "response" => $response

            ]

        );

    }

}