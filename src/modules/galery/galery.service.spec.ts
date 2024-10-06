import { Test, TestingModule } from '@nestjs/testing';
import { GaleryController } from './galery.controller';
import { GaleryService } from './galery.service';
import { CreateGaleryDto } from './dtos';

describe('GaleryController', () => {
    let galeryController: GaleryController;
    let galeryService: GaleryService;

    const mockGaleryService = {
        getAllGaleries: jest.fn(),
        createGalery: jest.fn(),
        updateGalery: jest.fn(),
        deleteGalery: jest.fn(),
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

    it('should be defined', () => {
        expect(galeryController).toBeDefined();
    });

    it('should return all galleries', async () => {
        const result = [{ id: 1, name: 'New Gallery', city_name: 'Jizax', image: 'image.png' }];
        mockGaleryService.getAllGaleries.mockResolvedValue(result);

        expect(await galeryController.getAllGaleries()).toBe(result);
    });

    it('should create a new gallery', async () => {
        const createGaleryDto: CreateGaleryDto = { 
            city_name: 'Jizax', 
            image: 'image.png' 
        };
        const result = { ...createGaleryDto, id: 1 };

        mockGaleryService.createGalery.mockResolvedValue(result);

        const file = {
            buffer: Buffer.from('data'), // Bu joyda o'z ma'lumotlaringizni qo'shishingiz mumkin
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
        
        expect(await galeryController.createGalery(createGaleryDto, file)).toBe(result);

        expect(mockGaleryService.createGalery).toHaveBeenCalledWith(createGaleryDto, expect.anything());
    });

    it('should update a gallery', async () => {
        const updatePayload = { name: 'Updated Gallery', city_name: 'Toshkent', image: 'updated_image.png' };
        const result = { id: 1, ...updatePayload };

        mockGaleryService.updateGalery.mockResolvedValue(result);

        expect(await galeryController.updateGalery(1, updatePayload)).toBe(result);
    });

    it('should delete a gallery', async () => {
        const responseMessage = { message: 'Galery deleted successfully' };
        mockGaleryService.deleteGalery.mockResolvedValue(responseMessage);

        expect(await galeryController.deleteGalery('1')).toBe(responseMessage);});
});
