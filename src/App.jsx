import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import SalesRevenuePage from './components/SalesRevenuePage.jsx'
import CartAbandonmentPage from './components/CartAbandonmentPage.jsx'
import GeographyPage from './components/GeographyPage.jsx'
import CustomersPage from './components/CustomersPage.jsx'
import ProductsPage from './components/ProductsPage.jsx'
import SalesChannels from './components/SalesChannels.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import ReportsPage from './components/ReportsPage.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
function App() {


  return (
    <>
     <Routes>

      {/* Redirection automatique */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
 <Route
        path="/dashboard"
        element={
          <Sidebar activeItem="dashboard">
            <Dashboard />
          </Sidebar>
        }
      />
      <Route
        path="/dashboard/sales"
        element={
          <Sidebar activeItem="sales">
            <SalesRevenuePage />
          </Sidebar>
        }
      />
      <Route
        path="/dashboard/products"
        element={
          <Sidebar activeItem="products">
            <ProductsPage />
          </Sidebar>
        }
      />
       <Route
        path="/dashboard/customers"
        element={
          <Sidebar activeItem="customers">
            <CustomersPage />
          </Sidebar>
        }
      />
      <Route
        path="/dashboard/cart-abandonment"
        element={
          <Sidebar activeItem="cart-abandonment">
            <CartAbandonmentPage />
          </Sidebar>
        }
      />
       <Route
        path="/dashboard/geography"
        element={
          <Sidebar activeItem="geography">
            <GeographyPage />
          </Sidebar>
        }
      />
       <Route
        path="/dashboard/channels"
        element={
          <Sidebar activeItem="channels">
            <SalesChannels />
          </Sidebar>
        }
      />
        <Route
        path="/dashboard/reports"
        element={
          <Sidebar activeItem="reports">
            <ReportsPage />
          </Sidebar>
        }
      />
        <Route
        path="/dashboard/settings"
        element={
          <Sidebar activeItem="settings">
            <SettingsPage />
          </Sidebar>
        }
      />
     </Routes>
     
    </>
  )
}

export default App
