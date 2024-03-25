import { AppService } from './app.service';
// receives req like post and get
import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";
import { WinstonLogger } from 'src/winston.logger';

@Controller('user')
export class AppController {
    
    constructor(
        private appService: AppService,
        private logger: WinstonLogger,
        ){}

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
   try {
     const newUser = await this.appService.createUser(createUserDto);
     this.logger.info('Added a User successfully');
     return response.status(HttpStatus.CREATED).json({
     message: 'User has been created successfully',
     newUser,});
  } catch (err) {
    this.logger.error('Failed to new user', err.stack);
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: User not created!',
     error: 'Bad Request'
  });
  }
 }

 @Get()
async getAllUser(@Res() response) {
try {
  const userData = await this.appService.getAllUser();
  this.logger.info('Fetched all users successfully');
  return response.status(HttpStatus.OK).json({
  message: 'All user data found successfully',userData,});
 } catch (err) {
    this.logger.error('Failed to fetch users', err.stack);
  return response.status(err.status).json(err.response);
 }
}

}