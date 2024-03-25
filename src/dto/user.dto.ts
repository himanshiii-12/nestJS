import { IsNotEmpty, IsString} from "class-validator";
export class CreateUserDto {
    @IsString()
   
    @IsNotEmpty()
     firstname: string;

    @IsString()
   
    @IsNotEmpty()
     lastname: string;

    @IsString()
   
    @IsNotEmpty()
     password: string;
   
}