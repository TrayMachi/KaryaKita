"use client"

import React from 'react';
import { Bar, BarChart, XAxis, CartesianGrid } from 'recharts';
import { ChartLegend, ChartConfig, ChartLegendContent, ChartTooltipContent, ChartTooltip, ChartContainer } from '@/components/ui/chart';
import { Product } from '../interface';

const pesananMasuk: Product[] = [
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
];

const pesananBerlangsung: Product[] = [
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
];

const pesananSelesai: Product[] = [
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
  { title: 'Commission Art', description: '1x Commission Gambar Anime', price: 'Rp100k' },
];

const orders = [
  ...pesananMasuk.map(order => ({ ...order, status: 'Masuk' })),
  ...pesananBerlangsung.map(order => ({ ...order, status: 'Berlangsung' })),
  ...pesananSelesai.map(order => ({ ...order, status: 'Selesai' })),
];

const statusCounts = {
  Masuk: orders.filter(order => order.status === 'Masuk').length,
  Berlangsung: orders.filter(order => order.status === 'Berlangsung').length,
  Selesai: orders.filter(order => order.status === 'Selesai').length,
};

const chartData = [
  { status: 'Masuk', count: statusCounts.Masuk },
  { status: 'Berlangsung', count: statusCounts.Berlangsung },
  { status: 'Selesai', count: statusCounts.Selesai },
];

const chartConfig = {
  Masuk: {
    label: 'Masuk',
    color: '#2563eb',
  },
  Berlangsung: {
    label: 'Berlangsung',
    color: '#60a5fa',
  },
  Selesai: {
    label: 'Selesai',
    color: '#34d399',
  },
} satisfies ChartConfig;

export function SalesTracking() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-2xl font-semibold mb-4">Sales Tracking</h1>
      <ChartContainer config={chartConfig} className="h-[300px] mx-auto w-[600px] bg-white p-4 rounded-lg shadow-lg">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="status"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="count" fill="#5038BC" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
