import { api } from '../../api';

type ProductId = string;

class ProductsService {

  async getIds(offset: number, limit: number) {
    const {data} = await api.post<ProductId[]>('/', {
      action: 'get_ids',
      params: {},
    });
    return data;
  }

  async getItems(arr: ProductId[]) {
    return api.post('/', {
      action: 'get_items',
      params: {
        ids: arr,
      },
    });
  }
}
