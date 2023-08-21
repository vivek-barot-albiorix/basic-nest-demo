import { IsString } from 'class-validator';

export class CreateMessageRequestDto {
  @IsString()
  content: string;
}
