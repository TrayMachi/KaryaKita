import { Button } from '@/components/ui/button';
import React from 'react'
import TaroKtp from '../components/TaroKtp';

export const BuatTokoForm = () => {
    return (
        <div className="flex items-center mt-10 justify-center">
          <div className=" rounded-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center">Daftar Sebagai Penjual</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="namaToko" className="block text-sm font-medium text-primary">Nama Toko</label>
                <input type="text" id="namaToko" name="namaToko" placeholder="Masukkan nama toko" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="deskripsiToko" className="block text-sm font-medium text-primary">Deskripsi Toko</label>
                <textarea id="deskripsiToko" name="deskripsiToko" placeholder="Masukkan deskripsi toko..." rows={4} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="alamat" className="block text-sm font-medium text-primary">Alamat <span className="text-gray-500">(opsional)</span></label>
                <input type="text" id="alamat" name="alamat" placeholder="Masukkan Alamat" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-6">
                <label htmlFor="fotoKTP" className="block mb-5 text-sm font-medium text-primary">Masukkan Fotomu Sambil Memegang KTP</label>
                <TaroKtp />
              </div>
              <Button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800">Submit</Button>
            </form>
          </div>
        </div>
      );
    }