import { useEffect, useState } from "react";
import RevenueEvolutionChart from "./RevenueEvolutionChart";

/**
 * 📄 SALES & REVENUE PAGE
 * Route: /dashboard/sales
 * 
 * This page displays revenue analytics with multi-period comparison
 */
export default function SalesRevenuePage() {
  const [activePeriod, setActivePeriod] = useState("month");

  useEffect(() => {
    console.log('SalesRevenuePage mounted');
    return () => console.log('SalesRevenuePage unmounted');
  }, []);

  // 🎯 YOUR DATA FORMAT
  // Organize data by time period (weekly, monthly, yearly)
  const revenueData = {
    
    // Weekly data (last 12 weeks)
    weekly: [
      { period: "Week 1", current: 45000, previous: 38000, target: 42000 },
      { period: "Week 2", current: 48000, previous: 40000, target: 42000 },
      { period: "Week 3", current: 52000, previous: 42000, target: 42000 },
      { period: "Week 4", current: 49000, previous: 41000, target: 42000 },
      { period: "Week 5", current: 55000, previous: 44000, target: 42000 },
      { period: "Week 6", current: 58000, previous: 46000, target: 42000 },
      { period: "Week 7", current: 54000, previous: 45000, target: 42000 },
      { period: "Week 8", current: 60000, previous: 47000, target: 42000 },
      { period: "Week 9", current: 62000, previous: 49000, target: 42000 },
      { period: "Week 10", current: 59000, previous: 48000, target: 42000 },
      { period: "Week 11", current: 65000, previous: 50000, target: 42000 },
      { period: "Week 12", current: 68000, previous: 52000, target: 42000 },
    ],

    // Monthly data (12 months)
    monthly: [
      { period: "Jan", current: 185000, previous: 165000, target: 180000 },
      { period: "Feb", current: 192000, previous: 170000, target: 180000 },
      { period: "Mar", current: 210000, previous: 185000, target: 180000 },
      { period: "Apr", current: 225000, previous: 195000, target: 180000 },
      { period: "May", current: 240000, previous: 205000, target: 180000 },
      { period: "Jun", current: 255000, previous: 215000, target: 180000 },
      { period: "Jul", current: 268000, previous: 225000, target: 180000 },
      { period: "Aug", current: 275000, previous: 235000, target: 180000 },
      { period: "Sep", current: 282000, previous: 242000, target: 180000 },
      { period: "Oct", current: 295000, previous: 255000, target: 180000 },
      { period: "Nov", current: 310000, previous: 268000, target: 180000 },
      { period: "Dec", current: 325000, previous: 280000, target: 180000 },
    ],

    // Yearly data (5 years)
    yearly: [
      { period: "2020", current: 1850000, previous: 1650000 },
      { period: "2021", current: 2180000, previous: 1850000 },
      { period: "2022", current: 2520000, previous: 2180000 },
      { period: "2023", current: 2850000, previous: 2520000 },
      { period: "2024", current: 3200000, previous: 2850000 },
    ],
  };

  return (
    <div className=" bg-base-200 min-h-screen space-y-6">
     <p id="sales-revenue-subtitle" data-testid="sales-revenue-subtitle" className="opacity-70 mb-8">Track and analyze your revenue performance over time</p>

      {/* 📊 MAIN REVENUE CHART */}
      <RevenueEvolutionChart 
        data={revenueData}
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        title="Revenue Evolution"
        height={450}
      />

      {/* 📝 ADDITIONAL CONTENT - Add more components here */}
      {/* Example: KPI Cards, Product Performance, etc. */}
      
    </div>
  );
}