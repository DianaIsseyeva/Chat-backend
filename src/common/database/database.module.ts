import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DbMigrationService } from './db-migration.service';
// создаем модуль базы данных для NestJS, используя Mongoose для подключения к MongoDB.
@Module({
  imports: [
    // MongooseModule.forRootAsync, чтобы установить соединение с MongoDB.
    // Настройки подключения читаются из переменных окружения с использованием ConfigService.
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DbMigrationService],
})
export class DatabaseModule {
  // forFeature - Это статический метод внутри класса DatabaseModule.
  // Он предоставляет удобный способ добавления Mongoose-моделей в текущий модуль.
  // Метод forFeature принимает массив ModelDefinition[], который представляет собой описания Mongoose-моделей.
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
// Метод forFeature возвращает вызов MongooseModule.forFeature,
// который используется для регистрации Mongoose-моделей в текущем контексте модуля.
// Это позволяет использовать эти модели внутри других компонентов, таких как сервисы или контроллеры,
// внедряя их в конструкторы с помощью декоратора @InjectModel().
