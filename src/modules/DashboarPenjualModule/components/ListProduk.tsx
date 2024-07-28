import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Product } from '../interface';
import { ListProdukProps } from '../interface';


export const ListProduk: React.FC<ListProdukProps> = ({ title, products }) => {
    return (
      <div className="flex flex-col space-y-4">
        {products.map((product, index) => (
          <Card key={index} className='w-fit p-3'>
            <CardTitle className='mb-2 font-extrabold text-md'>{product.title}</CardTitle>
            <div className='flex flex-row justify-between items-center gap-4'>
              <CardDescription>{product.description}</CardDescription>
              <CardDescription>{product.price}</CardDescription>
            </div>
          </Card>
        ))}
      </div>
    );
}  