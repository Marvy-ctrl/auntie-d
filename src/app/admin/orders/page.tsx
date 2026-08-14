"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Eye, ShoppingBag } from "lucide-react";
import { myCustomFont } from "../../fonts/fonts";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${baseUrl}/api/orders`);
        if (res.ok) {
          const json = await res.json();
          // Extract from your API's { data: orders } response wrapper
          const rawOrders =
            json.data || json.orders || (Array.isArray(json) ? json : []);

          const mapped = rawOrders.map((order: any) => ({
            id: order.orderNumber || order.id,
            date: order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "N/A",
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
            status:
              order.status === "DELIVERED"
                ? "Delivered"
                : order.status === "DISPATCHED"
                  ? "Dispatched"
                  : order.status === "READY_FOR_DISPATCH"
                    ? "Ready for Dispatch"
                    : order.status === "PROCESSING"
                      ? "Processing"
                      : order.status === "CONFIRMED"
                        ? "Confirmed"
                        : order.status === "CANCELLED"
                          ? "Cancelled"
                          : "Awaiting Confirmation",
            rawStatus: order.status || "AWAITING_CONFIRMATION",
          }));
          setOrders(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [baseUrl]);

  // Filter logic for search and status dropdown
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      selectedStatusFilter === "ALL" || order.rawStatus === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div
        className={`${myCustomFont.className} max-w-6xl mx-auto flex justify-center items-center py-20 text-slate-500`}
      >
        Loading orders...
      </div>
    );
  }

  return (
    <div className={`${myCustomFont.className} max-w-6xl mx-auto`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
      </div>

      <div className="bg-white border border-slate-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <ShoppingBag className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No orders yet
            </h3>
            <p className="text-slate-500 max-w-sm">
              Once your customers start purchasing your herbal products, their
              order details, shipping info, and payments will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Search Bar / Filter Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search order ID or customer..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] transition-colors"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1A3626]"
              >
                <option value="ALL">All Orders</option>
                <option value="AWAITING_CONFIRMATION">Awaiting Confirmation</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PROCESSING">Processing</option>
                <option value="READY_FOR_DISPATCH">Ready for Dispatch</option>
                <option value="DISPATCHED">Dispatched</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-[#1A3626]">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{order.date}</td>
                        <td className="px-6 py-4 text-slate-900 font-medium">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 text-slate-900">
                          ₦{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
                              order.rawStatus === "DELIVERED"
                                ? " text-emerald-800"
                                : order.rawStatus === "DISPATCHED"
                                  ? " text-blue-800"
                                  : order.rawStatus === "READY_FOR_DISPATCH"
                                    ? " text-cyan-800"
                                    : order.rawStatus === "PROCESSING"
                                      ? " text-purple-800"
                                      : order.rawStatus === "CONFIRMED"
                                        ? " text-indigo-800"
                                        : order.rawStatus === "CANCELLED"
                                          ? " text-red-800"
                                          : " text-amber-800" // AWAITING_CONFIRMATION
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-flex items-center justify-center text-slate-400 hover:text-[#1A3626] transition-colors"
                            title="View Order Details"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        No orders found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <p>
                Showing 1 to {filteredOrders.length} of {orders.length} orders
              </p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1 border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}