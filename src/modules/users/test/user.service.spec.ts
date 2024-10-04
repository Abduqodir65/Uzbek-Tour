import { getModelToken } from "@nestjs/sequelize"
import { User } from "../schemas"
import { UserService } from "../user.service"
import { Test, TestingModule } from "@nestjs/testing"

describe("UserService", () => {
    let userService: UserService
    let mockUserModel: Partial<typeof User>

    beforeEach(async () => {
        mockUserModel = {
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: "Abduqodir" }]),
            create: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                { provide: getModelToken(User), useValue: mockUserModel }]
        }).compile()

        userService = module.get<UserService>(UserService)
    });

    it("user service should be defined", () => {
        expect(userService).toBeDefined
    })

    it("should be return user list", async () => {
        const users = await userService.getAllUsers()
        expect(users).toHaveLength(1)
        expect(users[0].name).toEqual("Abduqodir")
    })

    it("should be a user and return undefiend", async () => {
        // const res = await userService.createUser({ name: "Abduqodir",age: 15,country:"Uzbekistan",email:"abduqodiirr@gmail.com",role:"user", image:"image.png"  })
        // expect(res).toBeUndefined()

    })


})