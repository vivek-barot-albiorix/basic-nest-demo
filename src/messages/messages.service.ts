import { Injectable } from '@nestjs/common';
import { MessagesResponseDto } from './dtos/messages-response.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  findAll(): Promise<MessagesResponseDto[]> {
    return this.messagesRepository.findAll();
  }

  create(content: string): Promise<void> {
    return this.messagesRepository.create(content);
  }

  findOne(id: string): Promise<MessagesResponseDto> {
    return this.messagesRepository.findOne(id);
  }
}
