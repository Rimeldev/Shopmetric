import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Users, UserPlus, UserCheck, TrendingUp } from "lucide-react";

/**
 * 🎓 DONUT CHART EXPLAINED
 * 
 * Donut Chart = PieChart with innerRadius
 * - outerRadius: Full size of the circle
 * - innerRadius: Size of the hole in the middle (makes it a donut)
 * 
 * Structure:
 * <PieChart>
 *   <Pie 
 *     data={data}
 *     innerRadius={60}  ← Creates the hole (donut effect)
 *     outerRadius={100}
 *   />
 * </PieChart>
 */

/**
 * 🔧 CUSTOMER DISTRIBUTION CHART - Reusable Component
 * 
 * @param {Array} data - Customer data [{ name, value, color }]
 * @param {string} title - Chart title
 * @param {number} size - Chart size (width/height in px)
 * @param {boolean} showStats - Show detailed statistics
 */
function CustomerDonutChart({ 
  data,
  title = "Customer Distribution",
  size = 300,
  showStats = true,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Calculate total customers
  const totalCustomers = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages
  const dataWithPercentages = data.map(item => ({
    ...item,
    percentage: ((item.value / totalCustomers) * 100).toFixed(1),
  }));

  /**
   * 🎨 CUSTOM TOOLTIP
   * Shows customer details on hover
   */
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0];
    
    return (
      <div className="card bg-base-100 shadow-2xl p-4 border-2" style={{ borderColor: data.payload.color }}>
        <p className="font-bold text-base-content mb-2">{data.name}</p>
        <p className="text-lg font-semibold" style={{ color: data.payload.color }}>
          {data.value.toLocaleString()} customers
        </p>
        <p className="text-sm text-base-content/60">
          {data.payload.percentage}% of total
        </p>
      </div>
    );
  };

  /**
   * 🎯 CUSTOM LABEL
   * Shows percentage inside each slice
   */
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  /**
   * 🎨 CUSTOM LEGEND
   * Enhanced legend with icons
   */
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col gap-2 mt-4">
        {payload.map((entry, index) => (
          <div 
            key={`legend-${index}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium text-base-content">{entry.value}</span>
            </div>
            <div className="text-right">
              <p className="font-bold" style={{ color: entry.color }}>
                {dataWithPercentages[index].value.toLocaleString()}
              </p>
              <p className="text-xs text-base-content/60">
                {dataWithPercentages[index].percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        {/* 📊 HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-base-content">{title}</h3>
              <p className="text-sm text-base-content/60">New vs Returning</p>
            </div>
          </div>
          <div className="badge badge-primary badge-lg">
            {totalCustomers.toLocaleString()} Total
          </div>
        </div>

        {/* 📈 CHART */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          
          {/* Donut Chart */}
          <div style={{ width: size, height: size }}>
            <ResponsiveContainer width="100%" height="100%">
              
              {/* 
                PieChart Component
                Main container for pie/donut charts
              */}
              <PieChart>
                
                {/* 
                  Pie Component
                  
                  Key Props:
                  - data: Your data array
                  - cx/cy: Center position (50% = centered)
                  - innerRadius: Size of the hole (0 = full pie, >0 = donut)
                  - outerRadius: Total size of the chart
                  - paddingAngle: Space between slices
                  - dataKey: Which property to use for values
                  - label: Show labels on slices
                  - labelLine: Show lines connecting labels
                */}
                <Pie
                  data={dataWithPercentages}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}        // ← Creates the hole (donut)
                  outerRadius={100}       // ← Full size
                  paddingAngle={5}        // ← Space between slices
                  dataKey="value"         // ← Use "value" property
                  label={renderCustomLabel}
                  labelLine={false}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {/* 
                    Cell Component
                    Colors each slice individually
                    activeIndex highlights the hovered slice
                  */}
                  {dataWithPercentages.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    />
                  ))}
                </Pie>
                
                {/* Tooltip on hover */}
                <Tooltip content={<CustomTooltip />} />
                
                {/* Legend */}
                <Legend 
                  content={<CustomLegend />}
                  verticalAlign="middle"
                  align="right"
                />
                
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* 📊 DETAILED STATS */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-base-300">
            
            {/* Total Customers */}
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Users size={32} />
                </div>
                <div className="stat-title">Total Customers</div>
                <div className="stat-value text-primary text-2xl">
                  {totalCustomers.toLocaleString()}
                </div>
                <div className="stat-desc">All time</div>
              </div>
            </div>

            {/* New Customers */}
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-figure text-success">
                  <UserPlus size={32} />
                </div>
                <div className="stat-title">New Customers</div>
                <div className="stat-value text-success text-2xl">
                  {dataWithPercentages[0].value.toLocaleString()}
                </div>
                <div className="stat-desc">{dataWithPercentages[0].percentage}% of total</div>
              </div>
            </div>

            {/* Returning Customers */}
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-figure text-info">
                  <UserCheck size={32} />
                </div>
                <div className="stat-title">Returning</div>
                <div className="stat-value text-info text-2xl">
                  {dataWithPercentages[1].value.toLocaleString()}
                </div>
                <div className="stat-desc">{dataWithPercentages[1].percentage}% of total</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
export default CustomerDonutChart;