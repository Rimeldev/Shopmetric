import React, { useState } from "react";
import { MapPin, Globe, TrendingUp, DollarSign, Package } from "lucide-react";

/**
 * 🗺️ GEOGRAPHIC ORDERS MAP
 * 
 * Note: Real interactive maps require libraries like:
 * - Leaflet (react-leaflet)
 * - Google Maps API
 * - Mapbox
 * 
 * This component shows a visual representation with:
 * - Static world map background
 * - Animated pins for each location
 * - Interactive city cards
 * - Stats and heatmap-style colors
 */

/**
 * 🔧 ORDERS MAP COMPONENT - Reusable
 * 
 * @param {Array} data - Orders data by location
 * @param {string} title - Map title
 * @param {boolean} showStats - Show statistics
 */
function OrdersGeographicMap({ 
  data,
  title = "Orders by Location",
  showStats = true,
}) {
  const [selectedCity, setSelectedCity] = useState(null);

  // Calculate totals
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  // Find top city
  const topCity = data.reduce((max, item) => 
    item.revenue > max.revenue ? item : max
  , data[0]);

  // Get color based on order volume (heatmap style)
  const getHeatColor = (orders) => {
    const maxOrders = Math.max(...data.map(d => d.orders));
    const intensity = orders / maxOrders;
    
    if (intensity > 0.7) return "#ef4444"; // Hot - Red
    if (intensity > 0.5) return "#f59e0b"; // Warm - Orange
    if (intensity > 0.3) return "#3b82f6"; // Medium - Blue
    return "#10b981"; // Cool - Green
  };

  // Get size based on orders
  const getPinSize = (orders) => {
    const maxOrders = Math.max(...data.map(d => d.orders));
    const ratio = orders / maxOrders;
    return 20 + (ratio * 30); // Between 20px and 50px
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        {/* 🌍 HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info/10 rounded-lg">
              <Globe className="text-info" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-base-content">{title}</h3>
              <p className="text-sm text-base-content/60">Global distribution</p>
            </div>
          </div>
          <div className="badge badge-info badge-lg">
            {data.length} Cities
          </div>
        </div>

        {/* 📊 STATS SUMMARY */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            
            {/* Total Orders */}
            <div className="stats shadow bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Package size={28} />
                </div>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value text-primary text-2xl">
                  {totalOrders.toLocaleString()}
                </div>
                <div className="stat-desc">Across all locations</div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="stats shadow bg-gradient-to-br from-success/10 to-success/5">
              <div className="stat">
                <div className="stat-figure text-success">
                  <DollarSign size={28} />
                </div>
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value text-success text-2xl">
                  ${(totalRevenue / 1000).toFixed(0)}k
                </div>
                <div className="stat-desc">Combined sales</div>
              </div>
            </div>

            {/* Top Location */}
            <div className="stats shadow bg-gradient-to-br from-warning/10 to-warning/5">
              <div className="stat">
                <div className="stat-figure text-warning">
                  <TrendingUp size={28} />
                </div>
                <div className="stat-title">Top Location</div>
                <div className="stat-value text-warning text-2xl truncate">
                  {topCity.city}
                </div>
                <div className="stat-desc">{topCity.country}</div>
              </div>
            </div>

          </div>
        )}

        {/* 🗺️ MAP VISUALIZATION */}
        <div className="relative bg-gradient-to-br from-base-200 to-base-300 rounded-xl p-8 min-h-[500px] overflow-hidden">
          
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* World regions background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Globe size={400} strokeWidth={0.5} />
          </div>

          {/* 📍 LOCATION PINS */}
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-10">
            {data.map((location, index) => {
              const pinSize = getPinSize(location.orders);
              const color = getHeatColor(location.orders);
              const isSelected = selectedCity?.id === location.id;

              return (
                <div
                  key={location.id}
                  className={`relative transform transition-all duration-300 cursor-pointer
                    ${isSelected ? 'scale-110 z-20' : 'hover:scale-105'}
                  `}
                  onClick={() => setSelectedCity(isSelected ? null : location)}
                >
                  {/* Pin with pulse animation */}
                  <div className="relative">
                    <div 
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-bounce"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div 
                        className="rounded-full flex items-center justify-center shadow-lg"
                        style={{ 
                          width: `${pinSize}px`, 
                          height: `${pinSize}px`,
                          backgroundColor: color,
                        }}
                      >
                        <MapPin className="text-white" size={pinSize * 0.6} />
                      </div>
                      
                      {/* Pulse ring */}
                      <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div 
                    className={`card bg-base-100 shadow-xl mt-8 border-2 transition-all
                      ${isSelected ? 'border-primary shadow-2xl' : 'border-transparent'}
                    `}
                  >
                    <div className="card-body p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-base-content text-sm">
                            {location.city}
                          </h4>
                          <p className="text-xs text-base-content/60">
                            {location.country}
                          </p>
                        </div>
                        <div 
                          className="badge badge-sm"
                          style={{ backgroundColor: color, color: 'white' }}
                        >
                          #{index + 1}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-base-content/60">Orders:</span>
                          <span className="font-bold" style={{ color }}>
                            {location.orders.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-base-content/60">Revenue:</span>
                          <span className="font-bold text-success">
                            ${location.revenue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-base-content/60">Avg Order:</span>
                          <span className="font-bold text-primary">
                            ${(location.revenue / location.orders).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-base-content/60">Share</span>
                          <span className="font-bold">
                            {((location.orders / totalOrders) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <progress 
                          className="progress progress-primary w-full h-2" 
                          value={location.orders} 
                          max={totalOrders}
                          style={{ 
                            '--progress-color': color,
                          }}
                        ></progress>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 🎨 LEGEND */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-base-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error rounded-full"></div>
            <span className="text-sm">High Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded-full"></div>
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-info rounded-full"></div>
            <span className="text-sm">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded-full"></div>
            <span className="text-sm">Very Low</span>
          </div>
        </div>

      </div>
    </div>
  );
}
export default OrdersGeographicMap;