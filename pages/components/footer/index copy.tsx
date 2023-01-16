import React from "react";

export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-800 py-10 flex justify-between">
        <p className="text-sm text-gray-400 flex items-center">Copyright &copy; 2022 Black Home Design.</p>
        <p className="text-sm text-gray-400 flex items-center">Rua Padre Agostinho, 1340. Champagnat. Curitiba.</p>
        <p className="text-sm text-gray-400 flex items-center">Telefone: 41 3546-9087</p>
        <p className="flex">
          <button type="button" className="-ml-2 p-2 text-white">
            <img src="/instagram-icon.png" alt="" className="" />
          </button>
          <button type="button" className="-ml-2 p-2 text-white">
            <img src="/facebook-icon.png" alt="" className="" />
          </button>
          <button type="button" className="-ml-2 p-2 text-white">
            <img src="/zap-icon.png" alt="" className="" />
          </button>
        </p>
      </div>
    </div>
  );
}
