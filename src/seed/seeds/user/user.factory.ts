import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';
import { User } from '../../../modules/user/entities';
import { UserBuilder } from '../../../builder/user.builder';
import { Gender } from '../../../modules/user/entities/user.entity';

const UserFactory = localeKoSetSeederFactory(User, (faker) => {
  return new UserBuilder()
    .setId(faker.string.uuid())
    .setAgeRange(faker.helpers.arrayElement(['10-19', '20-29', '30-39', '40-49', '50-59']))
    .setBirthday(
      faker.date
        .birthdate()
        .toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
        .replaceAll('.', '')
        .split(' ')
        .join('-')
    )
    .setBirthyear(faker.date.birthdate().getFullYear().toString())
    .setGender(faker.helpers.arrayElement(Object.values(Gender)))
    .setEmail(faker.internet.email())
    .setMobile(faker.helpers.fromRegExp(/010-[0-9]{4}-[0-9]{4}/))
    .setName(faker.person.fullName())
    .setNickname(faker.internet.userName().substring(0, 19))
    .setProfileImage(faker.image.avatar())
    .build();
});

export default UserFactory;
