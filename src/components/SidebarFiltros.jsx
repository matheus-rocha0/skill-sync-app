import React from 'react';

// Recebe 'theme', 'setFiltros', 'areas' e 'localizacoes' do App.jsx
const SidebarFiltros = ({ theme, setFiltros, areas = [], localizacoes = [] }) => {

  const inputClasses = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500'
    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  // Classes do container da sidebar
  const sidebarClasses = theme === 'dark'
    ? 'bg-gray-800 text-gray-300'
    : 'bg-white text-gray-700';

  return (
    // Container da Sidebar
    <aside className={`w-full md:w-72 p-6 rounded-lg shadow-md ${sidebarClasses} h-fit`}>
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Filtros</h3>
      
      {/* 1. Filtro de Área (Dinâmico) */}
      <div className="mb-6">
        <label htmlFor="area" className="block text-sm font-medium mb-1">
          Filtrar por Área
        </label>
        <select
          name="area"
          id="area"
          onChange={handleFiltroChange}
          className={`w-full p-2 rounded-md border ${inputClasses} transition-colors`}
        >
          <option value="">Todas as Áreas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Filtro de Localização (Dinâmico) */}
      <div>
        <label htmlFor="localizacao" className="block text-sm font-medium mb-1">
          Filtrar por Localização
        </label>
        <select
          name="localizacao"
          id="localizacao"
          onChange={handleFiltroChange}
          className={`w-full p-2 rounded-md border ${inputClasses} transition-colors`}
        >
          <option value="">Todas as Localidades</option>
          {localizacoes.map((local) => (
            <option key={local} value={local}>
              {local}
            </option>
          ))}
        </select>
      </div>

      {/* Adicione outros filtros (Nível, Disponibilidade) aqui no futuro */}

    </aside>
  );
};

export default SidebarFiltros;