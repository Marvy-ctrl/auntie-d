"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Package, Users, Loader2 } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-5 lg:p-6 border border-[#D9DFDA] flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#66776E]">{title}</p>
        <p className="font-sans text-3xl font-bold text-[#0D3B2E] mt-2">{value}</p>
      </div>
     
    </div>
  );
}

export default function DashboardStats() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    // customers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${baseUrl}/api/admin/stats`, {
          credentials: 'include',
        });
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          setStats({
            revenue: data.revenue || 0,
            orders: data.orders || 0,
            products: data.products || 0,
            // customers: data.customers || 0,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [baseUrl]);

  const STATS_ITEMS = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: `₦${Number(stats.revenue).toLocaleString()}`,
    },
    {
      id: "orders",
      title: "Total Orders",
      value: stats.orders.toLocaleString(),
    },
    {
      id: "products",
      title: "Active Products",
      value: stats.products.toLocaleString(),
    },
    // {
    //   id: "customers",
    //   title: "Total Customers",
    //   value: stats.customers.toLocaleString(),
    // },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-sm border border-slate-100 flex items-center justify-center min-h-[100px]">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {STATS_ITEMS.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
}
