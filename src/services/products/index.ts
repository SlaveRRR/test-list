import { api } from '../../api';
import { ProductId,Product, ItemsResponse, IdsResponse, FilterType } from '../../types/products';





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

    return products.filter((val,ind) => products.findIndex(v => v.id === val.id) === ind)
  }

  async getFilteredProducts(filter:FilterType,filterValue: number | string){
    const {data:{result:ids}} = await api.post<IdsResponse>('/',{
        action:'filter',
        params:{
            [filter]:filterValue
        }
    })

    
    const {result:products} = await this.getItems(ids);

    return products.filter((val,ind) => products.findIndex(v => v.id === val.id) === ind)
  }


}

export default new ProductsService()
