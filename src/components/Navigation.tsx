import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, User, Home, Plus, UserPlus, Wallet, PieChart, History, Settings, TrendingUp } from "lucide-react";

interface NavigationProps {
  activeMode: 'group' | 'personal';
  onModeChange: (mode: 'group' | 'personal') => void;
  activeSubNav: string;
  onSubNavChange: (nav: string) => void;
}

const Navigation = ({ activeMode, onModeChange, activeSubNav, onSubNavChange }: NavigationProps) => {
  const groupNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create-group', label: 'Create Group', icon: Plus },
    { id: 'join-group', label: 'Join Group', icon: UserPlus },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'history', label: 'History', icon: History },
  ];

  const personalNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'history', label: 'History', icon: History },
  ];

  const currentNavItems = activeMode === 'group' ? groupNavItems : personalNavItems;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Mode Toggle */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-1">
            <Button
              variant={activeMode === 'group' ? 'default' : 'ghost'}
              onClick={() => onModeChange('group')}
              className={`${
                activeMode === 'group' 
                  ? 'nav-active' 
                  : 'nav-inactive'
              } transition-all duration-300`}
            >
              <Users className="w-4 h-4 mr-2" />
              Group Expenses
            </Button>
            <Button
              variant={activeMode === 'personal' ? 'default' : 'ghost'}
              onClick={() => onModeChange('personal')}
              className={`${
                activeMode === 'personal' 
                  ? 'nav-active' 
                  : 'nav-inactive'
              } transition-all duration-300`}
            >
              <User className="w-4 h-4 mr-2" />
              Personal
            </Button>
          </div>

          {/* Profile Button - Always Visible */}
          <Button
            variant="ghost"
            onClick={() => onSubNavChange('profile')}
            className={`${
              activeSubNav === 'profile' 
                ? 'nav-active' 
                : 'nav-inactive'
            } transition-all duration-300`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center space-x-1 pb-3 overflow-x-auto scrollbar-hide">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onSubNavChange(item.id)}
                className={`${
                  activeSubNav === item.id 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                } transition-all duration-300 whitespace-nowrap`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;