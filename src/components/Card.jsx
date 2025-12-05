import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

// Composant KPI Card réutilisable
function KPICard({ 
  title, 
  value, 
  change, 
  trend = "neutral", 
  icon: Icon, 
  iconColor = "primary",
  prefix = "",
  suffix = "",
  loading = false 
}) {
  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUp size={16} />;
    if (trend === "down") return <ArrowDown size={16} />;
    return <Minus size={16} />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-base-content/60";
  };

  const getIconColorClass = () => {
    const colors = {
      primary: "bg-primary/10 text-primary",
      secondary: "bg-secondary/10 text-secondary",
      accent: "bg-accent/10 text-accent",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      error: "bg-error/10 text-error",
      info: "bg-info/10 text-info",
    };
    return colors[iconColor] || colors.primary;
  };

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="animate-pulse">
            <div className="h-4 bg-base-300 rounded w-24 mb-4"></div>
            <div className="h-8 bg-base-300 rounded w-32 mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        {/* Header with icon */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            
            <h3 className="text-sm font-medium text-base-content/60 mb-3">
              {title}
            </h3>
          </div>
          <div className={`p-3 rounded-lg ${getIconColorClass()}`}>
            <Icon size={24} />
          </div>
        </div>

        {/* Value */}
        <div className="mb-2">
          <p className="text-3xl font-bold text-base-content">
            {prefix}{value}{suffix}
          </p>
        </div>

        {/* Trend */}
        <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{change}</span>
          <span className="text-base-content/40 font-normal ml-1">vs mois dernier</span>
        </div>
      </div>
    </div>
  );
}
export default KPICard;