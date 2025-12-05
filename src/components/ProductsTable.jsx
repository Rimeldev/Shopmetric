import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  Package,
} from "lucide-react";

/**
 * 🛍️ PRODUCTS TABLE COMPONENT - Reusable
 * 
 * Complete product management table with:
 * - Search functionality
 * - Category, price, stock filters
 * - Sorting
 * - Actions (view, edit, delete)
 * - Stock status indicators
 * 
 * @param {Array} products - Array of product objects
 * @param {Function} onEdit - Callback when edit is clicked
 * @param {Function} onDelete - Callback when delete is clicked
 * @param {Function} onView - Callback when view is clicked
 */
export default function ProductsTable({ 
  products = [],
  onEdit,
  onDelete,
  onView,
}) {
  // 🔍 SEARCH & FILTERS STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Get unique categories from products
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // 🔧 FILTERING LOGIC
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // Price filter
    let matchesPrice = true;
    if (priceRange === "0-50") matchesPrice = product.price <= 50;
    else if (priceRange === "50-100") matchesPrice = product.price > 50 && product.price <= 100;
    else if (priceRange === "100-500") matchesPrice = product.price > 100 && product.price <= 500;
    else if (priceRange === "500+") matchesPrice = product.price > 500;
    
    // Stock filter
    let matchesStock = true;
    if (stockFilter === "in-stock") matchesStock = product.stock > 10;
    else if (stockFilter === "low-stock") matchesStock = product.stock > 0 && product.stock <= 10;
    else if (stockFilter === "out-of-stock") matchesStock = product.stock === 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  // 🔧 SORTING LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  // 🎨 Get stock status badge
  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <span className="badge badge-error">Out of Stock</span>;
    } else if (stock <= 10) {
      return <span className="badge badge-warning">Low Stock</span>;
    } else {
      return <span className="badge badge-success">In Stock</span>;
    }
  };

  // 🎨 Get trend icon
  const getTrendIcon = (trend) => {
    if (trend > 0) {
      return <TrendingUp className="text-success" size={16} />;
    } else if (trend < 0) {
      return <TrendingDown className="text-error" size={16} />;
    }
    return null;
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
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-base-content">Products List</h3>
              <p className="text-sm text-base-content/60">
                {sortedProducts.length} of {products.length} products
              </p>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH & FILTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Search */}
          <div className="form-control">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
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
                    onClick={() => handleSort('name')}
                  >
                    Product
                    {sortBy === 'name' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortBy === 'category' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('price')}
                  >
                    Price
                    {sortBy === 'price' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('stock')}
                  >
                    Stock
                    {sortBy === 'stock' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>
                  <button 
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleSort('sales')}
                  >
                    Sales
                    {sortBy === 'sales' && <ChevronDown size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}
                  </button>
                </th>
                <th>Revenue</th>
                <th>Trend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Filter className="text-base-content/40" size={48} />
                      <p className="text-base-content/60">No products found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedProducts.map((product) => (
                  <tr key={product.id} className="hover">
                    {/* Product Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={product.image} alt={product.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-sm opacity-50">{product.sku}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="badge badge-ghost">{product.category}</span>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>

                    {/* Stock */}
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{product.stock} units</span>
                        {getStockBadge(product.stock)}
                      </div>
                    </td>

                    {/* Sales */}
                    <td>
                      <span className="font-semibold">
                        {product.sales.toLocaleString()} sold
                      </span>
                    </td>

                    {/* Revenue */}
                    <td>
                      <span className="font-bold text-success">
                        ${(product.price * product.sales).toLocaleString()}
                      </span>
                    </td>

                    {/* Trend */}
                    <td>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(product.trend)}
                        <span className={product.trend > 0 ? "text-success" : "text-error"}>
                          {Math.abs(product.trend)}%
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex gap-1">
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => onView && onView(product)}
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => onEdit && onEdit(product)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => onDelete && onDelete(product)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 📊 PAGINATION (Optional - Add if needed) */}
        {sortedProducts.length > 0 && (
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