import { api } from '../../api';
import { ProductId,Product, ItemsResponse, IdsResponse } from '../../types/products';





class ProductsService {
  private async getIds(offset: number, limit: number) {
    console.log(offset,limit)
    const {data}  = await api.post<IdsResponse>('/', {
      action: 'get_ids',
      params: {
        offset:offset,
        limit:limit
      },
    });

    
    const {result} = data;
    
    return result;
  }

  private async getItems(arr: ProductId[]) {
    const {data} = await api.post<ItemsResponse>('/', {
        action: 'get_items',
        params: {
            ids:arr
        },
      });
      return data;
  }

  async getProducts(offset : number, limit : number){
  
    const ids = await this.getIds(offset,limit);

    const {result:products} = await this.getItems(ids);
    console.log(products.filter((val,ind) => products.findIndex(v => v.id === val.id) === ind))
    return products.filter((val,ind) => products.findIndex(v => v.id === val.id) === ind)
  }
}

export default new ProductsService()
