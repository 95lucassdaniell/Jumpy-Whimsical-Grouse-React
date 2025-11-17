import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [summary, setSummary] = useState(null);
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const history = useHistory();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn, currentPage]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (error) {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setIsLoggedIn(false);
      history.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const loadData = async () => {
    try {
      const [summaryRes, leadsRes] = await Promise.all([
        fetch('/api/analytics/summary', { credentials: 'include' }),
        fetch(`/api/leads?page=${currentPage}&limit=20`, { credentials: 'include' })
      ]);

      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData.summary);
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads);
        setTotalPages(leadsData.pagination.pages);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/leads?format=csv', '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <img src="/logo-minha-tshirt.png" alt="Minha T-Shirt" className="login-logo" />
            <h1>Painel Administrativo</h1>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="login-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-login">
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Dashboard de Leads</h1>
          <button onClick={handleLogout} className="btn btn-outline btn-logout">
            Sair
          </button>
        </div>
      </div>

      {summary && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-content">
              <div className="stat-value">{summary.totalVisits}</div>
              <div className="stat-label">Visitas Totais</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{summary.uniqueVisitors}</div>
              <div className="stat-label">Visitantes Únicos</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-value">{summary.totalLeads}</div>
              <div className="stat-label">Leads Cadastrados</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <div className="stat-value">{summary.leadsWithWhatsApp}</div>
              <div className="stat-label">Cliques no WhatsApp</div>
            </div>
          </div>

          <div className="stat-card stat-card-highlight">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{summary.conversionRate}%</div>
              <div className="stat-label">Taxa de Conversão</div>
            </div>
          </div>
        </div>
      )}

      <div className="leads-section">
        <div className="leads-header">
          <h2>Todos os Leads</h2>
          <button onClick={handleExportCSV} className="btn btn-primary btn-export">
            📥 Exportar CSV
          </button>
        </div>

        <div className="leads-table-container">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{formatDate(lead.createdAt)}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    {lead.whatsappClickedAt ? (
                      <span className="badge badge-success">✓ Clicou</span>
                    ) : (
                      <span className="badge badge-pending">Pendente</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-outline btn-pagination"
            >
              ← Anterior
            </button>
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-outline btn-pagination"
            >
              Próxima →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
