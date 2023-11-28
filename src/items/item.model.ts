import { ItemStatus } from './item-status.enum';

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  status: ItemStatus;
}

export { Item };
