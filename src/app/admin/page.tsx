import React from "react";
import DashboardStats from "@/src/components/admin/dashboardStats";
import { myCustomFont } from "../fonts/fonts";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className={`${myCustomFont.className} text-3xl font-serif font-bold text-slate-900 mb-8`}>Dashboard Overview</h1>

  
      <DashboardStats />

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-sm border border-slate-100 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Orders</h2>
        <div className="text-center py-12 text-slate-500">
          <p>No recent orders found.</p>
       
        </div>
      </div>

    </div>
  );
}