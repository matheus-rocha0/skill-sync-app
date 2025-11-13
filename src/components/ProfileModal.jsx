import React, { useState } from 'react';
// Importando ícones
import { 
  FaTimes, // Ícone para fechar
  FaBriefcase, // Ícone para Experiência
  FaGraduationCap, // Ícone para Formação
  FaTools, // Ícone para Skills
  FaUser // Ícone para Visão Geral
} from 'react-icons/fa';

const ProfileModal = ({ profile, theme, onClose }) => {
  // Estado interno para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('visaoGeral');

  // --- Lógica das Classes Condicionais (baseado no 'theme') ---

  const modalBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const borderPrimary = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const tabActive = theme === 'dark' ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600';
  const tabInactive = theme === 'dark' ? 'border-transparent text-gray-400 hover:text-gray-200' : 'border-transparent text-gray-500 hover:text-gray-800';
  const buttonPrimary = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white';
  const buttonSecondary = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  const tagClass = theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700';

  // --- Handlers dos Botões (Requisito da Atividade) ---

  const handleRecommend = () => {
    alert(`Recomendação enviada para ${profile.nome}!`);
  };

  const handleMessage = () => {
    alert(`Abrindo chat com ${profile.nome}!`);
  };

  return (
    // 1. Overlay (fundo escuro semi-transparente)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300"
      onClick={onClose} // Fecha a modal ao clicar fora
    >
      {/* 2. Conteúdo da Modal */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col ${modalBg}`}
        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar DENTRO
      >
        {/* --- Cabeçalho da Modal --- */}
        <div className={`p-5 border-b ${borderPrimary} flex justify-between items-center`}>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>Detalhes do Perfil</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${textSecondary} hover:bg-gray-100 dark:hover:bg-gray-700`}
            aria-label="Fechar modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* --- Corpo da Modal (com scroll) --- */}
        <div className="p-6 overflow-y-auto">
          
          {/* --- Sumário do Perfil (Topo) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={profile.foto}
              alt={profile.nome}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-2xl font-bold ${textPrimary}`}>{profile.nome}</h3>
              <p className={`text-md ${textSecondary}`}>{profile.cargo}</p>
              <p className={`text-sm ${textSecondary} mt-1`}>{profile.localizacao}</p>
              
              {/* Botões de Ação (Requisito) */}
              <div className="mt-4 flex justify-center md:justify-start space-x-3">
                <button onClick={handleRecommend} className={`px-4 py-2 rounded-lg text-sm font-medium ${buttonPrimary} transition-colors`}>
                  Recomendar
                </button>
                <button onClick={handleMessage} className={`px-4 py-2 rounded-lg text-sm font-medium ${buttonSecondary} transition-colors`}>
                  Enviar Mensagem
                </button>
              </div>
            </div>
          </div>

          {/* --- Abas de Navegação --- */}
          <div className={`mt-8 border-b ${borderPrimary}`}>
            <nav className="-mb-px flex space-x-6" aria-label="Abas">
              <button
                onClick={() => setActiveTab('visaoGeral')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'visaoGeral' ? tabActive : tabInactive}`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('habilidades')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'habilidades' ? tabActive : tabInactive}`}
              >
                Habilidades
              </button>
              <button
                onClick={() => setActiveTab('experiencia')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'experiencia' ? tabActive : tabInactive}`}
              >
                Experiência
              </button>
              <button
                onClick={() => setActiveTab('formacao')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'formacao' ? tabActive : tabInactive}`}
              >
                Formação
            </button>
            </nav>
          </div>

          {/* --- Conteúdo das Abas --- */}
          <div className="mt-6">
            
            {/* Aba: Visão Geral */}
            {activeTab === 'visaoGeral' && (
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-semibold ${textPrimary}`}>Resumo Profissional</h4>
                  <p className={`mt-2 ${textSecondary}`}>{profile.resumo}</p>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${textPrimary}`}>Idiomas</h4>
                  <ul className="mt-2 space-y-1">
                    {profile.idiomas.map((lang, i) => (
                      <li key={i} className={textSecondary}>
                        • {lang.idioma} ({lang.nivel})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Aba: Habilidades */}
            {activeTab === 'habilidades' && (
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-semibold ${textPrimary}`}>Habilidades Técnicas (Hard Skills)</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.habilidadesTecnicas.map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium ${tagClass}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${textPrimary}`}>Competências (Soft Skills)</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.softSkills.map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium ${tagClass}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Aba: Experiência */}
            {activeTab === 'experiencia' && (
              <div className="space-y-6">
                {profile.experiencias.map((exp, i) => (
                  <div key={i} className={`flex space-x-4 border-l-2 pl-4 ${borderPrimary}`}>
                    <FaBriefcase className={`w-5 h-5 mt-1 ${textSecondary}`} />
                    <div>
                      <h4 className={`text-lg font-semibold ${textPrimary}`}>{exp.cargo}</h4>
                      <p className={textSecondary}>{exp.empresa}</p>
                      <p className={`text-sm ${textSecondary}`}>{exp.inicio} - {exp.fim || 'Atual'}</p>
                      <p className={`mt-2 text-sm ${textSecondary}`}>{exp.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Aba: Formação */}
            {activeTab === 'formacao' && (
              <div className="space-y-6">
                {profile.formacao.map((form, i) => (
                  <div key={i} className={`flex space-x-4 border-l-2 pl-4 ${borderPrimary}`}>
                    <FaGraduationCap className={`w-5 h-5 mt-1 ${textSecondary}`} />
                    <div>
                      <h4 className={`text-lg font-semibold ${textPrimary}`}>{form.curso}</h4>
                      <p className={textSecondary}>{form.instituicao}</p>
                      <p className={`text-sm ${textSecondary}`}>Concluído em {form.ano}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;