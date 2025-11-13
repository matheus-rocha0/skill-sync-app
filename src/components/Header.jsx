// src/components/Header.jsx
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

// Recebe 'theme' e 'setTheme' como props do App.jsx
const Header = ({ theme, setTheme }) => {
  
  // Função para trocar o tema (agora ela chama a função do App.jsx)
  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Tema alterado para:', newTheme); // Para depuração
  };

  // 1. Lógica para trocar as classes do próprio Header
  const headerClasses = theme === 'dark'
    ? 'bg-gray-900 shadow-gray-800' // Classes do modo escuro
    : 'bg-white shadow-md';        // Classes do modo claro

  // 2. Lógica para trocar as classes dos links
  const linkClasses = theme === 'dark'
    ? 'text-gray-300 hover:text-blue-400'
    : 'text-gray-700 hover:text-blue-600';

  // 3. Lógica para trocar as classes do botão
  const buttonClasses = theme === 'dark'
    ? 'text-gray-300 hover:bg-gray-700'
    : 'text-gray-700 hover:bg-gray-200';
  
  // 4. Lógica para a borda da foto de perfil
  const imgBorderClasses = theme === 'dark'
    ? 'border-gray-600'
    : 'border-gray-300';

  return (
    // Usamos as variáveis de classe que definimos acima
    <header className={`sticky top-0 z-50 ${headerClasses}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
          SkillSync AIHub
        </div>

        {/* Links de Navegação */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className={`${linkClasses} transition-colors`}>
            Vagas
          </a>
          <a href="#" className={`${linkClasses} transition-colors`}>
            Perfil
          </a>
        </div>

        {/* Botão de Dark Mode */}
        <div className="flex items-center">
          <button
            onClick={handleThemeSwitch}
            className={`p-2 rounded-full ${buttonClasses} transition-colors`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>
          
          <img 
            src="https://via.placeholder.com/40"
            alt="Foto do usuário" 
            className={`w-10 h-10 rounded-full ml-4 border-2 ${imgBorderClasses}`}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;