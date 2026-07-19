<?php


function createCommissionLog(
    PDO $pdo,
    int $commissionId,
    string $action,
    string $description = null
): void {


    $query = "
        INSERT INTO commission_logs
        (
            commission_id,
            action,
            description
        )

        VALUES
        (
            :commission_id,
            :action,
            :description
        )
    ";


    $stmt = $pdo->prepare($query);


    $stmt->execute([

        "commission_id" => $commissionId,

        "action" => $action,

        "description" => $description

    ]);

}