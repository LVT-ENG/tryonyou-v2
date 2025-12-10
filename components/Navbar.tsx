import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <>
      <title>TryOnMe – Virtual Fitting Room</title>
      <nav className="bg-[#ffff00] p-4 pb-10 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <span className="font-bold">TryOnMe</span>
        <ul className="flex gap-4">
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#products">Products</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
