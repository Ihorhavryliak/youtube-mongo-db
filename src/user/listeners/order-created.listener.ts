import { UserCreateEvent } from './../events/user-created.event';

import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';




@Injectable()
export class UserCreatedListener {
  @OnEvent('**', {async: true})
  userCreateEvent (event: UserCreateEvent) {
    console.log(event)
  }
}

