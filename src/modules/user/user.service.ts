import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserException } from '../../exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findById(id: string): Promise<User> {
    return await this.repo.findOneBy({ id });
  }

  async updateUserInfo(attrs: Partial<User>, id: string): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw UserException.userNotFound();
    }

    Object.assign(user, attrs);

    return await this.repo.save(user);
  }

  async createUser(attrs: Partial<User>): Promise<User> {
    return await this.repo.save(attrs);
  }
}
