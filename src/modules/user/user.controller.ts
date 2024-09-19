import { Body, Controller, Get, HttpCode, Patch, Post, Query, Res, Session } from '@nestjs/common';
import { AuthService } from '@common/services/auth/auth.service';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateNicknameDto, UserDto } from './dtos';
import { UserService } from './user.service';
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
  getLoginNaver(@Res() res: Response, @Session() session: Record<string, any>) {
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
  async getLoginNaverCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Session() session: Record<string, any>,
    @Res() res: Response
  ) {
    try {
      const { user, tokenData } = await this.authService.loginNaver(code, state);

      session.user = {
        id: user.id,
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

      res.send(`
      <html>
      <body>
        <script>
          window.opener.postMessage('login_success', '*');
          window.close();
        </script>
      </body>
      </html>
    `);
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).send(`
      <html>
      <body>
        <script>
          window.opener.postMessage('login_failed', '*');
          window.close();
        </script>
      </body>
      </html>
    `);
    }
  }

  @Post('/logout')
  @HttpCode(200)
  async postLogOut(@Session() session: Record<string, any>, @Res() response: Response) {
    try {
      // 세션 전체를 파괴
      await new Promise<void>((resolve, reject) => {
        session.destroy((err) => {
          if (err) reject(err);
          resolve();
        });
      });

      // 세션 ID 쿠키 제거
      response.clearCookie('connect.sid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return response.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      return response.status(500).json({ message: 'Logout failed' });
    }
  }

  @Patch('/me')
  @HttpCode(200)
  @ApiBody({ type: UpdateNicknameDto })
  async updateUserInfo(@Body() body: UpdateNicknameDto, @Session() session: Record<string, any>) {
    return await this.userService.updateUserInfo(body, session.user.id ?? null);
  }
}
