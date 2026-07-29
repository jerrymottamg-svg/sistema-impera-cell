import React from 'react';

export function CompatibilidadePeliculas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <iframe
        src="https://ferramentas.infinitoconteudo.com.br/"
        style={{ flex: 1, width: '100%', border: 'none', borderRadius: '8px', minHeight: '80vh' }}
        title="Compatibilidade de Películas"
        allowFullScreen
      />
    </div>
  );
}
