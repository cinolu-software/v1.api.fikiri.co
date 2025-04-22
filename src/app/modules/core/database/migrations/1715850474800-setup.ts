import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1715850474800 implements MigrationInterface {
  name = 'Setup1715850474800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_4a39e6ac0cecdf18307a365cf3c\``);
    await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_a284c7d0e548d1de6aa41914057\``);
    await queryRunner.query(`ALTER TABLE \`feedback\` CHANGE \`comment\` \`comment\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`feedback\` CHANGE \`userId\` \`userId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`feedback\` CHANGE \`statusId\` \`statusId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_659711c5971695cda97f7db52a2\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_642763a1acbc9672d38429ea62a\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`poleId\` \`poleId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`organisationId\` \`organisationId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_e69d86ad179c4a0389ed2860880\``);
    await queryRunner.query(`ALTER TABLE \`image\` CHANGE \`solutionId\` \`solutionId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_862e489eed12657e44366d463d9\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_2ec64e0e6d4845d0ee0f1b9e232\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_c60ee1656ee14bd7d6aa75968e3\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_577971bf35a3f85b2d6edd8329e\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_ed090fd84e131ffea722335fe99\``);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`video_link\` \`video_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`eventId\` \`eventId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`statusId\` \`statusId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`thematicId\` \`thematicId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`userId\` \`userId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`poleId\` \`poleId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`quotation\` CHANGE \`average\` \`average\` float NULL`);
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_4a39e6ac0cecdf18307a365cf3c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_a284c7d0e548d1de6aa41914057\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_659711c5971695cda97f7db52a2\` FOREIGN KEY (\`poleId\`) REFERENCES \`pole\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_642763a1acbc9672d38429ea62a\` FOREIGN KEY (\`organisationId\`) REFERENCES \`organisation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_e69d86ad179c4a0389ed2860880\` FOREIGN KEY (\`solutionId\`) REFERENCES \`solution\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_862e489eed12657e44366d463d9\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_2ec64e0e6d4845d0ee0f1b9e232\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_c60ee1656ee14bd7d6aa75968e3\` FOREIGN KEY (\`thematicId\`) REFERENCES \`thematic\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_577971bf35a3f85b2d6edd8329e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_ed090fd84e131ffea722335fe99\` FOREIGN KEY (\`poleId\`) REFERENCES \`pole\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_ed090fd84e131ffea722335fe99\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_577971bf35a3f85b2d6edd8329e\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_c60ee1656ee14bd7d6aa75968e3\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_2ec64e0e6d4845d0ee0f1b9e232\``);
    await queryRunner.query(`ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_862e489eed12657e44366d463d9\``);
    await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_e69d86ad179c4a0389ed2860880\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_642763a1acbc9672d38429ea62a\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_659711c5971695cda97f7db52a2\``);
    await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_a284c7d0e548d1de6aa41914057\``);
    await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_4a39e6ac0cecdf18307a365cf3c\``);
    await queryRunner.query(`ALTER TABLE \`quotation\` CHANGE \`average\` \`average\` float(12) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`poleId\` \`poleId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`thematicId\` \`thematicId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`statusId\` \`statusId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`solution\` CHANGE \`eventId\` \`eventId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`solution\` CHANGE \`video_link\` \`video_link\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_ed090fd84e131ffea722335fe99\` FOREIGN KEY (\`poleId\`) REFERENCES \`pole\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_577971bf35a3f85b2d6edd8329e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_c60ee1656ee14bd7d6aa75968e3\` FOREIGN KEY (\`thematicId\`) REFERENCES \`thematic\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_2ec64e0e6d4845d0ee0f1b9e232\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_862e489eed12657e44366d463d9\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`image\` CHANGE \`solutionId\` \`solutionId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_e69d86ad179c4a0389ed2860880\` FOREIGN KEY (\`solutionId\`) REFERENCES \`solution\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`organisationId\` \`organisationId\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`poleId\` \`poleId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_642763a1acbc9672d38429ea62a\` FOREIGN KEY (\`organisationId\`) REFERENCES \`organisation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_659711c5971695cda97f7db52a2\` FOREIGN KEY (\`poleId\`) REFERENCES \`pole\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`feedback\` CHANGE \`statusId\` \`statusId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`feedback\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`feedback\` CHANGE \`comment\` \`comment\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_a284c7d0e548d1de6aa41914057\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_4a39e6ac0cecdf18307a365cf3c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
