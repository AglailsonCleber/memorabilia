'use client';

import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MoviesList = dynamic(() => import('./MoviesList/page'), {
  loading: () => <p>Carregando filmes...</p>, 
  ssr: false, 
});

const MenuCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <div 
        className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer" 
        onClick={toggleMenu}
      >
        <h2 className="font-semibold">{title}</h2>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="bg-white p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default function MoviesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {/* Menu Lateral Esquerdo */}
        <div className="md:w-1/4 p-4">
          <MenuCard title="Ordenar">
            {/* Conteúdo do menu de Ordenar */}
            <p>Opção 1</p>
            <p>Opção 2</p>
          </MenuCard>
          <MenuCard title="Onde Assistir">
            {/* Conteúdo do menu de Onde Assistir */}
            <p>Opção 1</p>
            <p>Opção 2</p>
          </MenuCard>
          <MenuCard title="Filtros">
            {/* Conteúdo do menu de Filtros */}
            <p>Opção 1</p>
            <p>Opção 2</p>
          </MenuCard>
          <button className="w-full bg-blue-500 text-white py-2 rounded">Pesquisar</button>
        </div>

        {/* Lista de Filmes */}
        <div className="flex-1 p-4">
          <MoviesList />
        </div>
      </div>
    </Layout>
  );
}
