import React from "react";
import { TrendingUp, Package, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
 
}


function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-sm border border-slate-100 flex items-center gap-4">
    
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

const STATS_DATA = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "₦245,000",
    icon: <span className="font-bold text-xl">₦</span>,
  },
  {
    id: "orders",
    title: "Total Orders",
    value: "42",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "products",
    title: "Active Products",
    value: "12",
    icon: <Package className="w-6 h-6" />,
  },
  {
    id: "customers",
    title: "Total Customers",
    value: "18",
    icon: <Users className="w-6 h-6" />,
  },
];


export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      
      {STATS_DATA.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
         
        />
      ))}

    </div>
  );
}