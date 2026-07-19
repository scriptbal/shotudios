<?php

declare(strict_types=1);

final class CommissionStatus
{
    public const PENDING = "pending";
    public const REJECTED = "rejected";
    public const IN_PROGRESS = "in_progress";
    public const REVISION = "revision";
    public const COMPLETED = "completed";
    public const ARCHIVE = "archive";





    /**
     * Semua status yang tersedia
     */
    public static function all(): array
    {
        return [

            self::PENDING,

            self::REJECTED,

            self::IN_PROGRESS,

            self::REVISION,

            self::COMPLETED,

            self::ARCHIVE

        ];
    }

    /**
     * Label yang ditampilkan di UI
     */

        public static function label(string $status): string
            {
                return match ($status) {


                    self::PENDING => "Pending",


                    self::REJECTED => "Rejected",


                    self::IN_PROGRESS => "In Progress",


                    self::REVISION => "Revision",


                    self::COMPLETED => "Completed",


                    self::ARCHIVE => "Archive",


                    default => "Unknown"

                };
            }










    /**
     * Teks tombol berdasarkan status tujuan
     */
        public static function actionText(string $status): string
        {
            return match ($status) {


                self::IN_PROGRESS => "Start Commission",


                self::REVISION => "Request Revision",


                self::COMPLETED => "Mark Completed",


                self::REJECTED => "Reject Commission",


                self::ARCHIVE => "Archive Commission",


                default => "Update Status"

            };
        }

    /**
     * Alias agar kompatibel dengan halaman lama
     */
    public static function actionLabel(
        string $current,
        string $target
    ): string {
        return self::actionText($target);
    }

/**
 * Workflow Commission
 *
 * Pending
 * ├──► Rejected
 * ├──► Archive
 * └──► In Progress
 *          ├──► Revision
 *          ├──► Completed
 *          └──► Archive
 *
 * Revision
 * ├──► Completed
 * └──► Archive
 *
 * Completed
 * └──► Archive
 *
 * Rejected
 * └──► Archive
 */
    

    public static function availableTransitions(string $status): array
{
    return match ($status) {


        self::PENDING => [
            self::IN_PROGRESS,
            self::REJECTED,
            self::ARCHIVE
        ],


        self::IN_PROGRESS => [
            self::REVISION,
            self::COMPLETED,
            self::ARCHIVE
        ],


        self::REVISION => [
            self::COMPLETED,
            self::ARCHIVE
        ],


        self::COMPLETED => [
            self::ARCHIVE
        ],


        self::REJECTED => [
            self::ARCHIVE
        ],


        self::ARCHIVE => [],


        default => []

    };
}







    /**
     * Validasi perpindahan status
     */
    public static function canMove(
        string $current,
        string $target
    ): bool {
        return in_array(
            $target,
            self::availableTransitions($current),
            true
        );
    }

    /**
     * Mengecek apakah status sudah final
     */
    public static function isFinal(string $status): bool
    {
        return in_array(
            $status,
                [
                    self::COMPLETED,
                    self::REJECTED,
                    self::ARCHIVE
                ],
            true
        );
    }
}