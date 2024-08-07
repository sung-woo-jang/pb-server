import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  @Cron('45 * * * * *')
  handleCron() {
    // this.logger.debug('Called when the current second is 45');
  }
}
