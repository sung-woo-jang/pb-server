import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly dataSource: DataSource
  ) {}

  private readonly logger = new Logger('SEE');

  async seed() {
    const users = [
      {
        id: 'testUser',
        password: 'testUser',
        name: 'testUser',
        nickname: 'user',
        email: 'user@example.com',
      },
      {
        id: 'testAdmin',
        password: 'testAdmin',
        name: 'testAdmin',
        nickname: 'admin',
        email: 'admin@example.com',
      },
    ];

    this.logger.log('초기 데이터 세팅 시작');

    for (const user of users) {
      // const existingUser = await this.userRepository.findOne({
      //   where: { email: user.email },
      // });
      const existingUser = await this.userService.findById(user.id);

      if (!existingUser) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          // await this.authService.signup(queryRunner.manager, user);
          await queryRunner.commitTransaction();
        } catch (error) {
          await queryRunner.rollbackTransaction();
        } finally {
          if (!queryRunner.isReleased) {
            await queryRunner.release();
          }
        }
      }
    }

    this.logger.log('초기 데이터 세팅 끝');
  }
}
