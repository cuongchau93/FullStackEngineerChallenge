import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";

export class InitialSeed1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let admin = new User();
    admin.username = "admin";
    admin.password = "admin";
    admin.hashPassword();
    admin.role = "ADMIN";

    let user = new User();
    user.username = "user1";
    user.password = "user1";
    user.hashPassword();
    user.role = "EMPLOYEE";

    let user2 = new User();
    user2.username = "user2";
    user2.password = "user2";
    user2.hashPassword();
    user2.role = "EMPLOYEE";
 
    const userRepository = getRepository(User);
    await userRepository.save(admin);
    await userRepository.save(user2);
    await userRepository.save(user);

    let feedback = new Feedback();
    feedback.description = "very good";
    feedback.givenBy = user2;
    feedback.belongsTo = user;

    const feedbackRepository = getRepository(Feedback);
    await feedbackRepository.save(feedback);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}