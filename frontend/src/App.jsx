import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { OrdensServico } from './pages/OrdensServico';
import { CompatibilidadePeliculas } from './pages/CompatibilidadePeliculas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lista-os" element={<OrdensServico />} />
          <Route path="compatibilidade-peliculas" element={<CompatibilidadePeliculas />} />
          {/* Add more routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
