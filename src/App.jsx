import React, { useState, useEffect } from 'react';
import perfisData from './data/perfis.json'; 
import { IoSearch } from "react-icons/io5";

// --- ALTERADO: Importações ---
import Header from './components/Header';
import SidebarFiltros from './components/SidebarFiltros'; // Nome alterado
import PoolTalentos from './components/PoolTalentos';
import ProfileModal from './components/ProfileModal';
import Paginacao from './components/Paginacao'; // NOVO: Componente de Paginação

// --- NOVO: Constante de Paginação ---
const ITEMS_PER_PAGE = 12;

function App() {
  
  // --- ESTADOS PRINCIPAIS ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  const [filtros, setFiltros] = useState({
    busca: '',
    area: '',
    localizacao: '',
    habilidadeTecnica: '',
    softSkill: '',
    nivelIngles: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [perfis, setPerfis] = useState(perfisData); 

  // --- NOVO: Estado de Paginação ---
  const [currentPage, setCurrentPage] = useState(1);

  // --- USE EFFECTS (AGORA CORRIGIDO) ---
  
  // 1. Salva o tema no localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // 2. Rola para o topo quando clica na paginação (ex: 2, 3...)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // 3. Reseta a página E rola para o topo QUANDO APLICAR UM FILTRO
useEffect(() => {
    // A lógica de scroll precisa estar AQUI DENTRO
    
    // Se já estamos na página 1, o useEffect [currentPage] (acima)
    // não vai disparar. Então, forçamos o scroll "instantâneo" aqui.
    if (currentPage === 1) {
      window.scrollTo({
        top: 0,
        behavior: 'auto' // 'auto' é melhor para filtros
      });
    } else {
      // Se estamos em outra página (2, 3...), apenas setar
      // o estado para 1 vai disparar o useEffect [currentPage] acima.
      setCurrentPage(1);
    }
  }, [filtros]); // Este hook "ouve" as mudanças nos filtros
            
  // --- HANDLERS (Funções de Evento) ---
  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProfile(null);
  };

  // Handler de Filtro (para Busca e Sidebar)
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  // 1. Lógica para Filtros Dinâmicos (Sidebar)
  const areasUnicas = [...new Set(perfis.map(p => p.area))].sort();
  const localizacoesUnicas = [...new Set(perfis.map(p => p.localizacao))].sort();

  // Habilidades Técnicas únicas
  const habilidadesTecnicasUnicas = [...new Set(perfis.flatMap(p => p.habilidadesTecnicas || []))].sort();
  // Soft Skills únicas
  const softSkillsUnicas = [...new Set(perfis.flatMap(p => p.softSkills || []))].sort();
  // Níveis de inglês únicos
  const niveisInglesUnicos = [...new Set(
    perfis.flatMap(p => (p.idiomas || []).filter(i => i.idioma === 'Inglês').map(i => i.nivel))
  )].sort();

  // 2. Lógica de Filtro (Perfis Filtrados)
  const perfisFiltrados = perfis.filter((profile) => {
    const buscaLower = filtros.busca.toLowerCase();
    const matchBusca = buscaLower === '' ||
      profile.nome.toLowerCase().includes(buscaLower) ||
      profile.cargo.toLowerCase().includes(buscaLower);

    const matchArea = filtros.area === '' || profile.area === filtros.area;
    const matchLocalizacao = filtros.localizacao === '' || profile.localizacao === filtros.localizacao;

    const matchHabilidadeTecnica = filtros.habilidadeTecnica === '' ||
      (profile.habilidadesTecnicas && profile.habilidadesTecnicas.includes(filtros.habilidadeTecnica));

    const matchSoftSkill = filtros.softSkill === '' ||
      (profile.softSkills && profile.softSkills.includes(filtros.softSkill));

    const matchNivelIngles = filtros.nivelIngles === '' ||
      (profile.idiomas && profile.idiomas.some(i => i.idioma === 'Inglês' && i.nivel === filtros.nivelIngles));

    return matchBusca && matchArea && matchLocalizacao && matchHabilidadeTecnica && matchSoftSkill && matchNivelIngles;
  });

  // 3. --- NOVA LÓGICA DE PAGINAÇÃO ---
  const totalPages = Math.ceil(perfisFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const perfisDaPagina = perfisFiltrados.slice(startIndex, endIndex);

  // --- RETURN ATUALIZADO (NOVO LAYOUT) ---
  return (
    <div className={`min-h-screen bg-(--background) text-(--text) transition-colors duration-200`}>
      
      <Header theme={theme} setTheme={setTheme} />

      {/* Container principal com layout flexível */}
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
        
        {/* Coluna da Esquerda: Sidebar de Filtros */}
        <SidebarFiltros
          theme={theme}
          setFiltros={setFiltros}
          areas={areasUnicas}
          localizacoes={localizacoesUnicas}
          habilidadesTecnicas={habilidadesTecnicasUnicas}
          softSkills={softSkillsUnicas}
          niveisIngles={niveisInglesUnicos}
        />

        {/* Coluna da Direita: Conteúdo Principal */}
        <main className="flex-1">
          
          <h2 className="text-5xl font-black mb-2">Pool de Talentos</h2>
          <p className={`mb-6 text-(--text2)`}>
            Encontre os melhores profissionais para sua equipe.
          </p>

          {/* Input de Busca (Movido para cá) */}
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-(--text2)"><IoSearch /></span>
            <input
              type="text"
              name="busca"
              id="busca"
              onChange={handleFiltroChange}
              className={`w-full pl-10 p-3 rounded-lg border bg-(--container) border-(--border-color) text-(--text) focus:ring-(--primary) transition-colors`}
              placeholder="Buscar por cargo, habilidade ou nome..."
            />
          </div>

          {/* Pool de Talentos (Agora recebe os perfis paginados) */}
          <PoolTalentos
            perfis={perfisDaPagina} // Passa apenas os 12 da página atual
            theme={theme}
            onCardClick={handleCardClick}
          />
          
          {/* Componente de Paginação */}
          {totalPages > 1 && (
             <Paginacao
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              theme={theme}
            />
          )}
         
        </main>
      </div>
      
      {/* Modal (sem alteração) */}
      {modalOpen && (
        <ProfileModal 
          profile={selectedProfile} 
          theme={theme} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;