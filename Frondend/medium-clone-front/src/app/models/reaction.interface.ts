import {User} from './user.interface';

export interface Reaction{
  id: number;
  type: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}
