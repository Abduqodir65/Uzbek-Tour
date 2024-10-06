import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController, CategoryService } from '@modules';

describe('CategoryController', () => {
    let categoryController: CategoryController;
    let categoryService: CategoryService;

    const mockCategoryService = {
        getAllCategories: jest.fn(),
        createCategory: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [
                {
                    provide: CategoryService,
                    useValue: mockCategoryService,
                },
            ],
        }).compile();

        categoryController = module.get<CategoryController>(CategoryController);
        categoryService = module.get<CategoryService>(CategoryService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Har bir testdan keyin mock'larni tozalash
    });

    describe('findAll', () => {
        it('should return an array of categories', async () => {
            const categories: any[] = [{ id: 1, name: 'Category1' }];
            mockCategoryService.getAllCategories.mockResolvedValue(categories);

            const result = await categoryController.getCategories();
            expect(result).toEqual(categories);
            expect(categoryService.getAllCategories).toHaveBeenCalled();
        });
    });


    describe('create', () => {
        it('should create a new category', async () => {
            const category = { id: '1', name: 'New Category' };
            const createCategoryDto = { name: 'New Category' };
            mockCategoryService.createCategory.mockResolvedValue(category);

            const result = await categoryController.createCategory(createCategoryDto);
            expect(result).toEqual(category);
            expect(categoryService.createCategory).toHaveBeenCalledWith(createCategoryDto);
        });
    });
});