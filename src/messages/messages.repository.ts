import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { MessagesResponseDto } from './dtos/messages-response.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  async findOne(id: string): Promise<MessagesResponseDto> {
    if (!existsSync('messages.json')) {
      throw new NotFoundException('messages.json file not exists!');
    }
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll(): Promise<MessagesResponseDto[]> {
    if (!existsSync('messages.json')) {
      throw new NotFoundException('messages.json file not exists!');
    }
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(content: string): Promise<void> {
    const id = Math.floor(Math.random() * 999);
    let contents;
    let messages = {};
    if (existsSync('messages.json')) {
      contents = await readFile('messages.json', 'utf8');
      messages = JSON.parse(contents);
    }
    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
