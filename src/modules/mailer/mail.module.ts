import { Module } from '@nestjs/common';
import { MailerService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';

@Module({
    imports: [ConfigModule],
    controllers: [MailController],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailModule { }
