import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "@vnedyalk0v/react19-simple-maps";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { Globe, TrendingUp } from "lucide-react";
import countries from "../data/countries-110m.json";

/**
 * 🗺️ WORLD MAP COMPONENT - Interactive Global Sales Map
 * 
 * Uses React-Simple-Maps for real world map visualization
 * 
 * @param {Object} salesData - Sales data by country (ISO code as key)
 * @param {number} height - Map height in pixels
 */
export function WorldMap({ salesData = {}, height = 500 }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // GeoJSON URL for world map (TopoJSON)
  const geoUrl = countries;

  // Calculate max revenue for color scaling
  const revenues = Object.values(salesData).map(d => d.revenue);
  const maxRevenue = Math.max(...revenues, 1);

  // Get color based on revenue (heatmap)
  const getCountryColor = (countryCode) => {
    const data = salesData[countryCode];
    if (!data) return "#e5e7eb"; // Gray for no data

    const ratio = data.revenue / maxRevenue;
    
    // Color scale: Red (low) → Yellow → Green (high)
    if (ratio > 0.7) return "#10b981"; // Green - High
    if (ratio > 0.5) return "#3b82f6"; // Blue - Medium-High
    if (ratio > 0.3) return "#f59e0b"; // Orange - Medium
    if (ratio > 0.1) return "#ef4444"; // Red - Low
    return "#fca5a5"; // Light Red - Very Low
  };

  // Handle mouse enter on country
  const handleMouseEnter = (geo, event) => {
    const countryCode = geo.id; // ISO 3-digit code
    const countryName = geo.properties.name;
    const data = salesData[countryCode];

    if (data) {
      setTooltipContent(
        `${countryName}\nRevenue: $${data.revenue.toLocaleString()}\nOrders: ${data.orders.toLocaleString()}`
      );
    } else {
      setTooltipContent(`${countryName}\nNo data`);
    }

    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Globe className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Global Sales Map</h3>
            <p className="text-sm text-base-content/60">Interactive world visualization</p>
          </div>
        </div>

        {/* Map */}
        <div style={{ height: `${height}px` }} className="relative bg-base-200 rounded-lg overflow-hidden">
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryCode = geo.id;
                    const hasData = salesData[countryCode];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getCountryColor(countryCode)}
                        stroke="#fff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            fill: hasData ? "#8b5cf6" : "#9ca3af",
                            outline: "none",
                            cursor: hasData ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={(event) => handleMouseEnter(geo, event)}
                        onMouseMove={(event) => {
                          setTooltipPosition({ x: event.clientX, y: event.clientY });
                        }}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip */}
          {tooltipContent && (
            <div
              className="fixed z-50 pointer-events-none"
              style={{
                left: `${tooltipPosition.x + 10}px`,
                top: `${tooltipPosition.y + 10}px`,
              }}
            >
              <div className="card bg-base-100 shadow-2xl border-2 border-primary/20">
                <div className="card-body p-3 min-w-[200px]">
                  <p className="text-sm whitespace-pre-line font-semibold">
                    {tooltipContent}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-base-300">
          <p className="text-sm font-semibold mb-2">Revenue Scale:</p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
              <span className="text-xs">High (70%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
              <span className="text-xs">Medium-High (50-70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
              <span className="text-xs">Medium (30-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444] rounded"></div>
              <span className="text-xs">Low (10-30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#e5e7eb] rounded"></div>
              <span className="text-xs">No Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 📊 TOP COUNTRIES BAR CHART - Horizontal Bar Chart
 * 
 * Shows top 5 countries by revenue
 * 
 * @param {Array} countries - Array of top countries
 */
export function TopCountriesChart({ countries = [] }) {
  const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    
    return (
      <div className="card bg-base-100 shadow-2xl p-3 border-2 border-primary/20">
        <p className="font-bold">{data.name}</p>
        <p className="text-success font-semibold">${data.revenue.toLocaleString()}</p>
        <p className="text-sm text-base-content/60">{data.orders.toLocaleString()} orders</p>
      </div>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-success" size={20} />
          <h3 className="text-xl font-bold">Top 5 Countries</h3>
        </div>

        <div style={{ height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={countries}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                stroke="currentColor"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                type="category" 
                dataKey="name"
                stroke="currentColor"
                style={{ fontSize: '12px' }}
                width={100}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                {countries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/**
 * 🏙️ TOP CITIES TABLE
 * 
 * Shows top 5 cities in a table
 * 
 * @param {Array} cities - Array of top cities
 */
export function TopCitiesTable({ cities = [] }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="text-xl font-bold mb-4">Top 5 Cities</h3>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>City</th>
                <th>Country</th>
                <th>Revenue</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={city.id} className="hover">
                  <td>
                    <div className="badge badge-primary">#{index + 1}</div>
                  </td>
                  <td>
                    <span className="font-bold">{city.name}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{city.flag}</span>
                      <span>{city.country}</span>
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-success">
                      ${city.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="font-semibold">{city.orders.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}