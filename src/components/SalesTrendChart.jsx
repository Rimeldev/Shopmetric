import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Target, DollarSign } from "lucide-react";

/**
 * 📊 Reusable Sales Trend Chart Component
 * 
 * Props:
 * - title (string): Chart title
 * - data (array): Chart data [{ month, sales, target }]
 * - currency (string): Currency symbol ("$", "€", etc.)
 * - year (number): Displayed year
 */
export default function SalesTrendChart({
  title = "Sales Performance",
  data,
  currency = "$",
  year = new Date().getFullYear(),
}) {
  // Default data if none provided
  const defaultData = [
    { month: "Jan", sales: 32000, target: 30000 },
    { month: "Feb", sales: 28000, target: 30000 },
    { month: "Mar", sales: 35000, target: 33000 },
    { month: "Apr", sales: 38000, target: 35000 },
    { month: "May", sales: 42000, target: 38000 },
    { month: "Jun", sales: 45000, target: 40000 },
    { month: "Jul", sales: 48000, target: 42000 },
    { month: "Aug", sales: 52000, target: 45000 },
    { month: "Sep", sales: 49000, target: 47000 },
    { month: "Oct", sales: 55000, target: 50000 },
    { month: "Nov", sales: 58000, target: 52000 },
    { month: "Dec", sales: 62000, target: 55000 },
  ];

  const chartData = data || defaultData;

  // Compute totals and performance ratio
  const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0);
  const totalTarget = chartData.reduce((sum, item) => sum + item.target, 0);
  const performanceRate = ((totalSales / totalTarget) * 100).toFixed(1);
  const goalReached = totalSales >= totalTarget;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="card bg-base-100 shadow-2xl p-4 border-2 border-primary/20">
        <p className="font-bold text-base-content mb-2">{label}</p>
        <p className="text-primary font-semibold">
          Sales: {currency}
          {payload[0].value.toLocaleString()}
        </p>
        {payload[1] && (
          <p className="text-secondary font-semibold">
            Target: {currency}
            {payload[1].value.toLocaleString()}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="text-primary" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-base-content">
                {title} {year}
              </h2>
              <p className="text-sm text-base-content/60">
                Performance over 12 months
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Sales */}
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-figure text-primary">
                <DollarSign size={32} />
              </div>
              <div className="stat-title">Total Sales</div>
              <div className="stat-value text-primary">
                {currency}
                {totalSales.toLocaleString()}
              </div>
              <div className="stat-desc">Over 12 months</div>
            </div>
          </div>

          {/* Total Target */}
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Target size={32} />
              </div>
              <div className="stat-title">Total Target</div>
              <div className="stat-value text-secondary">
                {currency}
                {totalTarget.toLocaleString()}
              </div>
              <div className="stat-desc">Expected yearly target</div>
            </div>
          </div>

          {/* Achievement Rate */}
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div
                className={`stat-figure ${
                  goalReached ? "text-success" : "text-warning"
                }`}
              >
                <TrendingUp size={32} />
              </div>
              <div className="stat-title">Achievement Rate</div>
              <div
                className={`stat-value ${
                  goalReached ? "text-success" : "text-warning"
                }`}
              >
                {performanceRate}%
              </div>
              <div className="stat-desc">
                {goalReached ? (
                  <span className="text-success">✅ Target reached!</span>
                ) : (
                  <span className="text-warning">⚠️ Below target</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="month"
                stroke="currentColor"
                style={{ fontSize: "14px" }}
              />
              <YAxis
                stroke="currentColor"
                style={{ fontSize: "14px" }}
                tickFormatter={(value) => `${currency}${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Sales line */}
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                strokeWidth={3}
              />

              {/* Target line */}
              <Area
                type="monotone"
                dataKey="target"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-base-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span className="text-sm font-medium">Actual Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-secondary"></div>
            <span className="text-sm font-medium">Target Goal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
