import { TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { Test } from "@nestjs/testing"

describe("UserController", async () => {
    let userController: UserController
    let userService: UserService

    const mockUserService = {
        getAllUsers: jest.fn().mockReturnValue([{id:1,user:"Abduqodir"}])
    }

})