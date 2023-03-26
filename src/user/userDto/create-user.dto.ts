import {IsEmail, IsNotEmpty, IsNumberString} from 'class-validator'
import {IntersectionType, OmitType, PartialType, PickType} from '@nestjs/mapped-types'
import {Exclude} from 'class-transformer'

export class CreateUserDto{
  readonly name: string

  @Exclude()
  readonly password: string
  readonly lastName: string
  
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial)
  }

}


