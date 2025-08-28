import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "./Dashboard";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import Wallet from "./Wallet";
import Analytics from "./Analytics";
import History from "./History";
import Profile from "./Profile";

const Index = () => {
  const [activeMode, setActiveMode] = useState<'group' | 'personal'>('group');
  const [activeSubNav, setActiveSubNav] = useState('profile'); // New users start with profile

  const renderContent = () => {
    switch (activeSubNav) {
      case 'home':
        return <Dashboard mode={activeMode} />;
      case 'create-group':
        return <CreateGroup />;
      case 'join-group':
        return <JoinGroup />;
      case 'wallet':
        return <Wallet />;
      case 'analytics':
        return <Analytics mode={activeMode} />;
      case 'history':
        return <History mode={activeMode} />;
      case 'expenses':
        return <Dashboard mode="personal" />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{activeSubNav} Page</h2>
              <p>This section is under construction</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation
        activeMode={activeMode}
        onModeChange={setActiveMode}
        activeSubNav={activeSubNav}
        onSubNavChange={setActiveSubNav}
      />
      <main className="pt-32">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
