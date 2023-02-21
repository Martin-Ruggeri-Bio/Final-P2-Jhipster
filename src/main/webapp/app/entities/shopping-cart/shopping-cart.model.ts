import { IMenu } from 'app/entities/menu/menu.model';
import { IUser } from 'app/entities/user/user.model';

export interface IShoppingCart {
  id: number;
  amount?: number | null;
  menu?: Pick<IMenu, 'id'> | null;
  client?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewShoppingCart = Omit<IShoppingCart, 'id'> & { id: null };
