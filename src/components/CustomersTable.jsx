import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Mail,
  Phone,
  Eye,
  Star,
  Calendar,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

/**
 * 👥 CUSTOMERS TABLE COMPONENT - Reusable
 * 
 * Complete customer management table with:
 * - Search functionality
 * - Segment filters (New, Active, Inactive, VIP)
 * - Purchase history
 * - Customer stats
 * - Sorting
 * 
 * @param {Array} customers - Array of customer objects
 * @param {Function} onView - Callback when view is clicked
 * @param {Function} onContact - Callback when contact is clicked
 */
export default function CustomersTable({ 
  customers = [],
  onView,
  onContact,
}) {
  // 🔍 SEARCH & FILTERS STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // 🔧 FILTERING LOGIC
  const filteredCustomers = customers.filter(customer => {
    // Search filter
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Segment filter
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment;
    
    return matchesSearch && matchesSegment;
  });

  // 🔧 SORTING LOGIC
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
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

  // 🎨 Get segment badge
  const getSegmentBadge = (segment) => {
    const badges = {
      new: <span className="badge badge-info gap-1"><Star size={12} /> New</span>,
      active: <span className="badge badge-success gap-1">Active</span>,
      inactive: <span className="badge badge-ghost gap-1">Inactive</span>,
      vip: <span className="badge badge-warning gap-1"><Star size={12} /> VIP</span>,
    };
    return badges[segment] || badges.active;
  };

  // 🎨 Get lifetime value color
  const getLTVColor = (ltv) => {
    if (ltv >= 5000) return "text-warning";
    if (ltv >= 2000) return "text-success";
    if (ltv >= 1000) return "text-info";
    return "text-base-content";
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

  // Calculate stats by segment
  const segmentStats = {
    all: customers.length,
    new: customers.filter(c => c.segment === "new").length,
    active: customers.filter(c => c.segment === "active").length,
    inactive: customers.filter(c => c.segment === "inactive").length,
    vip: customers.filter(c => c.segment === "vip").length,
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        {/* 📊 HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingBag className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-base-content">Customers List</h3>
              <p className="text-sm text-base-content/60">
                {sortedCustomers.length} of {customers.length} customers
              </p>
            </div>
          </div>
        </div>

        {/* 🎯 SEGMENT TABS */}
        <div className="tabs tabs-boxed bg-base-200 mb-6">
          <button 
            className={`tab ${selectedSegment === "all" ? "tab-active" : ""}`}
            onClick={() => setSelectedSegment("all")}
          >
            All ({segmentStats.all})
          </button>
          <button 
            className={`tab ${selectedSegment === "new" ? "tab-active" : ""}`}
            onClick={() => setSelectedSegment("new")}
          >
            New ({segmentStats.new})
          </button>
          <button 
            className={`tab ${selectedSegment === "active" ? "tab-active" : ""}`}
            onClick={() => setSelectedSegment("active")}
          >
            Active ({segmentStats.active})
          </button>
          <button 
            className={`tab ${selectedSegment === "inactive" ? "tab-active" : ""}`}
            onClick={() => setSelectedSegment("inactive")}
          >
            Inactive ({segmentStats.inactive})
          </button>
          <button 
            className={`tab ${selectedSegment === "vip" ? "tab-active" : ""}`}
            onClick={() => setSelectedSegment("vip")}
          >
            VIP ({segmentStats.vip})
          </button>
        </div>

        {/* 🔍 SEARCH */}
        <div className="form-control mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={18} />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    onClick={() => handleSort('name')}
                  >
                    Customer
                    {sortBy === 'name' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>Segment</th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('orders')}
                  >
                    Orders
                    {sortBy === 'orders' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('lifetimeValue')}
                  >
                    Lifetime Value
                    {sortBy === 'lifetimeValue' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>Avg Order</th>
                <th>Last Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Filter className="text-base-content/40" size={48} />
                      <p className="text-base-content/60">No customers found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover">
                    
                    {/* Customer Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-12">
                            <span className="text-lg font-bold">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{customer.name}</div>
                          <div className="text-sm opacity-50 flex items-center gap-1">
                            <Mail size={12} />
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Segment */}
                    <td>
                      {getSegmentBadge(customer.segment)}
                    </td>

                    {/* Orders */}
                    <td>
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-primary" />
                        <span className="font-semibold">{customer.orders}</span>
                      </div>
                    </td>

                    {/* Lifetime Value */}
                    <td>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className={getLTVColor(customer.lifetimeValue)} />
                        <span className={`font-bold ${getLTVColor(customer.lifetimeValue)}`}>
                          ${customer.lifetimeValue.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Average Order */}
                    <td>
                      <span className="font-semibold text-info">
                        ${(customer.lifetimeValue / customer.orders).toFixed(2)}
                      </span>
                    </td>

                    {/* Last Order */}
                    <td>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-base-content/60" />
                        {customer.lastOrder}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex gap-1">
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => onView && onView(customer)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => onContact && onContact(customer)}
                          title="Contact"
                        >
                          <Mail size={16} />
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
        {sortedCustomers.length > 0 && (
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