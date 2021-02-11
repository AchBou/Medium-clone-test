import {User} from './user.interface';
import {Reaction} from './reaction.interface';

export interface Article{
  id: number;
  name: string;
  reference: string;
  content: string;
  draft: boolean;
  owner: User;
  comments: Comment[];
  reactions: Reaction[];
  createdAt: Date;
  updatedAt: Date;
}
