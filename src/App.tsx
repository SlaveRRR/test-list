import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableProps, Tag, Typography } from 'antd';

import productsService from './services/products';
import { FilterType, Product } from './types/products';
import './App.css'


type DataType = Product & { key: string };

const {Title} = Typography

const LIMIT = 50;
const TOTAL = 8000;

const App = () => {
  const [page, setPage] = useState<number>(1);

  const [data, setData] = useState<Product[]>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns: TableProps<DataType>['columns'] = useMemo(() =>([
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand) => (brand ?<Tag color='red-inverse'>{brand}</Tag>  : '-'),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ]),[]) 
 

  const getData = async (page: number) => {

    const offset = (page - 1) * LIMIT;

    setIsLoading(true);

    const dataResponse = await productsService.getProducts(offset, LIMIT);

    // костыльная установка фильтров
    columns.slice(1).forEach((col) => {
      let k = col.key as string;
      let filters = dataResponse.map((obj) => ({ text: obj[k], value: obj[k] }))
      col['filters'] = filters.filter((val,ind) => filters.findIndex(v => v.value === val.value) === ind && val.value);
    });

    setData(dataResponse);
    setIsLoading(false);
  };

  const getFilteredData = async (filter: FilterType, filterValue : any) =>{
    setIsLoading(true);
    const data = await productsService.getFilteredProducts(filter,filterValue);
    setData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(page)
    .catch(err =>{
      console.log(err)
      alert(err)
      getData(page).catch(err =>{
        setIsLoading(false)
      })
    })
  }, [page]);

  

  return (
    <div className="container">
      <Title style={{
        textAlign:'center'
      }}>Ant Design products list</Title>
        <Table
      columns={columns}
      dataSource={data}
      pagination={{
        position: ['topCenter'],
        onChange(page, pageSize) {
          setPage(page);
        },
        total: TOTAL,
        pageSize: LIMIT,
        showSizeChanger: false,
      }}
      loading={isLoading}
      onChange={(_,filters) =>{
      
        const selectedFilter = Object.entries(filters).filter(([k,v]) => v !== null)
        if(selectedFilter.length > 0){
          getFilteredData(selectedFilter[0][0] as FilterType,selectedFilter[0].flat().slice(-1)[0]).catch(err =>{
            console.log(err)
            alert(err)
            getFilteredData(selectedFilter[0][0] as FilterType,selectedFilter[0].flat().slice(-1)[0]).catch(err =>{
              setIsLoading(false);
            })
          })
        }
        else{
          getData(page)
        }
       
        
      }}
    />
    </div>
    
  );
};

export default App;
