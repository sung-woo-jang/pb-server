import { Body, Controller, Get, HttpCode, Patch, Post, Query, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { OAuthStateGuard } from './guards/oauth-state.guard';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateNicknameDto, UserDto } from './dtos';
import { UserService } from './user.service';
import { SessionAuthGuard } from '@common/guards/session-auth.guard';
import { UserDocs } from './user.docs';

@ApiTags('auth(권한, 유저)')
@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private config: ConfigService
  ) {}

  @Get('my-info')
  async getMyInfo(@Session() session: Record<string, any>) {
    return await session.user;
  }

  @Get('/login-naver')
  getloginNaver(@Res() res: Response, @Session() session: Record<string, any>) {
    const state = randomBytes(8).toString('hex');
    session.stateCheck = {
      state,
      createAt: new Date(),
    };

    const url =
      'https://nid.naver.com/oauth2.0/authorize' +
      `?client_id=${this.config.get<string>('naver.clientId')}` +
      `&redirect_uri=${this.config.get<string>('naver.redirectUrl')}` +
      '&response_type=code' +
      `&state=${state}`;

    return res.redirect(url);
  }

  @Get('/login-naver/callback')
  @HttpCode(200)
  @ApiOperation(UserDocs.createCommentOperation())
  @ApiQuery(UserDocs.codeQuery())
  @ApiQuery(UserDocs.stateQuery())
  @ApiResponse(UserDocs.createUserResponse())
  @UseGuards(OAuthStateGuard)
  async getLoginNaverCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Session() session: Record<string, any>
  ) {
    return await this.authService.loginNaver(code, state).then(({ user, tokenData }) => {
      session.user = {
        id: user.id,
        // user_id: user.user_id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        profileImage: user.profileImage,
      };
      session.oauth = {
        refresh_token: tokenData.refresh_token,
        access_token: tokenData.access_token,
      };

      if (session.hasOwnProperty('stateCheck')) {
        delete session['stateCheck'];
      }

      return user;
    });
  }

  @Post('/logout')
  @HttpCode(200)
  postLogOut(@Session() session: Record<string, any>) {
    if (session.hasOwnProperty('user')) {
      delete session['user'];
    }
    if (session.hasOwnProperty('oauth')) {
      delete session['oauth'];
    }

    return null;
  }

  @Patch('/me')
  @HttpCode(200)
  @UseGuards(SessionAuthGuard)
  @ApiBody({ type: UpdateNicknameDto })
  async updateUserInfo(@Body() body: UpdateNicknameDto, @Session() session: Record<string, any>) {
    return await this.userService.updateUserInfo(body, session.user.id ?? null);
  }
}
