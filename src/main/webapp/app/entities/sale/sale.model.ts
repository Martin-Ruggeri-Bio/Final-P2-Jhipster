import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface ISale {
  id: number;
  total?: number | null;
  date?: dayjs.Dayjs | null;
  client?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewSale = Omit<ISale, 'id'> & { id: null };
