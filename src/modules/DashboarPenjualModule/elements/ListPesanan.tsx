import React from 'react';
import { ListProduk } from '../components/ListProduk';
import { Product } from '../interface';

export const ListPesanan: React.FC = () => {
  const pesananMasuk: Product[] = [
    { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
    { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  ];

  const pesananBerlangsung: Product[] = [
    { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
    { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  ];

  return (
    <div className="flex justify-center flex-row space-x-8 text-primary">
        <div className="flex flex-col text-primary">
            <h1 className="text-2xl text-center font-semibold">Pesanan Masuk</h1>
            <ListProduk title="Pesanan Masuk" products={pesananMasuk} />
        </div>
        <div className='flex flex-col text-center text-primary'> 
            <h1 className="text-2xl font-semibold">Pesanan Berlangsung</h1>
            <ListProduk title="Pesanan Berlangsung" products={pesananBerlangsung} />
        </div>
    </div>
  );
}

export default ListPesanan;


