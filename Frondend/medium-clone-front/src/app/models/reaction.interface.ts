import {User} from './user.interface';

export interface Reaction{
  id: number;
  type: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
