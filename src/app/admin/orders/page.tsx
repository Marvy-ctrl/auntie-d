import React from "react";
import Link from "next/link";
import { Search, Eye, ShoppingBag } from "lucide-react";
import { myCustomFont } from "../../fonts/fonts";

const ORDERS: any[] = []; 

export default function OrdersPage() {
  return (
    <div className={`${myCustomFont.className} max-w-6xl mx-auto`}>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {ORDERS.length === 0 ? (
          
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          
            <h3 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h3>
            <p className="text-slate-500 max-w-sm">
              Once your customers start purchasing your herbal products, their order details, shipping info, and payments will appear here.
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
                  placeholder="Search order ID or customer..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] transition-colors"
                />
              </div>
              
              {/* Optional Status Filter */}
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A3626]">
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
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
                  {ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#1A3626]">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-medium">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        ₦{order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800' // Pending
                        }`}>
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
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <p>Showing 1 to {ORDERS.length} of {ORDERS.length} orders</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}