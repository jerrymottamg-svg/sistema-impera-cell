import React from 'react';

export function Header() {
  return (
    <header>
      <div className="logo">
        <h2 style={{color: 'var(--gold)', margin: 0}}>Impera Cell</h2>
      </div>
      <div className="header-right">
        <span className="date-display" id="headerDate">
          {new Date().toLocaleDateString('pt-BR')}
        </span>
      </div>
    </header>
  );
}
