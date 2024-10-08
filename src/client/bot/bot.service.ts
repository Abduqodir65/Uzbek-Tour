import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createReadStream } from 'fs';
import { City, CityModule } from 'modules';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class BotService {
    constructor(@InjectModel(City) private cityModel: typeof City) {}

    @Action('start')
    @Start()
    async startBot(@Ctx() context: Context) {
        const imagePath = path.join(
            __dirname,
            '../../../',
            'public',
            'images',
            'uzbekistan_image.jpg',
        );
        await context.replyWithPhoto(
            { source: createReadStream(imagePath) },
            {
                caption: 'Assalomu alekum',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { callback_data: 'start', text: 'Start' },
                            { callback_data: 'help', text: 'Help' },
                        ],
                        [{ callback_data: 'Cities', text: 'Shaharlar' }],
                    ],
                },
            },
        );
    }

    @Action('Cities')
    async getCities(@Ctx() context: Context): Promise<void> {

        const cities = await this.cityModel.findAll()

        

        const imagePath = path.join(
            __dirname,
            '../../../',
            'public',
            'images',
            'city_image.jpg',
        );
        await context.replyWithPhoto(
            { source : createReadStream(imagePath) },
            {
                caption: ' Shaharlar🔽',
            }
        )
    }
}

