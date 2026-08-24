export enum CATEGORIES {
    WOMAN="women's clothing",
    MEN="men's clothing",
    JEWEL="jewelery",
    ELECTRONICS="electronics"
}

export interface Product {
    id: number,
    title: string,
    price: number,
    category: CATEGORIES,
    description: string,
    image: string
}