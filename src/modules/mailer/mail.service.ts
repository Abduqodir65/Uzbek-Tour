import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
    private transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get('MAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('USER_EMAIL'),
                pass: this.configService.get('USER_EMAIL_PASS'),
            },
        });
    }

    async sendContactUsMail(email: string, subject: string, message: string) {
        const mailOptions = {
            from: this.configService.get('USER_EMAIL'),
            to: email,
            subject: subject,
            text: message,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { success: true, message: 'Email sent successfully!', info };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, message: 'Failed to send email', error };
        }
    }
}
