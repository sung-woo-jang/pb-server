import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { NaverOAuthService } from './naver-oauth.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private naverOAuthService: NaverOAuthService
  ) {}

  async signinNaver(code: string, state: string) {
    const { tokenData, naverUserInfo } = await this.naverOAuthService.getNaverUserInfo(code, state);

    let user = await this.userService.findById(naverUserInfo.id);
    if (!user) {
      // 이메일이 존재하지 않는 경우 새 사용자 생성
      user = await this.userService.createUser({
        id: naverUserInfo.id,
        ageRange: naverUserInfo.age,
        birthday: naverUserInfo.birthday,
        birthyear: naverUserInfo.birthyear,
        gender: naverUserInfo.gender,
        mobile: naverUserInfo.mobile,
        name: naverUserInfo.name,
        nickname: naverUserInfo.nickname,
        email: naverUserInfo.email,
        profileImage: naverUserInfo.profile_image,
      });
    }

    return { user, tokenData };
  }
}
