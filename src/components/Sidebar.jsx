import React, { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  Globe,
  Radio,
  FileText,
  Settings,
  PanelLeftClose,
  PanelRightOpen,
  ChevronDown,
  LogOut,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children, activeItem = 'dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3);
  const [theme, setTheme] = useState(() => {
    return document?.querySelector("html")?.dataset?.theme || "light";
  });
  const navigate = useNavigate();

  const toggleTheme = () => {
    const html = document.querySelector("html");
    const newTheme = html.dataset.theme === "light" ? "dark" : "light";
    html.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { id: 'sales', icon: TrendingUp, label: "Sales & Revenue", path: "/dashboard/sales" },
    { id: 'products', icon: Package, label: "Products", path: "/dashboard/products" },
    { id: 'customers', icon: Users, label: "Customers", path: "/dashboard/customers" },
    { id: 'cart-abandonment', icon: ShoppingCart, label: "Cart Abandonment", path: "/dashboard/cart-abandonment" },
    { id: 'geography', icon: Globe, label: "Geography", path: "/dashboard/geography" },
    { id: 'channels', icon: Radio, label: "Sales Channels", path: "/dashboard/channels" },
    { id: 'reports', icon: FileText, label: "Reports", path: "/dashboard/reports" },
    { id: 'settings', icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 h-screen bg-base-100 border-r border-base-300 shadow-xl
        ${sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20 lg:translate-x-0"} 
        flex flex-col transition-all duration-300`}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <ShoppingCart className="text-white" size={20} />
            </div>
            {(sidebarOpen || window.innerWidth >= 1024) && (
              <div className={`flex flex-col ${!sidebarOpen && 'lg:hidden'}`}>
                <span className="font-bold text-lg truncate">ShopMetric</span>
                <span className="text-xs opacity-60 truncate">Analytics Pro</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-xs btn-ghost"
          >
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        </div>

        {/* User */}
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <div className={`p-4 border-b border-base-300 ${!sidebarOpen && 'lg:hidden'}`}>
            <div className="flex items-center gap-3 bg-base-200 hover:bg-base-300 p-2 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                JD
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs opacity-60 truncate">admin@shopmetric.com</p>
              </div>
              <ChevronDown size={16} className="opacity-60" />
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isCollapsed = !sidebarOpen && window.innerWidth >= 1024;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg 
                  transition-all duration-200
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                    : "hover:bg-base-200"
                  }
                  ${isCollapsed && "justify-center"}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20}/>
                {(sidebarOpen || window.innerWidth < 1024) && (
                  <span className={`font-medium text-sm truncate ${isCollapsed && 'lg:hidden'}`}>
                    {item.label}
                  </span>
                )}
                {(sidebarOpen || window.innerWidth < 1024) && isActive && (
                  <div className={`ml-auto w-2 h-2 bg-white rounded-full animate-pulse ${isCollapsed && 'lg:hidden'}`}></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-base-300">
          <button
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-100 text-red-500 justify-start 
            ${!sidebarOpen && "lg:justify-center"}`}
          >
            <LogOut size={20} />
            {(sidebarOpen || window.innerWidth < 1024) && (
              <span className={`font-medium text-sm ${!sidebarOpen && 'lg:hidden'}`}>
                Déconnexion
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Header */}
        <header className="bg-base-100 border-b border-base-300">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            
           {/* Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              {/* Mobile menu button */}
              <button 
                onClick={() => setSidebarOpen(true)}
                className="btn btn-ghost btn-sm lg:hidden"
              >
                <Menu size={20} />
              </button>
              
              <div className="relative max-w-md w-full hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                <input type="text" placeholder="Search..." className="input input-bordered w-full pl-10" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
                <div className="relative w-5 h-5">
                  <Moon 
                    size={20} 
                    className={`absolute inset-0 transition-all duration-500 ${
                      theme === "light" 
                        ? "opacity-100 rotate-0 scale-100" 
                        : "opacity-0 rotate-180 scale-0"
                    }`} 
                  />
                  <Sun 
                    size={20} 
                    className={`absolute inset-0 transition-all duration-500 ${
                      theme === "dark" 
                        ? "opacity-100 rotate-0 scale-100" 
                        : "opacity-0 -rotate-180 scale-0"
                    }`} 
                  />
                </div>
              </button>

              {/* Notifications Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm relative">
                  <Bell size={20}/>
                  {notifications > 0 && (
                    <span className="badge badge-error badge-xs absolute top-0 right-0 text-white">
                      {notifications}
                    </span>
                  )}
                </label>
                
                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-72 p-2 shadow-2xl bg-base-100 border border-base-300 mt-3">
                  <div className="card-body">
                    <h3 className="font-bold text-lg mb-2">Notifications</h3>
                    
                    {notifications === 0 ? (
                      // No notifications
                      <div className="text-center py-8">
                        <Bell className="mx-auto mb-2 opacity-30" size={48} />
                        <p className="text-base-content/60">No notifications</p>
                      </div>
                    ) : (
                      // Notification list
                      <div className="space-y-2">
                        <div className="alert alert-info py-2">
                          <span className="text-sm">New order received</span>
                        </div>
                        <div className="alert alert-success py-2">
                          <span className="text-sm">Report generated successfully</span>
                        </div>
                        <div className="alert alert-warning py-2">
                          <span className="text-sm">Low stock alert for 3 products</span>
                        </div>
                      </div>
                    )}
                    
                    {notifications > 0 && (
                      <button className="btn btn-sm btn-ghost mt-2 w-full">
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile */}
              <button className="btn btn-ghost btn-sm hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm">
                  JD
                </div>
                <ChevronDown size={16} className="hidden md:block" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            {menuItems.find(item => item.id === activeItem)?.label || "Dashboard"}
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
}