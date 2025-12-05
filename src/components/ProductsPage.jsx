import React, { useState } from "react";
import { Plus, Download, Upload } from "lucide-react";
import ProductsTable from "./ProductsTable";

/**
 * 🛍️ PRODUCTS PAGE
 * Route: /dashboard/products
 * 
 * Complete product management page with:
 * - Products table with filters
 * - Add/Edit/Delete actions
 * - Stats overview
 */
export default function ProductsPage() {
  
  // 🎯 PRODUCTS DATA
  const [products] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      sku: "IPHONE-15-PRO",
      category: "Electronics",
      price: 999.99,
      stock: 45,
      sales: 1254,
      trend: 12.5,
      image: "https://images.unsplash.com/photo-1592286927505-2fd9fcf2f8bf?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      sku: "MBA-M3-2024",
      category: "Electronics",
      price: 1299.99,
      stock: 23,
      sales: 987,
      trend: 8.3,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "AirPods Pro",
      sku: "AIRPODS-PRO-2",
      category: "Audio",
      price: 249.99,
      stock: 156,
      sales: 2540,
      trend: 15.7,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "iPad Pro 12.9",
      sku: "IPAD-PRO-12",
      category: "Tablets",
      price: 1099.99,
      stock: 34,
      sales: 658,
      trend: -3.2,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Apple Watch Series 9",
      sku: "WATCH-S9",
      category: "Wearables",
      price: 399.99,
      stock: 8,
      sales: 1086,
      trend: 5.4,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      name: "Magic Keyboard",
      sku: "MAGIC-KB-2024",
      category: "Accessories",
      price: 99.99,
      stock: 89,
      sales: 3421,
      trend: 22.1,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop",
    },
    {
      id: 7,
      name: "USB-C Cable",
      sku: "USB-C-2M",
      category: "Accessories",
      price: 19.99,
      stock: 450,
      sales: 8765,
      trend: 18.9,
      image: "https://images.unsplash.com/photo-1591290619762-c588dc36bf1d?w=100&h=100&fit=crop",
    },
    {
      id: 8,
      name: "Sony Headphones",
      sku: "SONY-WH1000",
      category: "Audio",
      price: 349.99,
      stock: 0,
      sales: 542,
      trend: -8.7,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop",
    },
    {
      id: 9,
      name: "Laptop Stand",
      sku: "STAND-ALU",
      category: "Accessories",
      price: 49.99,
      stock: 234,
      sales: 1876,
      trend: 11.3,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
    },
    {
      id: 10,
      name: "Wireless Mouse",
      sku: "MOUSE-MX3",
      category: "Accessories",
      price: 79.99,
      stock: 167,
      sales: 2341,
      trend: 9.8,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop",
    },
  ]);

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  // Handle actions
  const handleView = (product) => {
    console.log("View product:", product);
    // TODO: Open product detail modal
  };

  const handleEdit = (product) => {
    console.log("Edit product:", product);
    // TODO: Open edit modal
  };

  const handleDelete = (product) => {
    console.log("Delete product:", product);
    // TODO: Show confirmation dialog
  };

  return (
    <div className="bg-base-200 min-h-screen space-y-6">
        <p className="text-base-content/60">
            Manage your product inventory and track performance
          </p> 
      {/* 📌 PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <p className="text-base-content/60">
      
          </p>
        <div className="flex gap-2">
          <button className="btn btn-ghost gap-2">
            <Upload size={20} />
            Import
          </button>
          <button className="btn btn-ghost gap-2">
            <Download size={20} />
            Export
          </button>
          <button className="btn btn-primary gap-2">
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* 📊 STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Products */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">{totalProducts}</div>
            <div className="stat-desc">Active in inventory</div>
          </div>
        </div>

        {/* Total Value */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Inventory Value</div>
            <div className="stat-value text-success">
              ${(totalValue / 1000).toFixed(0)}k
            </div>
            <div className="stat-desc">Total stock value</div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Low Stock</div>
            <div className="stat-value text-warning">{lowStockCount}</div>
            <div className="stat-desc">Need restocking</div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Out of Stock</div>
            <div className="stat-value text-error">{outOfStockCount}</div>
            <div className="stat-desc">Unavailable products</div>
          </div>
        </div>

      </div>

      {/* 📋 PRODUCTS TABLE */}
      <ProductsTable 
        products={products}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}