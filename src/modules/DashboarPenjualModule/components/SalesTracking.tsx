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
    <ChartContainer config={chartConfig} className="h-[200px] mx-auto w-[400px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="status"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-status)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
