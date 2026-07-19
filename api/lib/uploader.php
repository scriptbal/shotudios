<?php

function uploadReferences(): array
{
    $uploadedFiles = [];
    $uploadedOriginalNames = [];
    $uploadedMeta = [];

    $relativeDir = "assets/uploads/" . date("Y/m") . "/";
    $uploadDir = __DIR__ . "/../../" . $relativeDir;

    if (!is_dir($uploadDir)) {

        mkdir($uploadDir, 0755, true);

    }

    $allowedExtensions = [
        "jpg",
        "jpeg",
        "png",
        "mp3",
        "wav"
    ];

    if (!isset($_FILES["references"])) {

        return [

            "files" => [],
            "original_names" => [],
            "meta" => [],
            "upload_dir" => $uploadDir

        ];

    }

    foreach ($_FILES["references"]["tmp_name"] as $i => $tmp) {

        if (empty($tmp)) {
            continue;
        }

        if ($_FILES["references"]["error"][$i] !== UPLOAD_ERR_OK) {
            continue;
        }

        $original = basename($_FILES["references"]["name"][$i]);

        $extension = strtolower(
            pathinfo($original, PATHINFO_EXTENSION)
        );

        if (!in_array($extension, $allowedExtensions)) {
            continue;
        }

        $size = $_FILES["references"]["size"][$i];

        if ($size > 20 * 1024 * 1024) {
            continue;
        }

        $filename = uniqid("ref_", true) . "." . $extension;

        if (
            move_uploaded_file(
                $tmp,
                $uploadDir . $filename
            )
        ) {

            $uploadedFiles[] = $filename;

            $uploadedOriginalNames[] = $original;

$uploadedMeta[] = [

    "stored_name"   => $filename,

    "original_name" => $original,

    "path" => "assets/uploads/" . date("Y/m") . "/" . $filename,

    "size" => $_FILES["references"]["size"][$i]

];

        }

    }

    return [

        "files" => $uploadedFiles,

        "original_names" => $uploadedOriginalNames,

        "meta" => $uploadedMeta,

        "upload_dir" => $uploadDir

    ];
}