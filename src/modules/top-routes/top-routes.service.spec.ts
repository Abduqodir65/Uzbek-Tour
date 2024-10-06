import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './top-routes.controller';
import { RoutesService } from './top-routes.service';
import { CreateRouteDto } from './dtos';

describe('RouteController', () => {
    let routeController: RoutesController;
    let routeService: RoutesService;

    const mockRoutesService = {
        getAllRoutes: jest.fn(),
        createRoute: jest.fn(),
        updateRoute: jest.fn(),
        deleteRoute: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoutesController],
            providers: [
                {
                    provide: RoutesService,
                    useValue: mockRoutesService,
                },
            ],
        }).compile();

        routeController = module.get<RoutesController>(RoutesController);
        routeService = module.get<RoutesService>(RoutesService);
    });

    it('should be defined', () => {
        expect(routeController).toBeDefined();
    });

    it('should return all galleries', async () => {
        const result = [{ id: 1, name: 'jizax', description: "juda chiroyli shahar", image: 'image.png' }];
        mockRoutesService.getAllRoutes.mockResolvedValue(result);

        expect(await routeController.getAllRoutes()).toBe(result);
    });

    it('should create a new route', async () => {
        const createRouteDto: CreateRouteDto = {
            description: "juda chiroyli shahar",
            image: "image.png",
            name: "Jizax"
        };
        const result = { ...createRouteDto, id: 1 };

        mockRoutesService.createRoute.mockResolvedValue(result);

        const file = {
            buffer: Buffer.from('data'),
            fieldname: 'image',
            originalname: 'image.png',
            encoding: '7bit',
            mimetype: 'image/png',
            size: 12345,
            destination: '',
            filename: 'image.png',
            path: '',
            stream: null,
        } as Express.Multer.File;

        expect(await routeController.createRoute(createRouteDto, file)).toBe(result);

        expect(mockRoutesService.createRoute).toHaveBeenCalledWith(createRouteDto, expect.anything());
    });

    it('should update a gallery', async () => {
        const updatePayload = { id: 1, name: 'jizax', description: "juda hunik shahar", image: 'image.png' };
        const result = { id: 1, ...updatePayload };

        mockRoutesService.updateRoute.mockResolvedValue(result);

        expect(await routeController.updateRoute('1', updatePayload)).toBe(result);
    });

    it('should delete a gallery', async () => {
        const responseMessage = { message: 'Route deleted successfully' };
        mockRoutesService.deleteRoute.mockResolvedValue(responseMessage);

        expect(await routeController.deleteRoute('1')).toBe(responseMessage);
    });
});
