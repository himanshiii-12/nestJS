import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class User {
   @Prop()
   firstname: string;
   @Prop()
   lastname: string;
   @Prop()
   password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);