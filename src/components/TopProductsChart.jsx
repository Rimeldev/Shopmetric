// src/components/TopProductsChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Package, Award } from "lucide-react";

export default function TopProductsChart({ 
  data, 
  title = "Top 5 Products",
  height = 350,
  showRank = true,
}) {
  const barColors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
      <div className="card bg-base-100 shadow-lg p-3 border border-primary/20">
        <p className="font-bold">{item.name}</p>
        <p className="text-primary font-semibold">${item.sales.toLocaleString()}</p>
        <p className="text-sm text-base-content/60">{item.units} units sold</p>
      </div>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Package className="text-success" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-base-content/60">Best selling products</p>
            </div>
          </div>
          <div className="badge badge-success badge-lg gap-2">
            <Award size={16} />
            Top Sellers
          </div>
        </div>

        <div className="w-full" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} horizontal={false} />
              <XAxis type="number" stroke="currentColor" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" stroke="currentColor" width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" radius={[0, 8, 8, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={barColors[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {showRank && (
          <div className="mt-4 pt-4 border-t border-base-300 space-y-2">
            {data.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="badge badge-lg font-bold" style={{ backgroundColor: barColors[index], color: 'white' }}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-base-content/60">{product.units} units</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg" style={{ color: barColors[index] }}>
                    ${product.sales.toLocaleString()}
                  </p>
                  <p className="text-xs text-base-content/60">revenue</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
