import { Field, Int, ObjectType } from '@nestjs/graphql';

// определяет GraphQL-схему для объекта пользователя с одним числовым полем exampleField,
// @Field Этот декоратор применен к полю exampleField и указывает, что это поле должно быть представлено в GraphQL схеме.
// () => Int означает, что тип поля - это целое число (Int в GraphQL). { description: 'Example field (placeholder)' } предоставляет описание поля для документации.
// exampleField: number; - Это само поле exampleField в классе User, которое представляет собой числовое значение.
@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
