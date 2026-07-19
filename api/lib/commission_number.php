<?php

/*
|--------------------------------------------------------------------------
| Generate Commission Number
|--------------------------------------------------------------------------
*/

function generateCommissionNumber(): string
{
    $counterFile = __DIR__ . "/../data/commission_counter.txt";

    // Jika file belum ada, buat dengan nilai awal 0
    if (!file_exists($counterFile)) {

        file_put_contents(
            $counterFile,
            "0"
        );

    }

    $counter = (int) file_get_contents($counterFile);

    $counter++;

    file_put_contents(
        $counterFile,
        $counter
    );

    return
        "ST-"
        . date("Ymd")
        . "-"
        . str_pad(
            $counter,
            4,
            "0",
            STR_PAD_LEFT
        );
}