import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('leads');
  
  const [summary, setSummary] = useState(null);
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [abandonedStats, setAbandonedStats] = useState(null);
  const [abandonedSignups, setAbandonedSignups] = useState([]);
  const [abandonedPage, setAbandonedPage] = useState(1);
  const [abandonedTotalPages, setAbandonedTotalPages] = useState(1);
  
  const history = useHistory();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn, currentPage]);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'abandoned') {
      loadAbandonedData();
    }
  }, [isLoggedIn, activeTab, abandonedPage]);

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

  const loadAbandonedData = async () => {
    try {
      const [statsRes, signupsRes] = await Promise.all([
        fetch('/api/abandoned-signups/stats', { credentials: 'include' }),
        fetch(`/api/abandoned-signups?page=${abandonedPage}&limit=20`, { credentials: 'include' })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setAbandonedStats(statsData);
      }

      if (signupsRes.ok) {
        const signupsData = await signupsRes.json();
        setAbandonedSignups(signupsData.signups);
        setAbandonedTotalPages(signupsData.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error loading abandoned data:', error);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/leads?format=csv', '_blank');
  };

  const handleExportAbandonedCSV = () => {
    window.open('/api/abandoned-signups/export', '_blank');
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

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'leads' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          📝 Leads Completos
        </button>
        <button
          className={`tab-button ${activeTab === 'abandoned' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('abandoned')}
        >
          ⚠️ Cadastros Abandonados
        </button>
      </div>

      {activeTab === 'leads' && (
        <>
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
        </>
      )}

      {activeTab === 'abandoned' && (
        <>
          {abandonedStats && (
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">⚠️</div>
                <div className="stat-content">
                  <div className="stat-value">{abandonedStats.totalAbandoned}</div>
                  <div className="stat-label">Cadastros Abandonados</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🕐</div>
                <div className="stat-content">
                  <div className="stat-value">{abandonedStats.recentAbandoned}</div>
                  <div className="stat-label">Últimas 24h</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📧</div>
                <div className="stat-content">
                  <div className="stat-value">{abandonedStats.withEmail}</div>
                  <div className="stat-label">Com Email</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📱</div>
                <div className="stat-content">
                  <div className="stat-value">{abandonedStats.withPhone}</div>
                  <div className="stat-label">Com Telefone</div>
                </div>
              </div>

              <div className="stat-card stat-card-highlight">
                <div className="stat-icon">🔄</div>
                <div className="stat-content">
                  <div className="stat-value">{abandonedStats.recoveryRate}%</div>
                  <div className="stat-label">Taxa de Recuperação</div>
                </div>
              </div>
            </div>
          )}

          <div className="leads-section">
            <div className="leads-header">
              <h2>Cadastros Não Concluídos</h2>
              <button onClick={handleExportAbandonedCSV} className="btn btn-primary btn-export">
                📥 Exportar CSV
              </button>
            </div>

            <div className="abandoned-info">
              <p>💡 Esses contatos começaram a preencher o formulário mas não completaram. Use essas informações para recuperá-los!</p>
            </div>

            <div className="leads-table-container">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Última Atualização</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>UTM Source</th>
                  </tr>
                </thead>
                <tbody>
                  {abandonedSignups.map((signup) => (
                    <tr key={signup.id}>
                      <td>{formatDate(signup.updatedAt)}</td>
                      <td>{signup.name || <span className="text-muted">-</span>}</td>
                      <td>{signup.email || <span className="text-muted">-</span>}</td>
                      <td>{signup.phone || <span className="text-muted">-</span>}</td>
                      <td>{signup.utmSource || <span className="text-muted">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {abandonedTotalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setAbandonedPage(p => Math.max(1, p - 1))}
                  disabled={abandonedPage === 1}
                  className="btn btn-outline btn-pagination"
                >
                  ← Anterior
                </button>
                <span className="pagination-info">
                  Página {abandonedPage} de {abandonedTotalPages}
                </span>
                <button
                  onClick={() => setAbandonedPage(p => Math.min(abandonedTotalPages, p + 1))}
                  disabled={abandonedPage === abandonedTotalPages}
                  className="btn btn-outline btn-pagination"
                >
                  Próxima →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
