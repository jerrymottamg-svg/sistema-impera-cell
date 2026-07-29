import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', icon: '📊', label: 'Dashboard' },
  { path: '/vendas', icon: '🛒', label: 'Vendas' },
  { path: '/lista-os', icon: '📋', label: 'Ordens de Serviço' },
  { path: '/clientes', icon: '👤', label: 'Clientes' },
  { path: '/estoque', icon: '📦', label: 'Estoque' },
  { path: '/financeiro', icon: '💰', label: 'Financeiro' },
  { path: '/tabela', icon: '💲', label: 'Tabela de Preços' },
  { path: '/compatibilidade-peliculas', icon: '📱', label: 'Compatibilidade Películas' },
];

export function Sidebar() {
  return (
    <nav>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
        >
          {item.icon} {item.label}
        </NavLink>
      ))}
      {/* Admins only (to be implemented via state later) */}
      <NavLink to="/vendedores" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`} style={{ display: 'none' }}>
        👥 Vendedores
      </NavLink>
      <NavLink to="/usuarios" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`} style={{ display: 'none' }}>
        ⚙️ Usuários
      </NavLink>
    </nav>
  );
}
