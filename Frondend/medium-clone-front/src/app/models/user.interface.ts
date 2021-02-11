import {Article} from './article.interface';

export interface User{
  id: number;
  username: string;
  email: string;
  role: string;
  articles: Article[];
  createdAt: Date;
  updatedAt: Date;
}
