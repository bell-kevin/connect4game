import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disc, History, Home } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Disc className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">Connect 4</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <NavLink to="/" active={isActive('/')}>
              <Home className="w-5 h-5 mr-1" />
              <span>Home</span>
            </NavLink>
            
            <NavLink to="/game" active={isActive('/game')}>
              <Disc className="w-5 h-5 mr-1" />
              <span>Play</span>
            </NavLink>
            
            <NavLink to="/history" active={isActive('/history')}>
              <History className="w-5 h-5 mr-1" />
              <span>History</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

type NavLinkProps = {
  to: string;
  active: boolean;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
        active 
          ? "bg-blue-600 text-white" 
          : "text-slate-300 hover:bg-slate-700 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;