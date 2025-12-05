import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package
} from "lucide-react";
import KPICard from "../components/Card.jsx";
import SalesTrendChart from "../components/SalesTrendChart.jsx";
import TopProductsChart from "../components/TopProductsChart.jsx";
import CustomerDonutChart from "../components/CustomerDonutChart.jsx";

export default function Dashboard({ data, loading = false }) {
// bests products sellers
   const products = [
    { id: 1, name: "iPhone 15 Pro", sales: 125400, units: 1254 },
    { id: 2, name: "MacBook Air M3", sales: 98750, units: 987 },
    { id: 3, name: "AirPods Pro", sales: 76200, units: 2540 },
    { id: 4, name: "iPad Pro", sales: 65800, units: 658 },
    { id: 5, name: "Apple Watch", sales: 54300, units: 1086 },
  ];
  // Default KPI data (global overview)
  const defaultData = [
    {
      id: 1,
      title: "Total Revenue",
      value: "580,000",
      prefix: "$",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      iconColor: "success",
    },
    {
      id: 2,
      title: "Total Sales",
      value: "1,250",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      iconColor: "primary",
    },
    {
      id: 3,
      title: "Conversion Rate",
      value: "3.24",
      suffix: "%",
      change: "-0.4%",
      trend: "down",
      icon: TrendingUp,
      iconColor: "warning",
    },
    {
      id: 4,
      title: "Average Order Value",
      value: "464.00",
      prefix: "$",
      change: "+5.1%",
      trend: "up",
      icon: Package,
      iconColor: "info",
    },
  ];

  const ordersData = [
    {
      id: 1,
      city: "New York",
      country: "USA",
      orders: 2450,
      revenue: 458900,
    },
    {
      id: 2,
      city: "London",
      country: "UK",
      orders: 1890,
      revenue: 356700,
    },
    {
      id: 3,
      city: "Tokyo",
      country: "Japan",
      orders: 2100,
      revenue: 425000,
    },
    {
      id: 4,
      city: "Paris",
      country: "France",
      orders: 1560,
      revenue: 298500,
    },
    {
      id: 5,
      city: "Sydney",
      country: "Australia",
      orders: 1200,
      revenue: 245000,
    },
    {
      id: 6,
      city: "Dubai",
      country: "UAE",
      orders: 1450,
      revenue: 312000,
    },
    {
      id: 7,
      city: "Toronto",
      country: "Canada",
      orders: 980,
      revenue: 189000,
    },
    {
      id: 8,
      city: "Berlin",
      country: "Germany",
      orders: 1350,
      revenue: 267000,
    },
  ];
  
  const customerData = [
  { name: "New Customers", value: 3450, color: "#10b981" },
  { name: "Returning Customers", value: 6850, color: "#3b82f6" },
];



  const kpiData = data || defaultData;

  return (
    <div>
      {/* KPI Cards */}
      <p className="opacity-70 mb-8">Welcome to your ShopMetric Analytics Pro dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi) => (
          <KPICard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
            iconColor={kpi.iconColor}
            loading={loading}
          />
        ))}
      </div>

      {/* Sales Trend Chart */}
      <SalesTrendChart
        title="Monthly Sales Performance"
        currency="$"
      />
       <div className="p-6">
      <TopProductsChart data={products} title="Top 5 Electronics" height={350} showRank={true} />
    </div>
    <CustomerDonutChart 
  data={customerData}
  title="Customer Distribution"
  size={300}
  showStats={true}
/>
    </div>
    
  );
}
