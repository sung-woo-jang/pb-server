import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CodeService } from './code.service';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { AllCodesResponseDto } from './dto/response/all-codes-response.dto';

@ApiTags('CODE TABLE (코드 테이블 관련)')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all codes' })
  @ApiResponse({ status: 200, description: 'Return all codes' })
  @Serialize(AllCodesResponseDto)
  async getAllCodes() {
    return this.codeService.getAllCodes();
  }
}
