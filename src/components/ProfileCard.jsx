// src/components/ProfileCard.jsx
import React from 'react';

// Props que ele recebe:
// - profile: O objeto JSON com os dados (nome, foto, cargo, skills)
// - theme: O estado 'light' ou 'dark' do App.jsx
// - onCardClick: A função do App.jsx para abrir a modal
//
const ProfileCard = ({ profile, theme, onCardClick }) => {

  // --- 1. Lógica das Classes Condicionais ---

  const cardClasses = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' // Classes Dark
    : 'bg-white border-gray-200 hover:bg-gray-50';   // Classes Light

  const nameClasses = theme === 'dark'
    ? 'text-white'
    : 'text-gray-900';

  const cargoClasses = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-600';

  const tagClasses = theme === 'dark'
    ? 'bg-blue-900 text-blue-200'
    : 'bg-blue-100 text-blue-800';

  // --- 2. Lógica dos Dados ---
  // Pega apenas as 3 primeiras habilidades técnicas para exibir no card
  const mainSkills = profile.habilidadesTecnicas.slice(0, 3);

  return (
    <button
      // O Card inteiro é um botão para abrir a modal
      // Passamos o 'profile' de volta para a função saber quem foi clicado
      onClick={() => onCardClick(profile)}
      className={`
        w-full p-5 rounded-lg border shadow-md text-left 
        transition-all duration-200 ease-in-out
        transform hover:-translate-y-1 focus:outline-none 
        focus:ring-2 focus:ring-blue-500
        ${cardClasses}
      `}
    >
      <div className="flex flex-col items-center text-center">
        {/* Foto */}
        <img
          src={profile.foto}
          alt={`Foto de ${profile.nome}`}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
        />

        {/* Nome  */}
        <h3 className={`mt-4 text-xl font-bold ${nameClasses}`}>
          {profile.nome}
        </h3>

        {/* Cargo  */}
        <p className={`mt-1 text-sm ${cargoClasses}`}>
          {profile.cargo}
        </p>

        {/* Skills  */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {mainSkills.map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${tagClasses}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default ProfileCard;