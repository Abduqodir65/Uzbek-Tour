import { Injectable } from "@nestjs/common";
import { Command, Ctx, Start,  Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Injectable()
@Update()
export class BotService {
    @Start()
    async startBot(@Ctx() context: Context) {
        context.reply("Assalomu alekum!\nUzbek-Tour sayting botiga hush kelibsiz😊")
    }

    @Command("help")
    async helpCommand(@Ctx() context:Context) : Promise<void>{
        context.replyWithHTML(`<b>Botdagi kommandalar:</b>
<i>/start - botni ishga tushirish</i>
<i>/help - botni kommandalarini ko'rish</i>
                `)
    }
}