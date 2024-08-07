import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../../modules/user/entities';
import { Gender } from '../../../modules/user/entities/user.entity';
import { generateRandomInteger } from '@common/utils/generateRandomInteger';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    if (
      !(await dataSource.getRepository(User).findOne({ where: { id: 'rl09VdoqlP-Bsx-3j38H1G1iHUo-o2-swqMGi2JZhGA' } }))
    ) {
      await factoryManager.get(User).save({
        id: 'rl09VdoqlP-Bsx-3j38H1G1iHUo-o2-swqMGi2JZhGA',
        ageRange: '20-29',
        birthday: '06-24',
        birthyear: '1996',
        gender: Gender.M,
        email: 'seastory624@naver.com',
        mobile: '010-7637-0624',
        nickname: 'seastor****',
        profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
      });
    }
    await factoryManager.get(User).saveMany(generateRandomInteger(2, 5));
  }
}
