import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/storage';

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    aguardando: 0,
    andamento: 0,
    concluido: 0,
    entregue: 0
  });
  const [recentOs, setRecentOs] = useState([]);

  useEffect(() => {
    const data = getData();
    const ordens = data.ordens || [];
    
    let total = 0, aguardando = 0, andamento = 0, concluido = 0, entregue = 0;
    
    ordens.forEach(os => {
      total++;
      const st = (os.status || '').toLowerCase();
      if (st.includes('aguardando')) aguardando++;
      else if (st === 'em andamento') andamento++;
      else if (st === 'concluído' || st === 'concluido') concluido++;
      else if (st === 'entregue') entregue++;
    });

    setStats({ total, aguardando, andamento, concluido, entregue });
    
    // Sort descending by ID for recent OS
    const sorted = [...ordens].sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
    setRecentOs(sorted.slice(0, 10));
  }, []);

  return (
    <div className="page active" id="page-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total de OS</span>
          <span className="stat-value gold">{stats.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Aguardando</span>
          <span className="stat-value gold">{stats.aguardando}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Em Andamento</span>
          <span className="stat-value blue">{stats.andamento}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Concluídas</span>
          <span className="stat-value green">{stats.concluido}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Entregues</span>
          <span className="stat-value">{stats.entregue}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="icon">🕐</span> OS Recentes</div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/nova-os')}>+ Nova OS</button>
        </div>
        <div className="table-wrap">
          <table id="dashTable">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Cliente</th>
                <th>Aparelho</th>
                <th>Serviço</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {recentOs.map(os => (
                <tr key={os.id}>
                  <td style={{color: 'var(--gold)', fontWeight: 600}}>#{String(os.id).padStart(4, '0')}</td>
                  <td>{os.nomeCliente}</td>
                  <td>{os.modeloAparelho}</td>
                  <td>{os.tipoManutencao}</td>
                  <td><span className={`status-badge st-${(os.status || '').replace(/\s+/g, '-').toLowerCase()}`}>{os.status}</span></td>
                  <td>{os.dataEntrada}</td>
                </tr>
              ))}
              {recentOs.length === 0 && (
                <tr><td colSpan="6" style={{textAlign: 'center', opacity: 0.5}}>Nenhuma OS encontrada</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
