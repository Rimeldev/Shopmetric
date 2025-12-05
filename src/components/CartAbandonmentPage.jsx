import React, { useState } from "react";
import { 
  ShoppingCart, 
  AlertTriangle, 
  DollarSign, 
  TrendingDown,
  Mail,
  Clock,
} from "lucide-react";
import CartAbandonmentTable from "./CartAbandonmentTable";

/**
 * 🛒 CART ABANDONMENT PAGE
 * Route: /dashboard/cart-abandonment
 * 
 * Complete cart abandonment tracking with:
 * - Global abandonment rate
 * - Recovery statistics
 * - Abandoned carts list
 * - Recovery actions
 */
export default function CartAbandonmentPage() {
  
  // 🎯 ABANDONED CARTS DATA
  const [abandonedCarts] = useState([
    {
      id: 1,
      customerName: "Emily Parker",
      email: "emily.p@email.com",
      cartValue: 459.99,
      itemCount: 3,
      items: ["MacBook Air", "Magic Mouse", "USB-C Cable"],
      abandonedAt: "2024-11-24T14:30:00",
      reminderSent: false,
    },
    {
      id: 2,
      customerName: "David Miller",
      email: "d.miller@email.com",
      cartValue: 129.99,
      itemCount: 2,
      items: ["AirPods Pro", "iPhone Case"],
      abandonedAt: "2024-11-23T09:15:00",
      reminderSent: true,
    },
    {
      id: 3,
      customerName: "Jessica Taylor",
      email: "j.taylor@email.com",
      cartValue: 899.99,
      itemCount: 1,
      items: ["iPhone 15 Pro"],
      abandonedAt: "2024-11-24T16:45:00",
      reminderSent: false,
    },
    {
      id: 4,
      customerName: "Robert Wilson",
      email: "rob.wilson@email.com",
      cartValue: 249.99,
      itemCount: 4,
      items: ["Keyboard", "Mouse Pad", "Cable", "Stand"],
      abandonedAt: "2024-11-22T11:20:00",
      reminderSent: false,
    },
    {
      id: 5,
      customerName: "Amanda Brown",
      email: "amanda.b@email.com",
      cartValue: 679.99,
      itemCount: 2,
      items: ["iPad Pro", "Apple Pencil"],
      abandonedAt: "2024-11-24T08:00:00",
      reminderSent: true,
    },
    {
      id: 6,
      customerName: "Christopher Lee",
      email: "chris.lee@email.com",
      cartValue: 1299.99,
      itemCount: 1,
      items: ["MacBook Pro 14"],
      abandonedAt: "2024-11-21T19:30:00",
      reminderSent: false,
    },
    {
      id: 7,
      customerName: "Michelle Garcia",
      email: "m.garcia@email.com",
      cartValue: 89.99,
      itemCount: 3,
      items: ["Phone Case", "Screen Protector", "Charger"],
      abandonedAt: "2024-11-24T12:10:00",
      reminderSent: false,
    },
    {
      id: 8,
      customerName: "Andrew Martinez",
      email: "a.martinez@email.com",
      cartValue: 349.99,
      itemCount: 1,
      items: ["Apple Watch Series 9"],
      abandonedAt: "2024-11-23T15:45:00",
      reminderSent: true,
    },
    {
      id: 9,
      customerName: "Nicole Anderson",
      email: "nicole.a@email.com",
      cartValue: 189.99,
      itemCount: 2,
      items: ["HomePod Mini", "Smart Plug"],
      abandonedAt: "2024-11-24T10:20:00",
      reminderSent: false,
    },
    {
      id: 10,
      customerName: "Kevin Thomas",
      email: "kevin.t@email.com",
      cartValue: 549.99,
      itemCount: 2,
      items: ["iPad Air", "Smart Keyboard"],
      abandonedAt: "2024-11-20T14:00:00",
      reminderSent: false,
    },
  ]);

  // Calculate stats
  const totalAbandonedCarts = abandonedCarts.length;
  const totalAbandonedValue = abandonedCarts.reduce((sum, cart) => sum + cart.cartValue, 0);
  const remindersSent = abandonedCarts.filter(cart => cart.reminderSent).length;
  const hotLeads = abandonedCarts.filter(cart => {
    const hoursDiff = (new Date() - new Date(cart.abandonedAt)) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  }).length;

  // Calculate abandonment rate (example: assuming 150 total carts created)
  const totalCarts = 150;
  const completedCarts = totalCarts - totalAbandonedCarts;
  const abandonmentRate = ((totalAbandonedCarts / totalCarts) * 100).toFixed(1);
  const completionRate = ((completedCarts / totalCarts) * 100).toFixed(1);

  // Potential recovery value (assume 30% recovery rate)
  const potentialRecovery = (totalAbandonedValue * 0.3);

  // Handle actions
  const handleSendReminder = (cart) => {
    console.log("Send reminder to:", cart.customerName);
    alert(`Reminder email sent to ${cart.email}`);
  };

  const handleViewCart = (cart) => {
    console.log("View cart:", cart);
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen space-y-6">
      
      {/* 📌 PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Cart Abandonment
          </h1>
          <p className="text-base-content/60">
            Track and recover abandoned shopping carts
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost gap-2">
            <Mail size={20} />
            Send Bulk Reminder
          </button>
        </div>
      </div>

      {/* 📊 KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Abandonment Rate */}
        <div className="stats shadow bg-gradient-to-br from-error/10 to-error/5">
          <div className="stat">
            <div className="stat-figure text-error">
              <AlertTriangle size={32} />
            </div>
            <div className="stat-title">Abandonment Rate</div>
            <div className="stat-value text-error">{abandonmentRate}%</div>
            <div className="stat-desc">{totalAbandonedCarts} of {totalCarts} carts</div>
          </div>
        </div>

        {/* Total Abandoned Value */}
        <div className="stats shadow bg-gradient-to-br from-warning/10 to-warning/5">
          <div className="stat">
            <div className="stat-figure text-warning">
              <DollarSign size={32} />
            </div>
            <div className="stat-title">Abandoned Value</div>
            <div className="stat-value text-warning">
              ${(totalAbandonedValue / 1000).toFixed(1)}k
            </div>
            <div className="stat-desc">Potential revenue loss</div>
          </div>
        </div>

        {/* Recovery Potential */}
        <div className="stats shadow bg-gradient-to-br from-success/10 to-success/5">
          <div className="stat">
            <div className="stat-figure text-success">
              <TrendingDown size={32} />
            </div>
            <div className="stat-title">Recovery Potential</div>
            <div className="stat-value text-success">
              ${(potentialRecovery / 1000).toFixed(1)}k
            </div>
            <div className="stat-desc">Estimated at 30% rate</div>
          </div>
        </div>

        {/* Hot Leads */}
        <div className="stats shadow bg-gradient-to-br from-info/10 to-info/5">
          <div className="stat">
            <div className="stat-figure text-info">
              <Clock size={32} />
            </div>
            <div className="stat-title">Hot Leads</div>
            <div className="stat-value text-info">{hotLeads}</div>
            <div className="stat-desc">Last 24 hours</div>
          </div>
        </div>

      </div>

      {/* 📈 ABANDONMENT RATE VISUALIZATION */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="text-xl font-bold mb-4">Cart Completion Overview</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Completion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completed Carts</span>
                <span className="text-lg font-bold text-success">{completionRate}%</span>
              </div>
              <progress 
                className="progress progress-success w-full h-4" 
                value={completedCarts} 
                max={totalCarts}
              ></progress>
              <p className="text-xs text-base-content/60 mt-1">
                {completedCarts} carts successfully completed
              </p>
            </div>

            {/* Abandonment Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Abandoned Carts</span>
                <span className="text-lg font-bold text-error">{abandonmentRate}%</span>
              </div>
              <progress 
                className="progress progress-error w-full h-4" 
                value={totalAbandonedCarts} 
                max={totalCarts}
              ></progress>
              <p className="text-xs text-base-content/60 mt-1">
                {totalAbandonedCarts} carts abandoned before checkout
              </p>
            </div>

          </div>

          {/* Recovery Stats */}
          <div className="divider"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Reminders Sent</div>
              <div className="stat-value text-2xl text-info">{remindersSent}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Pending Action</div>
              <div className="stat-value text-2xl text-warning">
                {totalAbandonedCarts - remindersSent}
              </div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Avg Cart Value</div>
              <div className="stat-value text-2xl text-primary">
                ${(totalAbandonedValue / totalAbandonedCarts).toFixed(0)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 📋 ABANDONED CARTS TABLE */}
      <CartAbandonmentTable 
        abandonedCarts={abandonedCarts}
        onSendReminder={handleSendReminder}
        onViewCart={handleViewCart}
      />

    </div>
  );
}