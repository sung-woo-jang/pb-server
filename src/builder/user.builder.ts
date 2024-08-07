import { BuilderCommon } from './builder';
import { User } from '../modules/user/entities';
import { Gender } from '../modules/user/entities/user.entity';

export class UserBuilder extends BuilderCommon<User> {
  constructor() {
    super(User);
  }

  setId(id: string): UserBuilder {
    this.object.id = id;
    return this;
  }

  setAgeRange(ageRange: string): UserBuilder {
    this.object.ageRange = ageRange;
    return this;
  }
  setBirthday(birthday: string): UserBuilder {
    this.object.birthday = birthday;
    return this;
  }
  setBirthyear(birthyear: string): UserBuilder {
    this.object.birthyear = birthyear;
    return this;
  }
  setGender(gender: Gender): UserBuilder {
    this.object.gender = gender;
    return this;
  }
  setEmail(email: string): UserBuilder {
    this.object.email = email;
    return this;
  }
  setMobile(mobile: string): UserBuilder {
    this.object.mobile = mobile;
    return this;
  }
  setName(name: string): UserBuilder {
    this.object.name = name;
    return this;
  }
  setNickname(nickname: string): UserBuilder {
    this.object.nickname = nickname;
    return this;
  }
  setProfileImage(profileImage: string): UserBuilder {
    this.object.profileImage = profileImage;
    return this;
  }
}
