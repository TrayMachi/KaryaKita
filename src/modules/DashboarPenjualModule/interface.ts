export interface Product {
    title: string;
    description: string;
    price: string;
}

export interface Order {
    product: Product;
    status: 'Masuk' | 'Berlangsung' | 'Selesai';
    date: string;
    customerName: string;
  }

export interface ListProdukProps {
    title: string;
    products: Product[];
}