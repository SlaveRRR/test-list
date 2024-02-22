

export type ProductId = string;

export type Product = {
    brand: null | string,
    id: ProductId,
    price: number,
    product: string
}

export type IdsResponse = {
    result:ProductId[]
}

export type ItemsResponse = {
    result:Product[]
}