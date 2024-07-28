export interface Product {
    title: string;
    description: string;
    price: string;
}

export interface ListProdukProps {
    title: string;
    products: Product[];
}