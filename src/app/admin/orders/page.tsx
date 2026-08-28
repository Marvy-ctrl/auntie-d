"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Eye, ShoppingBag } from "lucide-react";
import { myCustomFont } from "../../fonts/fonts";

export default function OrdersPage() {
  const pageSize = 10;
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (selectedStatusFilter !== "ALL") params.set("status", selectedStatusFilter);
        if (selectedPaymentFilter !== "ALL") params.set("paymentStatus", selectedPaymentFilter);
        const res = await fetch(`/api/orders?${params.toString()}`, {
          cache: "no-store",
        });
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
            paymentStatus: order.paymentStatus || "UNPAID",
          }));
          setOrders(mapped);
          setPagination({
            total: json.pagination?.total || 0,
            totalPages: json.pagination?.totalPages || 1,
          });
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    }

    const timeout = window.setTimeout(fetchOrders, searchQuery ? 300 : 0);
    return () => window.clearTimeout(timeout);
  }, [page, searchQuery, selectedStatusFilter, selectedPaymentFilter]);

  const firstItem = pagination.total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, pagination.total);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <Link href="/admin" className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#78814D] mb-3">Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-[#0D3B2E]">Orders</h1><p className="font-sans text-sm text-[#66776E] mt-3">Track customer orders from confirmation to delivery.</p></div>
      </div>

      <div className="bg-white border border-[#D9DFDA] overflow-hidden font-sans">
        {orders.length === 0 && !searchQuery && selectedStatusFilter === "ALL" && selectedPaymentFilter === "ALL" ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            {/* <ShoppingBag className="w-12 h-12 text-slate-300 mb-4" /> */}
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
            <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search order ID or customer..."
                  className="w-full pl-9 pr-4 py-2 border border-[#CCD7CA] text-sm focus:outline-none focus:border-[#1A3626]"
                />
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => {
                    setSelectedStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter by fulfilment status"
                  className="h-10 border border-[#CCD7CA] px-4 text-xs font-bold text-[#0D3B2E] focus:border-[#1A3626] focus:outline-none"
                >
                  <option value="ALL">All fulfilment statuses</option>
                  <option value="AWAITING_CONFIRMATION">Awaiting Confirmation</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="READY_FOR_DISPATCH">Ready for Dispatch</option>
                  <option value="DISPATCHED">Dispatched</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <select
                  value={selectedPaymentFilter}
                  onChange={(e) => {
                    setSelectedPaymentFilter(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter by payment status"
                  className="h-10 border border-[#CCD7CA] px-4 text-xs font-bold text-[#0D3B2E] focus:border-[#1A3626] focus:outline-none"
                >
                  <option value="ALL">All payment statuses</option>
                  <option value="UNPAID">Unpaid</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="text-[#66776E] uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.length > 0 ? (
                    orders.map((order) => (
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
                          <span className={`text-xs font-semibold ${order.paymentStatus === "PAID" ? "text-emerald-800" : "text-amber-800"}`}>
                            {order.paymentStatus === "PAID" ? "Paid" : "Unpaid"}
                          </span>
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
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        No orders found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 p-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {firstItem}–{lastItem} of {pagination.total} orders
              </p>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="px-3 py-1 border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="flex min-w-20 items-center justify-center text-xs font-semibold">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}
                  className="px-3 py-1 border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                  disabled={page >= pagination.totalPages}
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
