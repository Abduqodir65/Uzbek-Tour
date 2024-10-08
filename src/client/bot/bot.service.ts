import { Injectable } from "@nestjs/common";
import { Ctx, Start,  Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Injectable()
@Update()
export class BotService {
    @Start()
    async startBot(@Ctx() context: Context) {
        context.reply("Assalomu alekum! \n Uzbek-Tour sayting botiga hush kelibsiz'😊")
    }
}