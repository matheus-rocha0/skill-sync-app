// src/components/Header.jsx
import React from 'react';
import { FiDatabase } from "react-icons/fi";
import { FaSun, FaMoon } from 'react-icons/fa';

// Recebe 'theme' e 'setTheme' como props do App.jsx
const Header = ({ theme, setTheme }) => {
    // Atualiza o atributo data-theme no <html> sempre que o tema muda
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
  
  // Função para trocar o tema (agora ela chama a função do App.jsx)
  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Tema alterado para:', newTheme); // Para depuração
  };

  return (
    // Usamos as variáveis de classe que definimos acima
    <header className={`sticky top-0 z-50 bg-(--background) border-b border-(--border-color) shadow-md`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 text-(--text)">
          <FiDatabase alt="Logo SkillSync" className="h-8 w-8 text-(--accent)" />
          <h1 className='text-2xl font-bold'>SkillSync</h1>
          <div className="px-10 space-x-12">
            <a href="#" className={`text-(--text2) hover:text-(--text2)/70 transition-colors`}>
              Vagas
            </a>
            <a href="#" className={`text-(--text2) hover:text-(--text2)/70 transition-colors`}>
              Perfil
            </a>
          </div>
        </div>

        {/* Botão de Dark Mode */}
        <div className="flex items-center">
          <button
            onClick={handleThemeSwitch}
            className={`p-2 rounded-full text-(--accent) hover:bg-(--accent)/20 transition-colors`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>
          
          {/* A TAG <IMG> QUE ESTAVA AQUI FOI REMOVIDA
          */}
          
        </div>
      </nav>
    </header>
  );
};

export default Header;