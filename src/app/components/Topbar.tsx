'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { data: session } = useSession(); 
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-10 flex justify-between items-center bg-gray-900 text-white p-4">
      {/* Botão de menu para abrir a sidebar */}
      <button onClick={toggleSidebar} className="focus:outline-none">
        <HiMenu size={24} />
      </button>

      {/* Título centralizado */}
      <h1 className="text-2xl font-bold text-center flex-1">MEMORABILIA</h1>

      {/* Ícone do usuário com menu de contexto */}
      <div className="relative">
        <button onClick={toggleUserMenu} className="focus:outline-none">
          <FaUserCircle size={30} />
        </button>

        {/* Menu de contexto flutuante */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
            {/* Exibir o nome do usuário, se disponível */}
            <p className="px-4 py-2 text-gray-700">
              {session ? session.user?.name : 'Usuário Desconhecido'}
            </p>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={async () => await signOut({ callbackUrl: '/login' })}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
