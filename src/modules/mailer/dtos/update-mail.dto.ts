import { PartialType } from '@nestjs/mapped-types';
import { CreateMailerDto } from './create-mail.dto';

export class UpdateMailerDto extends PartialType(CreateMailerDto) {}
