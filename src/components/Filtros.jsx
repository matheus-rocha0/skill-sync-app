import React from 'react';

// Recebe 'theme' e 'setFiltros' do App.jsx
const Filtros = ({ theme, setFiltros }) => {

  // Lógica de classes (exemplo para um input)
  const inputClasses = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500'
    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';

  // Função para atualizar o estado no App.jsx
  // Usamos 'e.target.name' para atualizar a chave correta no objeto 'filtros'
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    
    // Atualiza o estado no App.jsx
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Filtro de Busca */}
        <div>
          <label htmlFor="busca" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buscar por nome ou cargo
          </label>
          <input
            type="text"
            name="busca"
            id="busca"
            onChange={handleFiltroChange}
            className={`w-full p-2 rounded-md border ${inputClasses} transition-colors`}
            placeholder="Ex: Ana Silva ou UX Designer"
          />
        </div>

        {/* 2. Filtro de Área */}
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filtrar por Área
          </label>
          <select
            name="area"
            id="area"
            onChange={handleFiltroChange}
            className={`w-full p-2 rounded-md border ${inputClasses} transition-colors`}
          >
            <option value="">Todas as Áreas</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Design">Design</option>
            <option value="Gestão">Gestão</option>
            {/* Adicione mais opções baseadas no seu JSON */}
          </select>
        </div>

        {/* 3. Filtro de Localização */}
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filtrar por Localização
          </label>
          <select
            name="localizacao"
            id="localizacao"
            onChange={handleFiltroChange}
            className={`w-full p-2 rounded-md border ${inputClasses} transition-colors`}
          >
            <option value="">Todas as Localidades</option>
            <option value="São Paulo/SP">São Paulo/SP</option>
            <option value="Rio de Janeiro/RJ">Rio de Janeiro/RJ</option>
            {/* Adicione mais opções baseadas no seu JSON */}
          </select>
        </div>

      </div>
    </div>
  );
};

export default Filtros;