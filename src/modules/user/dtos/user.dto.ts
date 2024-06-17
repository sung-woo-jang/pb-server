import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// 클라이언트에서 가지고 있을 데이터
export class UserDto {
  @ApiProperty({
    example: 'i_lh7S67bW5tD5_asQdJB6AFrRTcvb4c9ew5iHzsvDw',
    description: '사용자 ID',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: '20-29', description: '사용자 나이대' })
  @Expose()
  ageRange: string;

  @ApiProperty({ example: '12-05', description: '사용자 생일' })
  @Expose()
  birthday: string;

  @ApiProperty({ example: '2000', description: '사용자 생년' })
  @Expose()
  birthyear: string;

  @ApiProperty({ example: 'M', description: '사용자 성별' })
  @Expose()
  gender: string;

  @ApiProperty({ example: 'plavBuds@naver.com', description: '사용자 이메일' })
  @Expose()
  email: string;

  @ApiProperty({ example: '010-1234-5678', description: '사용자 휴대폰 번호' })
  @Expose()
  mobile: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  @Expose()
  name: string;

  @ApiProperty({ example: '동에번쩍', description: '사용자가 네이버에서 설정한 닉네임' })
  @Expose()
  nickname: string;

  @ApiProperty({
    example: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    description: '사용자가 네이버에서 설정한 이미지 URL',
  })
  @Expose()
  profileImage: string;
}
