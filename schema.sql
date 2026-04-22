CREATE TABLE IF NOT EXISTS `messages` (
    `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(100)    NOT NULL,
    `email`      VARCHAR(150)    NOT NULL,
    `subject`    VARCHAR(200)    NOT NULL,
    `message`    TEXT            NOT NULL,
    `ip_address` VARCHAR(45)     DEFAULT NULL COMMENT 'IPv4 or IPv6',
    `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_email`      (`email`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Pesan masuk dari form kontak portfolio';
