import { OnQueueActive, OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Logger, Scope } from "@nestjs/common";
import { Job } from "bull";




@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name)

  @Process({name: 'transcode', concurrency: 2})
  async handleTranscode (job: Job){

      let progress = 0;
      for (let i = 0; i < 100; i++) {

        progress += 1;
        await job.progress(progress);
      }
      return {progress};
  }

  @OnQueueActive()
  onActive(job: Job){
    console.log(job.id)
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any){
    console.log(job.id, result)
  }

}