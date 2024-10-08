import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs";
import { Command, Ctx, Start,  Update } from "nestjs-telegraf";
import * as path from "path";
import { Context } from "telegraf";

@Injectable()
@Update()
export class BotService {
    @Start()
    async startBot(@Ctx() context: Context) {
        const imagePath = path.join(__dirname, "../../../","public","images","uzbekistan_image.jpg")
        context.replyWithPhoto(
            {source: createReadStream(imagePath) },
            {caption: 'Uzbek-Tour'}
        )
    }

    @Command("help")
    async helpCommand(@Ctx() context:Context) : Promise<void>{
        context.replyWithHTML(`<b>Botdagi kommandalar:</b>
<i>/start - botni ishga tushirish</i>
<i>/help - botni kommandalarini ko'rish</i> 
                `) 
    }
}