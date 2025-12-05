import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

/**
 * 🎓 MULTI-LINE CHART EXPLAINED
 * 
 * Multi-line chart = Multiple <Line> components in one chart
 * Each line represents different data (week, month, year)
 * 
 * Structure:
 * <LineChart data={data}>
 *   <Line dataKey="weekly" />   ← First line
 *   <Line dataKey="monthly" />  ← Second line
 *   <Line dataKey="yearly" />   ← Third line
 * </LineChart>
 */

/**
 * 🔧 REVENUE EVOLUTION CHART - Reusable Component
 * 
 * @param {Object} data - Revenue data by period
 * @param {string} activePeriod - Active time period filter
 * @param {Function} onPeriodChange - Callback when period changes
 * @param {string} title - Chart title
 * @param {number} height - Chart height in pixels
 */
export default function RevenueEvolutionChart({ 
  data,
  activePeriod = "month",
  onPeriodChange,
  title = "Revenue Evolution",
  height = 450,
}) {
  /**
   * 🎨 CUSTOM TOOLTIP
   * Shows detailed info on hover
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="card bg-base-100 shadow-2xl p-4 border-2 border-primary/20">
        <p className="font-bold text-base-content mb-3">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-base-content/70">
                {entry.name}:
              </span>
            </div>
            <span className="font-bold text-lg" style={{ color: entry.color }}>
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Get current dataset based on active period
  const getCurrentData = () => {
    switch(activePeriod) {
      case "week":
        return data.weekly;
      case "month":
        return data.monthly;
      case "year":
        return data.yearly;
      default:
        return data.monthly;
    }
  };

  const currentData = getCurrentData();

  // Calculate stats for current period
  const totalRevenue = currentData.reduce((sum, item) => {
    const values = Object.values(item).filter(val => typeof val === 'number');
    return sum + values.reduce((a, b) => a + b, 0);
  }, 0);

  const avgRevenue = totalRevenue / currentData.length;
  const maxRevenue = Math.max(...currentData.map(item => {
    const values = Object.values(item).filter(val => typeof val === 'number');
    return Math.max(...values);
  }));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        {/* 📊 HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <TrendingUp className="text-success" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-base-content">{title}</h3>
              <p className="text-sm text-base-content/60">
                Compare revenue across different time periods
              </p>
            </div>
          </div>

          {/* Period Selector Buttons */}
          <div className="join">
            <button 
              className={`btn join-item ${activePeriod === "week" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => onPeriodChange && onPeriodChange("week")}
            >
              Weekly
            </button>
            <button 
              className={`btn join-item ${activePeriod === "month" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => onPeriodChange && onPeriodChange("month")}
            >
              Monthly
            </button>
            <button 
              className={`btn join-item ${activePeriod === "year" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => onPeriodChange && onPeriodChange("year")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* 📈 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          {/* Total Revenue */}
          <div className="stats shadow bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="stat">
              <div className="stat-figure text-primary">
                <DollarSign size={32} />
              </div>
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value text-primary text-2xl">
                ${(totalRevenue / 1000).toFixed(0)}k
              </div>
              <div className="stat-desc">Current period</div>
            </div>
          </div>

          {/* Average */}
          <div className="stats shadow bg-gradient-to-br from-info/10 to-info/5">
            <div className="stat">
              <div className="stat-figure text-info">
                <TrendingUp size={32} />
              </div>
              <div className="stat-title">Average</div>
              <div className="stat-value text-info text-2xl">
                ${(avgRevenue / 1000).toFixed(1)}k
              </div>
              <div className="stat-desc">Per period</div>
            </div>
          </div>

          {/* Peak */}
          <div className="stats shadow bg-gradient-to-br from-success/10 to-success/5">
            <div className="stat">
              <div className="stat-figure text-success">
                <TrendingUp size={32} />
              </div>
              <div className="stat-title">Peak Revenue</div>
              <div className="stat-value text-success text-2xl">
                ${(maxRevenue / 1000).toFixed(0)}k
              </div>
              <div className="stat-desc">Highest point</div>
            </div>
          </div>

        </div>

        {/* 📈 CHART */}
        <div className="w-full" style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            
            {/* 
              LineChart Component
              Contains multiple lines for comparison
            */}
            <LineChart
              data={currentData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              
              {/* Grid */}
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="currentColor" 
                opacity={0.1} 
              />
              
              {/* 
                XAxis - Shows period labels
                dataKey="period" uses the "period" property from data
              */}
              <XAxis 
                dataKey="period"
                stroke="currentColor"
                style={{ fontSize: '12px' }}
              />
              
              {/* 
                YAxis - Shows revenue values
                tickFormatter converts to "$10k" format
              */}
              <YAxis 
                stroke="currentColor"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              
              {/* Tooltip */}
              <Tooltip content={<CustomTooltip />} />
              
              {/* 
                Legend
                Shows which line is which
                Can be clicked to show/hide lines
              */}
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
                iconType="line"
              />
              
              {/* 
                🟢 LINE 1: Current Year
                type="monotone" = smooth curve
                strokeWidth = line thickness
                dot = show points
                activeDot = larger point on hover
              */}
              <Line
                type="monotone"
                dataKey="current"
                name="Current Year"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
              
              {/* 
                🔵 LINE 2: Previous Year
                strokeDasharray creates dashed line
              */}
              <Line
                type="monotone"
                dataKey="previous"
                name="Previous Year"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              
              {/* 
                🟣 LINE 3: Target/Goal
                Optional third line for targets
              */}
              {currentData[0]?.target && (
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ fill: "#8b5cf6", r: 3 }}
                />
              )}
              
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 COMPARISON TABLE */}
        <div className="mt-6 pt-6 border-t border-base-300">
          <h4 className="font-bold text-lg mb-4">Period Comparison</h4>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Current Year</th>
                  <th>Previous Year</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {currentData.slice(0, 5).map((item, index) => {
                  const growth = ((item.current - item.previous) / item.previous * 100).toFixed(1);
                  const isPositive = growth > 0;
                  
                  return (
                    <tr key={index}>
                      <td className="font-semibold">{item.period}</td>
                      <td className="font-bold text-success">
                        ${item.current.toLocaleString()}
                      </td>
                      <td className="font-bold text-info">
                        ${item.previous.toLocaleString()}
                      </td>
                      <td>
                        <span className={`badge ${isPositive ? 'badge-success' : 'badge-error'}`}>
                          {isPositive ? '↑' : '↓'} {Math.abs(growth)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}