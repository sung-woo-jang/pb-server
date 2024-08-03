import { Injectable } from '@nestjs/common';
import { User } from './entities';
import { UserException } from '../../exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUserInfo(attrs: Partial<User>, id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw UserException.notFound();
    }

    Object.assign(user, attrs);

    return await this.userRepository.save(user);
  }

  async createUser(attrs: Partial<User>): Promise<User> {
    return await this.userRepository.save(attrs);
  }
}
