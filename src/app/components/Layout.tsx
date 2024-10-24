'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        {/* Barra Superior */}
        <Topbar toggleSidebar={toggleSidebar} />
        
        {/* Conteúdo Principal */}
        <main
          className={`flex-1 transition-all duration-300 p-5 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
