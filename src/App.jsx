import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import BrowseFood from './pages/BrowseFood'
import HowItWorks from './pages/HowItWorks'

function App() {
  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms-of-service" element={<Terms />} />
        <Route path="browse-food" element={<BrowseFood />} />
        <Route path="how-it-works" element={<HowItWorks />} />
      </Route>

      {/* Auth routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected routes with main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route 
          path="dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
