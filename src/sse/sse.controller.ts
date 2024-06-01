import { Public } from '@common/decorators/skip-auth.decorator';
import { Controller, Get } from '@nestjs/common';

@Public()
@Controller('sse')
export class SseController {
  @Get()
  sse() {

    return 'hello world';
  }
}
