"use client";

import React, { useState, useEffect } from "react";
import DashboardStats from "@/src/components/admin/dashboardStats";
import { myCustomFont } from "../fonts/fonts";
import Link from "next/link";
import { Eye, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    async function fetchRecentOrders() {
      try {
        const res = await fetch(`${baseUrl}/api/orders`);
        if (res.ok) {
          const json = await res.json();
          const rawOrders = json.data || json.orders || (Array.isArray(json) ? json : []);
          
          const mapped = rawOrders.map((order: any) => ({
            id: order.orderNumber || order.id,
            customer: order.customerName || order.customer || "Guest",
            total:
              order.items?.reduce(
                (acc: number, item: any) =>
                  acc +
                  Number(item.lineTotal || (Number(item.unitPrice || item.price || 0) *
                    Number(item.quantity || 0))),
                0,
              ) ||
              order.total ||
              0,
          }));

          setRecentOrders(mapped.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load recent orders", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentOrders();
  }, [baseUrl]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#78814D] mb-3">Welcome Back, Admin</p>
        <h1 className={`${myCustomFont.className} text-3xl lg:text-4xl font-bold text-[#0D3B2E]`}>
          Store overview
        </h1>
        <p className="text-sm text-[#66776E] mt-3">A clear view of orders, products, and store performance.</p>
      </div>

      <DashboardStats />

      {/* Recent Orders Table */}
      <div className="border border-[#D9DFDA] p-5 lg:p-6">
        <div className="flex items-end justify-between mb-5"><h2 className="font-serif text-xl font-bold text-[#0D3B2E]">Recent orders</h2><Link href="/admin/orders" className="text-xs font-bold ">View all</Link></div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#1A3626]" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No recent orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Total</th>
                  <th className="pb-4">
                  <div className="flex justify-end">Actions</div>
                </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="py-4 font-medium text-slate-900">{order.id}</td>
                    <td className="py-4 text-slate-600">{order.customer}</td>
                    <td className="py-4 font-bold text-[#1A3626]">
                      ₦{Number(order.total || 0).toLocaleString()}
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-slate-400 hover:text-[#1A3626]"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
