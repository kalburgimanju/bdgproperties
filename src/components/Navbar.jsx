import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Users, LayoutDashboard, PlusCircle, Menu, X, Landmark } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Properties', path: '/properties', icon: Building2 },
    { name: 'Agents & Builders', path: '/directory', icon: Users },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl tracking-tight">
              <Landmark className="h-6 w-6 stroke-[2.5]" />
              <span>Hubli<span className="text-slate-800">Estate</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              to="/dashboard?tab=add-listing"
              className="ml-4 flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              List Property
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-600 focus:outline-hidden p-2 rounded-md hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              to="/dashboard?tab=add-listing"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mx-2 mt-4 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 text-center shadow-xs"
            >
              <PlusCircle className="h-5 w-5" />
              List Property
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
