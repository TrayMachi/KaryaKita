"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export const TambahBarangForm: React.FC = () => {
    const [category, setCategory] = useState<string>('Jasa');

    const handleCategoryChange = (selectedCategory: string) => {
        setCategory(selectedCategory);
    };

    return (
        <div className="max-w-xl text-primary mx-auto  p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Tambah Barang</h1>
            <form>
                <label className="block mb-2 font-bold" htmlFor="nama-barang">Nama Barang</label>
                <input className="w-full p-2 mb-4 border rounded" type="text" id="nama-barang" placeholder="Masukkan nama barang" />

                <label className="block mb-2 font-bold" htmlFor="variant-barang">Variant Barang dan Harga</label>
                <div className="flex space-x-2">
                    <input className="flex-1 p-2 mb-4 border rounded" type="text" placeholder="Masukkan nama barang" />
                    <input className="w-1/3 p-2 mb-4 border rounded" type="text" placeholder="Harga" />
                </div>
                <div className="flex space-x-2">
                    <input className="flex-1 p-2 mb-4 border rounded" type="text" placeholder="+ Tambah variant baru" />
                    <input className="w-1/3 p-2 mb-4 border rounded" type="text" placeholder="Harga" />
                </div>

                <div className="flex justify-between mb-4">
                    <button type="button" className={`flex-1 p-2 mr-2 rounded ${category === 'Jasa' ? 'bg-primary text-white' : 'bg-gray-200'}`} onClick={() => handleCategoryChange('Jasa')}>Jasa</button>
                    <button type="button" className={`flex-1 p-2 rounded ${category === 'Produk' ? 'bg-primary text-white' : 'bg-gray-200'}`} onClick={() => handleCategoryChange('Produk')}>Produk</button>
                </div>

                <label className="block mb-2 font-bold" htmlFor="detail-barang">Detail Barang</label>
                <textarea className="w-full p-2 mb-4 border rounded" id="detail-barang" placeholder="Masukkan detail barang..."></textarea>

                <label className="block mb-2 font-bold">Masukkan Foto Barang (minimal 1 foto)</label>
                <div className="flex space-x-2 mb-4">
                    <div className="w-16 h-16 border border-dashed rounded flex items-center justify-center">+</div>
                </div>

                <label className="block flex-col mb-2 font-bold" htmlFor="mulai">Rentang Waktu Bidding (opsional)</label>
                <div className="flex space-x-2 mb-4">
                    <input className="flex-1 p-2 border rounded" type="date" id="mulai" placeholder="Mulai" />
                    <input className="flex-1 p-2 border rounded" type="date" id="berakhir" placeholder="Berakhir" />
                </div>
                <Button className="w-full" type="submit">Masuk</Button>
            </form>
        </div>
    );
};
