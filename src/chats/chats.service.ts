import { Injectable } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsReposotory: ChatsRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsReposotory.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      isPravite: false,
    });
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
