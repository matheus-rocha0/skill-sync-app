import React, { useState, useEffect } from 'react';

// 1. IMPORTAÇÃO DIRETA DO JSON (sem fetch)
// (Certifique-se que o caminho está correto)
import perfisData from '../public/perfis.json'; 

// Importação dos componentes
import Header from './components/Header';
import Filtros from './components/Filtros';
import PoolTalentos from './components/PoolTalentos';
import ProfileModal from './components/ProfileModal'; // (Vamos criar a seguir)

function App() {
  
  // --- ESTADOS PRINCIPAIS ---

  // Estado do Tema (Dark/Light)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light'; // Padrão 'light'
  });

  // Estado dos Filtros (controlado pelo App)
  const [filtros, setFiltros] = useState({
    busca: '',
    area: '',
    localizacao: ''
  });

  // Estado da Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // 2. Estado dos Perfis (inicializado com o JSON importado)
  // Não precisamos de 'setPerfis' se a lista for estática
  const [perfis, setPerfis] = useState(perfisData); 

  // --- USE EFFECT ---

  // Salva a preferência de tema no localStorage
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

  // Classes de fundo dinâmicas (baseado no tema)
  const backgroundClass = theme === 'dark' 
    ? 'bg-gray-950 text-gray-100'
    : 'bg-gray-100 text-gray-900';

  // 3. Lógica de Filtro (Calcula os perfis filtrados ANTES do return)
  const perfisFiltrados = perfis.filter((profile) => {
    const buscaLower = filtros.busca.toLowerCase();
    
    // Verifica a busca (nome ou cargo)
    const matchBusca = buscaLower === '' ||
      profile.nome.toLowerCase().includes(buscaLower) ||
      profile.cargo.toLowerCase().includes(buscaLower);

    // Verifica a área
    const matchArea = filtros.area === '' || profile.area === filtros.area;

    // Verifica a localização
    const matchLocalizacao = filtros.localizacao === '' || profile.localizacao === filtros.localizacao;

    return matchBusca && matchArea && matchLocalizacao;
  });

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-200`}>
      
      {/* 1. Header: Passa o tema e a função para trocar o tema */}
      <Header theme={theme} setTheme={setTheme} />

      <main className="container mx-auto p-6">
        
        {/* 2. Filtros: Passa o tema (para estilo) e a função para atualizar os filtros */}
        <Filtros theme={theme} setFiltros={setFiltros} />

        <h2 className="text-3xl font-bold mb-6 mt-8">Pool de Talentos</h2>
        
        {/* 3. Pool de Talentos: Passa os perfis JÁ FILTRADOS, o tema e a função de clique */}
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