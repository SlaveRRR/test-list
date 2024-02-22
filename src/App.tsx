import React, { useEffect, useState } from 'react'
import { Table, TableProps} from 'antd'

import productsService from './services/products'
import { Product } from './types/products';


type DataType = Product & {key:string}



const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key:'id',
    ellipsis:true
    
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key:'brand',
    render: (brand) => brand ? brand : '-'
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key:'product'
    
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key:'price'
  },
];

const LIMIT = 50
const TOTAL = 8000;

const App = () => {
  const [page,setPage] = useState<number>(1);

  const [data,setData] = useState<Product[]>();

  const [isLoading,setIsLoading] = useState<boolean>(false)

  const getData = async (page : number) =>{
    const offset = (page - 1) * LIMIT
    setIsLoading(true)
    const dataResponse = await productsService.getProducts(offset,LIMIT);
    setData(dataResponse)
    setIsLoading(false)
   
    
  }

  useEffect(() =>{
    getData(page);
  },[page])

  return (
    <Table columns={columns} dataSource={data} pagination={{
      position:['topCenter'],
      onChange(page, pageSize) {
          setPage(page)
      },
      total:TOTAL,
      pageSize:LIMIT,
      showSizeChanger:false
    }} loading={isLoading} />
  )
}

export default App