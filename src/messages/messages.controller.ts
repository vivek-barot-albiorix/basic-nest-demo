import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageRequestDto } from './dtos/create-message-request.dto';
import { MessagesService } from './messages.service';
import { MessagesResponseDto } from './dtos/messages-response.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  private listMessages(): Promise<MessagesResponseDto[]> {
    return this.messagesService.findAll();
  }

  @Post()
  private createMessage(@Body() body: CreateMessageRequestDto): Promise<void> {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  private async getMessage(
    @Param('id') id: string,
  ): Promise<MessagesResponseDto> {
    const messages = await this.messagesService.findOne(id);
    if (!messages) {
      throw new NotFoundException('Message not found!');
    }
    return messages;
  }
}
