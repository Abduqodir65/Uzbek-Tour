import { Test, TestingModule } from '@nestjs/testing';
import { GaleryController } from './galery.controller';
import { GaleryService } from './galery.service';

describe('GaleryController', () => {
    let galeryController: GaleryController;
    let galeryService: GaleryService;

    const mockGaleryService = {
        getAllGaleries: jest.fn(),
        createGalery: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GaleryController],
            providers: [
                {
                    provide: GaleryService,
                    useValue: mockGaleryService,
                },
            ],
        }).compile();

        galeryController = module.get<GaleryController>(GaleryController);
        galeryService = module.get<GaleryService>(GaleryService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Har bir testdan keyin mock'larni tozalash
    });

    describe('findAll', () => {
        it('should return an array of galeries', async () => {
            const galeries: any[] = [{ id: 1, city_name: 'galery1', image: 'image.png' }];
            mockGaleryService.getAllGaleries.mockResolvedValue(galeries);

            const result = await galeryController.getAllGaleries();
            expect(result).toEqual(galeries);
            expect(galeryService.getAllGaleries).toHaveBeenCalled();
        });
    });


    describe('create', () => {
        it('should create a new galery', async () => {
            const galery = { id: '1', city_name: 'Yangiyol', image: 'image.png' };
            const createGaleryDto = { city_name: 'Jizax',image: 'image.png'};

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

            mockGaleryService.createGalery.mockResolvedValue(galery);

            const result = await galeryController.createGalery(createGaleryDto, file);
            expect(result).toEqual(galery);
            expect(galeryService.createGalery).toHaveBeenCalledWith(createGaleryDto, file); // file argumentini qo'shish
        });
    });

});

