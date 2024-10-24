// src/app/components/Sidebar.tsx
'use client';

import Link from 'next/link';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-16 left-0 w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 ease-in-out h-[calc(100vh-4rem)] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <ul className="mt-5 space-y-2">
        <li>
          <Link href="/home" className="block p-4 hover:bg-gray-700">
            Home
          </Link>
        </li>
        <li>
          <Link href="/movies" className="block p-4 hover:bg-gray-700">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/about" className="block p-4 hover:bg-gray-700">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="block p-4 hover:bg-gray-700">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
