import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailerService) { }

    @Post('contact')
    async contact(
        @Body('email') email: string,
        @Body('subject') subject: string,
        @Body('message') message: string,
    ) {
        const result = await this.mailService.sendContactUsMail(email, subject, message);
        return result;
    }
}
