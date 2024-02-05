import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractEntity } from './abstract.entity';
// абстрактный класс предоставляет базовые операции для создания документов
// с использованием Mongoose,
// ожидается, что он будет использоваться как базовый класс для репозиториев
// в NestJS-приложении.
export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    const savedDocument = await createdDocument.save();
    return savedDocument as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    // при использовании lean(), возвращаемые объекты будут чистыми JavaScript-объектами
    // без дополнительных методов и внутренней сложной структуры данных.
    // lean<T>() указывает Mongoose, что результат должен быть преобразован
    //  к типу T после запроса.
    const document = await this.model.findOne(filterQuery).lean<T>();

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    // Опция { new: true } указывает Mongoose вернуть обновленный документ
    // после выполнения операции.
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<T>();
    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(filterQuery).lean<T>();
  }
}
