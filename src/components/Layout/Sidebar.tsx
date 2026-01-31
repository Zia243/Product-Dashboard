import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  User,
  LogOut,
  ShoppingBag,
  X,
  Menu,
  Settings,
  BarChart3,
  Home,
  Search,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/products", label: "Products", icon: Package },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          h-screen
          w-64
          bg-gradient-to-b from-gray-900 to-gray-800
          text-white
          flex flex-col
          z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-lg
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ProductDash</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={user?.image || "https://via.placeholder.com/40"}
                alt={user?.firstName}
                className="h-12 w-12 rounded-xl border-2 border-blue-500"
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white shadow-lg"
                        : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && (
                    <div className="ml-auto h-2 w-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
            <p className="text-sm font-medium mb-3">Quick Stats</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Active Products</span>
                <span className="text-sm font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Today's Orders</span>
                <span className="text-sm font-semibold text-green-400">12</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-colors text-gray-300">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
