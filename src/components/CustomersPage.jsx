import React, { useState } from "react";
import { Plus, Download, Users, Star, TrendingUp, DollarSign } from "lucide-react";
import CustomersTable from "./CustomersTable";

/**
 * 👥 CUSTOMERS PAGE
 * Route: /dashboard/customers
 * 
 * Complete customer management page with:
 * - Customers table with segmentation
 * - Customer stats overview
 * - Purchase history tracking
 */
export default function CustomersPage() {
  
  // 🎯 CUSTOMERS DATA
  const [customers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      segment: "vip",
      orders: 28,
      lifetimeValue: 8450,
      lastOrder: "2024-11-20",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      segment: "active",
      orders: 12,
      lifetimeValue: 3200,
      lastOrder: "2024-11-18",
    },
    {
      id: 3,
      name: "Emma Williams",
      email: "emma.w@email.com",
      segment: "new",
      orders: 2,
      lifetimeValue: 450,
      lastOrder: "2024-11-22",
    },
    {
      id: 4,
      name: "James Brown",
      email: "james.b@email.com",
      segment: "active",
      orders: 15,
      lifetimeValue: 4100,
      lastOrder: "2024-11-15",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      email: "olivia.m@email.com",
      segment: "vip",
      orders: 34,
      lifetimeValue: 12800,
      lastOrder: "2024-11-21",
    },
    {
      id: 6,
      name: "William Davis",
      email: "w.davis@email.com",
      segment: "inactive",
      orders: 5,
      lifetimeValue: 890,
      lastOrder: "2024-08-10",
    },
    {
      id: 7,
      name: "Sophia Garcia",
      email: "sophia.g@email.com",
      segment: "active",
      orders: 18,
      lifetimeValue: 5200,
      lastOrder: "2024-11-19",
    },
    {
      id: 8,
      name: "Liam Rodriguez",
      email: "liam.r@email.com",
      segment: "new",
      orders: 1,
      lifetimeValue: 120,
      lastOrder: "2024-11-23",
    },
    {
      id: 9,
      name: "Ava Wilson",
      email: "ava.w@email.com",
      segment: "vip",
      orders: 42,
      lifetimeValue: 15600,
      lastOrder: "2024-11-20",
    },
    {
      id: 10,
      name: "Noah Anderson",
      email: "noah.a@email.com",
      segment: "active",
      orders: 9,
      lifetimeValue: 2100,
      lastOrder: "2024-11-16",
    },
    {
      id: 11,
      name: "Isabella Thomas",
      email: "isabella.t@email.com",
      segment: "inactive",
      orders: 3,
      lifetimeValue: 560,
      lastOrder: "2024-07-15",
    },
    {
      id: 12,
      name: "Ethan Jackson",
      email: "ethan.j@email.com",
      segment: "active",
      orders: 22,
      lifetimeValue: 6800,
      lastOrder: "2024-11-17",
    },
    {
      id: 13,
      name: "Mia White",
      email: "mia.w@email.com",
      segment: "new",
      orders: 1,
      lifetimeValue: 89,
      lastOrder: "2024-11-24",
    },
    {
      id: 14,
      name: "Lucas Harris",
      email: "lucas.h@email.com",
      segment: "vip",
      orders: 38,
      lifetimeValue: 14200,
      lastOrder: "2024-11-22",
    },
    {
      id: 15,
      name: "Charlotte Martin",
      email: "charlotte.m@email.com",
      segment: "active",
      orders: 14,
      lifetimeValue: 3850,
      lastOrder: "2024-11-14",
    },
  ]);

  // Calculate segment stats
  const totalCustomers = customers.length;
  const newCustomers = customers.filter(c => c.segment === "new").length;
  const activeCustomers = customers.filter(c => c.segment === "active").length;
  const vipCustomers = customers.filter(c => c.segment === "vip").length;
  const inactiveCustomers = customers.filter(c => c.segment === "inactive").length;

  // Calculate totals
  const totalRevenue = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);
  const avgLifetimeValue = totalRevenue / totalCustomers;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);

  // Handle actions
  const handleView = (customer) => {
    console.log("View customer:", customer);
    // TODO: Open customer detail modal with purchase history
  };

  const handleContact = (customer) => {
    console.log("Contact customer:", customer);
    // TODO: Open email/contact modal
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen space-y-6">
      
      {/* 📌 PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Customers
          </h1>
          <p className="text-base-content/60">
            Manage your customer base and track engagement
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost gap-2">
            <Download size={20} />
            Export
          </button>
          <button className="btn btn-primary gap-2">
            <Plus size={20} />
            Add Customer
          </button>
        </div>
      </div>

      {/* 📊 STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Customers */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users size={32} />
            </div>
            <div className="stat-title">Total Customers</div>
            <div className="stat-value text-primary">{totalCustomers}</div>
            <div className="stat-desc">All registered users</div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-success">
              <DollarSign size={32} />
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-success">
              ${(totalRevenue / 1000).toFixed(0)}k
            </div>
            <div className="stat-desc">From all customers</div>
          </div>
        </div>

        {/* Average LTV */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-info">
              <TrendingUp size={32} />
            </div>
            <div className="stat-title">Avg Lifetime Value</div>
            <div className="stat-value text-info">
              ${avgLifetimeValue.toFixed(0)}
            </div>
            <div className="stat-desc">Per customer</div>
          </div>
        </div>

        {/* VIP Customers */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-warning">
              <Star size={32} />
            </div>
            <div className="stat-title">VIP Customers</div>
            <div className="stat-value text-warning">{vipCustomers}</div>
            <div className="stat-desc">High value clients</div>
          </div>
        </div>

      </div>

      {/* 📊 SEGMENT BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* New Customers */}
        <div className="card bg-gradient-to-br from-info/10 to-info/5 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-base-content/60">New Customers</h3>
                <p className="text-3xl font-bold text-info mt-1">{newCustomers}</p>
              </div>
              <div className="badge badge-info badge-lg">{((newCustomers/totalCustomers)*100).toFixed(0)}%</div>
            </div>
            <progress 
              className="progress progress-info w-full mt-4" 
              value={newCustomers} 
              max={totalCustomers}
            ></progress>
          </div>
        </div>

        {/* Active Customers */}
        <div className="card bg-gradient-to-br from-success/10 to-success/5 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-base-content/60">Active Customers</h3>
                <p className="text-3xl font-bold text-success mt-1">{activeCustomers}</p>
              </div>
              <div className="badge badge-success badge-lg">{((activeCustomers/totalCustomers)*100).toFixed(0)}%</div>
            </div>
            <progress 
              className="progress progress-success w-full mt-4" 
              value={activeCustomers} 
              max={totalCustomers}
            ></progress>
          </div>
        </div>

        {/* VIP Customers */}
        <div className="card bg-gradient-to-br from-warning/10 to-warning/5 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-base-content/60">VIP Customers</h3>
                <p className="text-3xl font-bold text-warning mt-1">{vipCustomers}</p>
              </div>
              <div className="badge badge-warning badge-lg">{((vipCustomers/totalCustomers)*100).toFixed(0)}%</div>
            </div>
            <progress 
              className="progress progress-warning w-full mt-4" 
              value={vipCustomers} 
              max={totalCustomers}
            ></progress>
          </div>
        </div>

        {/* Inactive Customers */}
        <div className="card bg-gradient-to-br from-base-300/50 to-base-300/20 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-base-content/60">Inactive Customers</h3>
                <p className="text-3xl font-bold text-base-content mt-1">{inactiveCustomers}</p>
              </div>
              <div className="badge badge-ghost badge-lg">{((inactiveCustomers/totalCustomers)*100).toFixed(0)}%</div>
            </div>
            <progress 
              className="progress w-full mt-4" 
              value={inactiveCustomers} 
              max={totalCustomers}
            ></progress>
          </div>
        </div>

      </div>

      {/* 📋 CUSTOMERS TABLE */}
      <CustomersTable 
        customers={customers}
        onView={handleView}
        onContact={handleContact}
      />

    </div>
  );
}