import React from 'react'
import { SquareArrowLeft } from 'lucide-react';


export const Rincian: React.FC = () => {
  return (
    <div className="w-[700px] mt-3 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 rounded-lg">
        <div className="mb-4">
          <a href="#" className="text-black">&lt; Kembali</a>
          <h1 className="text-2xl font-semibold text-purple-600">Checkout</h1>
        </div>

        <div className="border-b border-gray-300 mb-4 pb-4">
          <h2 className="text-lg font-semibold text-purple-600">Miniatur Handmade (Custom request)</h2>
          <p className="text-gray-500">Pudidi Arts</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold">1x 30x40cm</p>
            <p className="text-xl font-bold text-purple-600">Rp200.000</p>
          </div>
        </div>

        <div className="border-b border-gray-300 mb-4 pb-4">
          <h3 className="text-lg font-semibold text-purple-600">Pengiriman</h3>
          <p>Jl. Sudirman No.8, Senopati, Jakarta Selatan</p>
          <p>Penerima: Yuda Ramadhan - 081280639200</p>
        </div>

        <div className="border-b border-gray-300 mb-4 pb-4">
          <label className="block text-lg font-semibold text-purple-600" htmlFor="courier">Pilih Kurir</label>
          <select id="courier" className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option>J&M (Estimasi tiba 1 Agustus - 3 Agustus)</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-600">Saldo KaKiKoin</h3>
          <div className="flex items-center mt-2">
            <img src="/KakiKoin.png" alt="KaKiKoin" className="w-6 h-6" />
            <p className="ml-2 text-xl font-bold">300</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-white border border-purple-600 text-purple-600 rounded">Isi Saldo</button>
        </div>
      </div>
    </div>
  );
};

