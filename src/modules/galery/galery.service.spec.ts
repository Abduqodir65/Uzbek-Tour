import { getModelToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing"
import { CategoryService, Category } from "@modules";

describe("CategoryService", () => {
    let service: CategoryService;

    const categoryMockModel = {
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryService, {provide: getModelToken(Category), useValue: categoryMockModel}]
        }).compile()

        service = module.get<CategoryService>(CategoryService)
    })

    it("should be defined", async () => {
        expect(service).toBeDefined()
    })

    it("should return category", async () => {
        const responseData = [{id: 1, name: "New category"}]
        categoryMockModel.findAll.mockResolvedValue(responseData)

        const categories = await service.getAllCategories()
        expect(categories).toHaveLength(responseData.length)
        expect(categories).toMatchObject(responseData)
        expect(categoryMockModel.findAll).toHaveBeenCalled()
    })

    it("should create new category", async () => {
        const createCategoryDto = {name: "New category"}
        const responseData = {...createCategoryDto, id: 1}
        
        categoryMockModel.create.mockResolvedValue(responseData)

        const response = await service.createCategory(createCategoryDto)

        expect(response.id).toEqual(1)
        expect(response.name).toEqual(createCategoryDto.name)
        expect(categoryMockModel.create).toHaveBeenCalled()
    })
})