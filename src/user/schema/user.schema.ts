import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument  } from "mongoose";




export const UserSchema = new mongoose.Schema ({
  name: {type: String},
  password: {type: String}
})


export type UserType = {
  name: string,
  password: string
}