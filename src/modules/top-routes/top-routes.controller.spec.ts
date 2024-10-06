import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './top-routes.controller';
import { RoutesService } from './top-routes.service';

describe('RoutesController', () => {
    let routeController: RoutesController;
    let routeService: RoutesService;

    const mockRouteService = {
        getAllRoutes: jest.fn(),
        createRoute: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoutesController],
            providers: [
                {
                    provide: RoutesService,
                    useValue: mockRouteService,
                },
            ],
        }).compile();

        routeController = module.get<RoutesController>(RoutesController);
        routeService = module.get<RoutesService>(RoutesService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Har bir testdan keyin mock'larni tozalash
    });

    describe('findAll', () => {
        it('should return an array of galeries', async () => {
            const routes: any[] = [{ id: 1, name: 'jizax',description:"juda chiroyli shahar" , image: 'image.png' }];
            mockRouteService.getAllRoutes.mockResolvedValue(routes);

            const result = await routeController.getAllRoutes();
            expect(result).toEqual(routes);
            expect(routeService.getAllRoutes).toHaveBeenCalled();
        });
    });


    describe('create', () => {
        it('should create a new route', async () => {
            const route = { id: '1', name: 'Yangiyol',description:"juda chiroyli shahar" ,image: 'image.png' };
            const createRouteDto = { name: 'Jizax',description:"Juda chiroyli shahar",image: 'image.png'};

            const file: Express.Multer.File = {
                fieldname: 'image',
                originalname: 'image.png',
                encoding: '7bit',
                mimetype: 'image/png',
                size: 12345,
                buffer: Buffer.from('fake image data'),
                destination: '',
                filename: 'image.png',
                path: '',
                stream: null,
            };

            mockRouteService.createRoute.mockResolvedValue(route);

            const result = await routeController.createRoute(createRouteDto, file);
            expect(result).toEqual(route);
            expect(routeService.createRoute).toHaveBeenCalledWith(createRouteDto, file); 
        });
    });

});

