import React, { useState, useEffect } from 'react';

// 1. IMPORTAÇÃO DIRETA DO JSON
import perfisData from '../public/perfis.json'; 

// Importação dos componentes
import Header from './components/Header';
import Filtros from './components/Filtros';
import PoolTalentos from './components/PoolTalentos';
import ProfileModal from './components/ProfileModal';

function App() {
  
  // --- ESTADOS PRINCIPAIS ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  const [filtros, setFiltros] = useState({
    busca: '',
    area: '',
    localizacao: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [perfis, setPerfis] = useState(perfisData); 

  // --- USE EFFECT ---
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- HANDLERS (Funções de Evento) ---
  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProfile(null);
  };

  // --- LÓGICA DE RENDERIZAÇÃO ---
  const backgroundClass = theme === 'dark' 
    ? 'bg-gray-950 text-gray-100'
    : 'bg-gray-100 text-gray-900';

  // 3. Lógica de Filtro (Perfis Filtrados)
  const perfisFiltrados = perfis.filter((profile) => {
    const buscaLower = filtros.busca.toLowerCase();
    
    const matchBusca = buscaLower === '' ||
      profile.nome.toLowerCase().includes(buscaLower) ||
      profile.cargo.toLowerCase().includes(buscaLower);

    const matchArea = filtros.area === '' || profile.area === filtros.area;
    const matchLocalizacao = filtros.localizacao === '' || profile.localizacao === filtros.localizacao;

    return matchBusca && matchArea && matchLocalizacao;
  });

  // --- NOVAS LINHAS: Lógica para Filtros Dinâmicos ---
  // Extrai todas as áreas, remove duplicatas criando um Set,
  // transforma de volta em array e ordena alfabeticamente.
  const areasUnicas = [...new Set(perfis.map(p => p.area))].sort();
  
  // Faz o mesmo para localizações
  const localizacoesUnicas = [...new Set(perfis.map(p => p.localizacao))].sort();
  // --- FIM DAS NOVAS LINHAS ---

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-200`}>
      
      <Header theme={theme} setTheme={setTheme} />

      <main className="container mx-auto p-6">
        
        {/* 2. Filtros: Passa as novas props 'areas' e 'localizacoes' 
        */}
        <Filtros 
          theme={theme} 
          setFiltros={setFiltros}
          areas={areasUnicas}
          localizacoes={localizacoesUnicas}
        />

        <h2 className="text-3xl font-bold mb-6 mt-8">Pool de Talentos</h2>
        
        <PoolTalentos
          perfis={perfisFiltrados}
          theme={theme}
          onCardClick={handleCardClick}
        />
        
        {modalOpen && (
          <ProfileModal 
            profile={selectedProfile} 
            theme={theme} 
            onClose={handleCloseModal} 
          />
        )}

      </main>
    </div>
  );
}

export default App;