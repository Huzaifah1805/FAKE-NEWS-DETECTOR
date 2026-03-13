import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Home, BarChart2, Info } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 rounded-none border-t-0 border-l-0 border-r-0 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
            <ShieldAlert className="text-primary w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Truth<span className="text-primary">Lens</span></span>
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-dark-muted'}`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
