import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface HeaderProps {
  onMenuClick?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.startsWith("/products")) {
      if (path.includes("/products/") && path.split("/").length > 2) {
        return "Product Details";
      }
      return "Products";
    }
    if (path === "/profile") return "Profile";
    return "Dashboard";
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Overview of your product analytics";
    if (path === "/products") return "Browse and manage your products";
    if (path.startsWith("/products/"))
      return "View detailed product information";
    if (path === "/profile") return "Manage your account settings";
    return "";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const notifications = [
    {
      id: 1,
      title: "New product added",
      message: "iPhone 15 Pro has been added to catalog",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Low stock alert",
      message: "Samsung Galaxy S23 is running low",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Order shipped",
      message: "Order #12345 has been shipped",
      time: "2 hours ago",
    },
  ];

  const unreadNotifications = notifications.length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Page title */}
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-600">{getPageDescription()}</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 transition"
                />
              </div>
            </form>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-gray-600">
                      {unreadNotifications} unread
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 mt-2 block">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Mark all as read functionality
                        setShowNotifications(false);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 w-full text-center py-2"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User profile dropdown */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
            <div className="relative group">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={user?.image || "https://via.placeholder.com/40"}
                  alt={user?.firstName}
                  className="h-10 w-10 rounded-full border-2 border-gray-200"
                />
              </button>

              {/* Profile dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/products")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    Products
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden mt-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
