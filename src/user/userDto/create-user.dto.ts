import {IsEmail, IsNotEmpty, IsNumberString} from 'class-validator'
import {IntersectionType, OmitType, PartialType, PickType} from '@nestjs/mapped-types'

export class CreateUserDto{
  readonly name: string
  readonly password: string
  readonly lastName: string

}
export class CreateColorsDto{
  readonly color: string
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['name'] as const)
) {}