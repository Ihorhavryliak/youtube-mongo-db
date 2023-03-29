import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout } from "@nestjs/schedule";




@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

// @Timeout(5000)
  handleCron(){
    this.logger.debug('Called when the current second is 1')
    console.log('1')
  }
}