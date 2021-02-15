import {User} from './user.interface';
import {Tag} from './tag.interface';

export interface Article{
  id: number;
  name: string;
  reference: string;
  content: string;
  draft: boolean;
  owner: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
