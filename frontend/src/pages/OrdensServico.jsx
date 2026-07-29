import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/storage';

export function OrdensServico() {
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const [sortCol, setSortCol] = useState('data');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const data = getData();
    setOrdens(data.ordens || []);
  }, []);

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const getSortIcon = (col) => {
    if (sortCol === col) {
      return sortAsc ? ' ▲' : ' ▼';
    }
    return <span style={{ opacity: 0.3 }}> ↕</span>;
  };

  let filteredOrdens = [...ordens];

  // Apply Search
  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredOrdens = filteredOrdens.filter(o => 
      (o.id && String(o.id).includes(lowerSearch)) ||
      (o.nomeCliente && o.nomeCliente.toLowerCase().includes(lowerSearch)) ||
      (o.modeloAparelho && o.modeloAparelho.toLowerCase().includes(lowerSearch))
    );
  }

  // Apply Filter
  if (filterStatus) {
    filteredOrdens = filteredOrdens.filter(o => 
      (o.status || '').toLowerCase() === filterStatus.toLowerCase()
    );
  }

  // Apply Sort
  filteredOrdens.sort((a, b) => {
    let valA, valB;
    switch(sortCol) {
      case 'id': 
        valA = parseInt(a.id, 10) || 0; 
        valB = parseInt(b.id, 10) || 0; 
        break;
      case 'cliente': 
        valA = (a.nomeCliente||'').toLowerCase(); 
        valB = (b.nomeCliente||'').toLowerCase(); 
        break;
      case 'aparelho': 
        valA = (a.modeloAparelho||'').toLowerCase(); 
        valB = (b.modeloAparelho||'').toLowerCase(); 
        break;
      case 'servico': 
        valA = (a.tipoManutencao||'').toLowerCase(); 
        valB = (b.tipoManutencao||'').toLowerCase(); 
        break;
      case 'tecnico': 
        valA = (a.tecnico||'').toLowerCase(); 
        valB = (b.tecnico||'').toLowerCase(); 
        break;
      case 'valor': 
        valA = parseFloat(a.valorServico) || 0; 
        valB = parseFloat(b.valorServico) || 0; 
        break;
      case 'status': 
        const getStatusWeight = (st) => {
          const s = (st || '').toLowerCase().trim();
          if (s === 'em andamento') return 1;
          if (s === 'aguardando') return 2;
          if (s.includes('aguardando pe')) return 3;
          if (s.includes('conclu')) return 4;
          if (s === 'entregue') return 5;
          if (s === 'cancelado') return 6;
          return 99;
        };
        valA = getStatusWeight(a.status);
        valB = getStatusWeight(b.status);
        break;
      case 'data':
      default:
        valA = a.dataISOEntrada ? new Date(a.dataISOEntrada).getTime() : ((a.dataEntrada && typeof a.dataEntrada === 'string' && a.dataEntrada.split('/').length === 3) ? new Date(`${a.dataEntrada.split('/')[2]}-${a.dataEntrada.split('/')[1]}-${a.dataEntrada.split('/')[0]}T00:00:00`).getTime() : 0);
        valB = b.dataISOEntrada ? new Date(b.dataISOEntrada).getTime() : ((b.dataEntrada && typeof b.dataEntrada === 'string' && b.dataEntrada.split('/').length === 3) ? new Date(`${b.dataEntrada.split('/')[2]}-${b.dataEntrada.split('/')[1]}-${b.dataEntrada.split('/')[0]}T00:00:00`).getTime() : 0);
        break;
    }
    
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return sortAsc ? (parseInt(a.id, 10) - parseInt(b.id, 10)) : (parseInt(b.id, 10) - parseInt(a.id, 10));
  });

  return (
    <div className="page active" id="page-lista-os">
      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="icon">📋</span> Ordens de Serviço</div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/nova-os')}>+ Nova OS</button>
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="🔍  Buscar por cliente, modelo, OS..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            style={{ minWidth: '160px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos os Status</option>
            <option value="Aguardando">Aguardando</option>
            <option value="Aguardando Peça">Aguardando Peça</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('id')}>Nº OS {getSortIcon('id')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('cliente')}>Cliente {getSortIcon('cliente')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('aparelho')}>Aparelho {getSortIcon('aparelho')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('servico')}>Serviço {getSortIcon('servico')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('tecnico')}>Técnico {getSortIcon('tecnico')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('valor')}>Valor {getSortIcon('valor')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('data')}>Data {getSortIcon('data')}</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrdens.map(os => (
                <tr key={os.id}>
                  <td style={{color: 'var(--gold)', fontWeight: 600}}>#{String(os.id).padStart(4, '0')}</td>
                  <td>{os.nomeCliente}</td>
                  <td>{os.modeloAparelho}</td>
                  <td>{os.tipoManutencao}</td>
                  <td>{os.tecnico}</td>
                  <td>R$ {(parseFloat(os.valorServico)||0).toFixed(2).replace('.', ',')}</td>
                  <td><span className={`status-badge st-${(os.status || '').replace(/\s+/g, '-').toLowerCase()}`}>{os.status}</span></td>
                  <td>{os.dataEntrada}</td>
                  <td>
                     <button className="btn btn-sm btn-outline">Ver</button>
                  </td>
                </tr>
              ))}
              {filteredOrdens.length === 0 && (
                <tr><td colSpan="9" style={{textAlign: 'center', opacity: 0.5}}>Nenhuma OS encontrada</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
