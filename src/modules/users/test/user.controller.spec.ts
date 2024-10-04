import { Test, TestingModule } from "@nestjs/testing";
import { CategoryController, CategoryService } from "@modules"

describe("CategoryController", () => {
    let categoryController: CategoryController;
    let categoryService: CategoryService;

    const mockCategoryService = {
        getAllCategories: jest.fn().mockResolvedValue([{ id: 1, name: "Burgers" }])
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [{ provide: CategoryService, useValue: mockCategoryService }]
        }).compile()

        categoryController = module.get<CategoryController>(CategoryController)
        categoryService = module.get<CategoryService>(CategoryService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("get all categories", async () => {
        const categories = await categoryController.getCategories()

        expect(categories).toHaveLength(1)
        expect(categories[0].name).toEqual("Burgers")
        expect(categoryService.getAllCategories).toHaveBeenCalled()
    })
})
