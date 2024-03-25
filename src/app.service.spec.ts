import { Document, Model, Types } from "mongoose";
import { AppService } from "./app.service";
import { IUser } from "./interface/user.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "./user/user.schema";
import { Query } from 'mongoose'; 
import { CreateUserDto } from "./dto/user.dto";

describe('AppService', ()=>{
    let appService: AppService;
    let model: Model<IUser>;

    const mockAppService={
        find: jest.fn(),
        create: jest.fn()
    };

    const mockUser={
        // _id: '65f83e12cd084c5d78531049',
        firstname:"Himanshi",
        lastname:"Rathore",
        password:"qwerty",
        // __v:0
    };
    beforeEach(async() =>{
        const module: TestingModule= await Test.createTestingModule({
            providers:[AppService,
            {
                provide: getModelToken(User.name),
                useValue: mockAppService,
            },
        ],
        }).compile();
        appService=module.get<AppService>(AppService);
        model=module.get<Model<IUser>>(getModelToken(User.name));
    })

    // describe('getAllUser', ()=>{
    //     it('should return an array of users', async ()=>{
    //         const result=['test'];
    //         jest.spyOn(model,'find').mockImplementation(()=>result);
            
    //         // expect(await model.find()).toBe(result);
    //         expect(await result).toBe([mockUser]);
    //     })
    // })

//     describe('getAllUser', () => {
//     it('should return an array of users', async () => {
//         // const result = [{ firstname: "Himanshi", lastname: "Rathore", password: "qwerty" }];
//         const result = [mockUser];
//         jest.spyOn(model, 'find').mockReturnValue({ exec: jest.fn().mockResolvedValue(result) } as any);
        
//         const users = await appService.getAllUser();
        
//         expect(users).toBe(result);
//     });
// });

    // Import Query type if not already imported

    describe('getAllUser', () => {
        it('should return an array of users', async () => {
            const result: Query<unknown[], unknown, {}, IUser, "find"> = model.find(); // Explicitly specify type
            jest.spyOn(model, 'find').mockImplementation(() => result);
    
            // expect(await model.find()).toBe(result);
            expect(await model.find()).toBe(result);
        })
    })
    
//     describe('createUser', ()=>{
//       it('user should be crested', async() =>{
//          const newUser ={
//            firstname: " new User",
//            lastname: "new User",
//            password: "new password"
//          };
//         //  jest.spyOn(model, 'create')
//         //  .mockImplementationOnce(()=> Promise.resolve(mockUser));
//         const mockUserDocument: Document<IUser> = new model(mockUser) as Document<IUser>;
// jest.spyOn(model, 'create').mockImplementationOnce(() =>  Promise.resolve(mockUser));
//          const result= await appService. createUser(newUser as CreateUserDto);
//          expect(result).toEqual(mockUser);
         
//       });
//     });

// describe('createUser', () => {
//   it('user should be created', async () => {
//     const newUser = {
//       firstname: "new User",
//       lastname: "new User",
//       password: "new password"
//   } as Document<unknown, {}, IUser> & IUser & {
//       _id: Types.ObjectId; // Assuming _id is also present in IUser
//   };
//       // Create a mock document instance that conforms to the expected return type
//       // const mockUserDocument: Document<IUser> = new model(newUser) as Document<IUser>;

//       // Mock the `create` method to return the mock document instance
//       jest.spyOn(model, 'create').mockImplementationOnce(()=>Promise.resolve(mockUser));

//       // Call the createUser method
//       const result = await appService.createUser(newUser as CreateUserDto);

//       // Assert that the result matches the mock user
//       expect(result).toEqual(mockUser);
//   });

describe('createUser', () => {
  it('user should be created', async () => {
      const newUser = {
          firstname: "new User",
          lastname: "new User",
          password: "new password"
      } as Document<unknown, {}, IUser> & IUser & {
          _id: Types.ObjectId; // Assuming _id is also present in IUser
      };
      
      // Mock the `create` method to return a promise that resolves to the mock user
      jest.spyOn(model, 'create').mockResolvedValueOnce([newUser]);
      
      // Call the createUser method
      const result = await appService.createUser(newUser as CreateUserDto);
      
      // Assert that the result matches the mock user
      expect(result).toEqual([newUser]);
  });
});

});




//appService and model will be used for unit testing
//the above code is the boilerplate
