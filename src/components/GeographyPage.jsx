import React from "react";
import { Globe, DollarSign, Package, MapPin, TrendingUp } from "lucide-react";
import { WorldMap, TopCountriesChart, TopCitiesTable } from "./GeographyComponents";

/**
 * 🌍 GEOGRAPHY PAGE - Real World Map
 * Route: /dashboard/geography
 * 
 * Features:
 * - Interactive world map with React-Simple-Maps
 * - Tooltip on hover (country, sales, revenue)
 * - Color coding by performance
 * - Top 5 countries bar chart (Recharts)
 * - Top 5 cities table
 * - KPI cards
 */
export default function GeographyPage() {
  
  /**
   * 🗺️ SALES DATA BY COUNTRY
   * Key = ISO 3-digit country code (important for react-simple-maps)
   * 
   * Find ISO codes here: https://en.wikipedia.org/wiki/ISO_3166-1_numeric
   */
  const salesByCountry = {
    // North America
    "840": { name: "United States", revenue: 458900, orders: 2450, flag: "🇺🇸" }, // USA
    "124": { name: "Canada", revenue: 245000, orders: 1200, flag: "🇨🇦" },
    "484": { name: "Mexico", revenue: 89000, orders: 467, flag: "🇲🇽" },
    
    // Europe
    "826": { name: "United Kingdom", revenue: 356700, orders: 1890, flag: "🇬🇧" },
    "276": { name: "Germany", revenue: 298500, orders: 1560, flag: "🇩🇪" },
    "250": { name: "France", revenue: 267000, orders: 1350, flag: "🇫🇷" },
    "724": { name: "Spain", revenue: 156000, orders: 823, flag: "🇪🇸" },
    "380": { name: "Italy", revenue: 189000, orders: 978, flag: "🇮🇹" },
    "528": { name: "Netherlands", revenue: 178000, orders: 890, flag: "🇳🇱" },
    
    // Asia
    "392": { name: "Japan", revenue: 425000, orders: 2100, flag: "🇯🇵" },
    "156": { name: "China", revenue: 312000, orders: 1654, flag: "🇨🇳" },
    "410": { name: "South Korea", revenue: 234000, orders: 1234, flag: "🇰🇷" },
    "702": { name: "Singapore", revenue: 156000, orders: 760, flag: "🇸🇬" },
    "356": { name: "India", revenue: 198000, orders: 1045, flag: "🇮🇳" },
    "784": { name: "UAE", revenue: 189000, orders: 980, flag: "🇦🇪" },
    
    // Oceania
    "036": { name: "Australia", revenue: 312000, orders: 1450, flag: "🇦🇺" },
    "554": { name: "New Zealand", revenue: 98000, orders: 512, flag: "🇳🇿" },
    
    // South America
    "076": { name: "Brazil", revenue: 145000, orders: 768, flag: "🇧🇷" },
    "032": { name: "Argentina", revenue: 67000, orders: 356, flag: "🇦🇷" },
    
    // Africa
    "710": { name: "South Africa", revenue: 123000, orders: 645, flag: "🇿🇦" },
  };

  // Convert to array and sort by revenue for top countries
  const countriesArray = Object.entries(salesByCountry).map(([code, data]) => ({
    code,
    ...data,
  }));

  const topCountries = [...countriesArray]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Top cities data
  const topCities = [
    { id: 1, name: "New York", country: "USA", flag: "🇺🇸", revenue: 125400, orders: 678 },
    { id: 2, name: "London", country: "UK", flag: "🇬🇧", revenue: 98750, orders: 523 },
    { id: 3, name: "Tokyo", country: "Japan", flag: "🇯🇵", revenue: 112300, orders: 589 },
    { id: 4, name: "Los Angeles", country: "USA", flag: "🇺🇸", revenue: 89600, orders: 467 },
    { id: 5, name: "Paris", country: "France", flag: "🇫🇷", revenue: 76200, orders: 398 },
  ];

  // Calculate totals
  const totalRevenue = countriesArray.reduce((sum, c) => sum + c.revenue, 0);
  const totalOrders = countriesArray.reduce((sum, c) => sum + c.orders, 0);
  const activeCountries = countriesArray.length;
  const avgRevenuePerCountry = totalRevenue / activeCountries;

  return (
    <div className="p-6 bg-base-200 min-h-screen space-y-6">
      
      {/* 📌 PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Geographic Analytics
          </h1>
          <p className="text-base-content/60">
            Interactive world map with sales performance by region
          </p>
        </div>
      </div>

      {/* 📊 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-success">
              <DollarSign size={32} />
            </div>
            <div className="stat-title">Global Revenue</div>
            <div className="stat-value text-success text-2xl">
              ${(totalRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="stat-desc">Across all markets</div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Package size={32} />
            </div>
            <div className="stat-title">Total Orders</div>
            <div className="stat-value text-primary text-2xl">
              {(totalOrders / 1000).toFixed(1)}k
            </div>
            <div className="stat-desc">Global shipments</div>
          </div>
        </div>

        {/* Active Countries */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-info">
              <MapPin size={32} />
            </div>
            <div className="stat-title">Active Markets</div>
            <div className="stat-value text-info text-2xl">
              {activeCountries}
            </div>
            <div className="stat-desc">Countries</div>
          </div>
        </div>

        {/* Avg Revenue per Country */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-warning">
              <TrendingUp size={32} />
            </div>
            <div className="stat-title">Avg per Market</div>
            <div className="stat-value text-warning text-2xl">
              ${(avgRevenuePerCountry / 1000).toFixed(0)}k
            </div>
            <div className="stat-desc">Per country</div>
          </div>
        </div>

      </div>

      {/* 🗺️ INTERACTIVE WORLD MAP */}
      <WorldMap salesData={salesByCountry} height={500} />

      {/* 📊 TOP PERFORMERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Countries Bar Chart */}
        <TopCountriesChart countries={topCountries} />

        {/* Top Cities Table */}
        <TopCitiesTable cities={topCities} />

      </div>

      {/* 💡 INSTRUCTIONS */}
      
    </div>
  );
}