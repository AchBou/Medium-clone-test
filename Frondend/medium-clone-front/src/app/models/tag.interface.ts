import {Article} from './article.interface';

export interface Tag{
  id: number;
  title: string;
  articles: Article[];
  createdAt: Date;
  updatedAt: Date;
}
