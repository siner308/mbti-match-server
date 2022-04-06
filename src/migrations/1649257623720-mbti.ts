import {MigrationInterface, QueryRunner} from "typeorm";

export class mbti1649257623720 implements MigrationInterface {
    name = 'mbti1649257623720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `match` (`id` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `sourceId` varchar(255) NOT NULL, `score` varchar(255) NOT NULL, `targetId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `groupId` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, `mbti` varchar(4) NOT NULL, UNIQUE INDEX `user_name` (`groupId`, `name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `group` (`id` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `match` ADD CONSTRAINT `FK_d4424b61035e2b0651abe794cf7` FOREIGN KEY (`sourceId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `match` ADD CONSTRAINT `FK_0e82934f0f0c9242bdf3ea03bcb` FOREIGN KEY (`targetId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_974590e8d8d4ceb64e30c38e051` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_974590e8d8d4ceb64e30c38e051`");
        await queryRunner.query("ALTER TABLE `match` DROP FOREIGN KEY `FK_0e82934f0f0c9242bdf3ea03bcb`");
        await queryRunner.query("ALTER TABLE `match` DROP FOREIGN KEY `FK_d4424b61035e2b0651abe794cf7`");
        await queryRunner.query("DROP TABLE `group`");
        await queryRunner.query("DROP INDEX `user_name` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `match`");
    }

}
