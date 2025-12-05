import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Mail,
  Clock,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  Send,
} from "lucide-react";

/**
 * 🛒 CART ABANDONMENT TABLE COMPONENT - Reusable
 * 
 * Complete abandoned cart tracking table with:
 * - Search functionality
 * - Time filter (24h, 7d, 30d)
 * - Value range filter
 * - Cart value and items display
 * - Recovery actions
 * 
 * @param {Array} abandonedCarts - Array of abandoned cart objects
 * @param {Function} onSendReminder - Callback when send reminder is clicked
 * @param {Function} onViewCart - Callback when view cart is clicked
 */
export default function CartAbandonmentTable({ 
  abandonedCarts = [],
  onSendReminder,
  onViewCart,
}) {
  // 🔍 FILTERS STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [valueFilter, setValueFilter] = useState("all");
  const [sortBy, setSortBy] = useState("abandonedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // 🔧 FILTERING LOGIC
  const filteredCarts = abandonedCarts.filter(cart => {
    // Search filter
    const matchesSearch = 
      cart.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Time filter
    let matchesTime = true;
    if (timeFilter !== "all") {
      const cartDate = new Date(cart.abandonedAt);
      const now = new Date();
      const hoursDiff = (now - cartDate) / (1000 * 60 * 60);
      
      if (timeFilter === "24h") matchesTime = hoursDiff <= 24;
      else if (timeFilter === "7d") matchesTime = hoursDiff <= 168;
      else if (timeFilter === "30d") matchesTime = hoursDiff <= 720;
    }
    
    // Value filter
    let matchesValue = true;
    if (valueFilter === "0-50") matchesValue = cart.cartValue <= 50;
    else if (valueFilter === "50-200") matchesValue = cart.cartValue > 50 && cart.cartValue <= 200;
    else if (valueFilter === "200-500") matchesValue = cart.cartValue > 200 && cart.cartValue <= 500;
    else if (valueFilter === "500+") matchesValue = cart.cartValue > 500;
    
    return matchesSearch && matchesTime && matchesValue;
  });

  // 🔧 SORTING LOGIC
  const sortedCarts = [...filteredCarts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'abandonedAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // 🎨 Get time ago string
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  // 🎨 Get urgency badge
  const getUrgencyBadge = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (now - date) / (1000 * 60 * 60);
    
    if (diffHours <= 24) {
      return <span className="badge badge-error badge-sm">Hot Lead</span>;
    } else if (diffHours <= 72) {
      return <span className="badge badge-warning badge-sm">Follow Up</span>;
    } else {
      return <span className="badge badge-ghost badge-sm">Cold</span>;
    }
  };

  // Toggle sort order
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        {/* 📊 HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <ShoppingCart className="text-warning" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-base-content">Abandoned Carts</h3>
              <p className="text-sm text-base-content/60">
                {sortedCarts.length} of {abandonedCarts.length} carts
              </p>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH & FILTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          
          {/* Search */}
          <div className="form-control">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={18} />
              <input
                type="text"
                placeholder="Search by customer..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Time Filter */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          {/* Value Filter */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full"
              value={valueFilter}
              onChange={(e) => setValueFilter(e.target.value)}
            >
              <option value="all">All Values</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-200">$50 - $200</option>
              <option value="200-500">$200 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>
        </div>

        {/* 📋 TABLE */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('customerName')}
                  >
                    Customer
                    {sortBy === 'customerName' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>Cart Items</th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('cartValue')}
                  >
                    Cart Value
                    {sortBy === 'cartValue' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('abandonedAt')}
                  >
                    Abandoned
                    {sortBy === 'abandonedAt' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCarts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Filter className="text-base-content/40" size={48} />
                      <p className="text-base-content/60">No abandoned carts found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedCarts.map((cart) => (
                  <tr key={cart.id} className="hover">
                    
                    {/* Customer Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-warning text-warning-content rounded-full w-10">
                            <span className="text-sm font-bold">
                              {cart.customerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm">{cart.customerName}</div>
                          <div className="text-xs opacity-50 flex items-center gap-1">
                            <Mail size={10} />
                            {cart.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cart Items */}
                    <td>
                      <div className="flex flex-col">
                        <span className="font-semibold">{cart.itemCount} items</span>
                        <div className="text-xs text-base-content/60 truncate max-w-[200px]">
                          {cart.items.join(", ")}
                        </div>
                      </div>
                    </td>

                    {/* Cart Value */}
                    <td>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-success" />
                        <span className="font-bold text-success text-lg">
                          ${cart.cartValue.toFixed(2)}
                        </span>
                      </div>
                    </td>

                    {/* Abandoned Time */}
                    <td>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-base-content/60" />
                        <span className="text-sm">{getTimeAgo(cart.abandonedAt)}</span>
                      </div>
                    </td>

                    {/* Urgency */}
                    <td>
                      {getUrgencyBadge(cart.abandonedAt)}
                    </td>

                    {/* Status */}
                    <td>
                      {cart.reminderSent ? (
                        <span className="badge badge-info badge-sm">Reminded</span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">No Action</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex gap-1">
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => onViewCart && onViewCart(cart)}
                          title="View Cart"
                        >
                          <ShoppingCart size={16} />
                        </button>
                        <button 
                          className={`btn btn-xs ${cart.reminderSent ? 'btn-ghost' : 'btn-primary'}`}
                          onClick={() => onSendReminder && onSendReminder(cart)}
                          title="Send Reminder"
                          disabled={cart.reminderSent}
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 📊 PAGINATION */}
        {sortedCarts.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}