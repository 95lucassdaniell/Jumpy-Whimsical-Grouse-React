import React, { useState, useEffect } from 'react';
import ConvertAbandonedModal from '../../components/admin/ConvertAbandonedModal';

const AdminAbandoned = () => {
  const [abandonedStats, setAbandonedStats] = useState(null);
  const [abandonedSignups, setAbandonedSignups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSignup, setSelectedSignup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadAbandonedData();
  }, [currentPage]);

  const loadAbandonedData = async () => {
    setLoading(true);
    try {
      const [statsRes, signupsRes] = await Promise.all([
        fetch('/api/abandoned-signups/stats', { credentials: 'include' }),
        fetch(`/api/abandoned-signups?page=${currentPage}&limit=20`, { credentials: 'include' })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setAbandonedStats(statsData);
      }

      if (signupsRes.ok) {
        const signupsData = await signupsRes.json();
        setAbandonedSignups(signupsData.signups);
        setTotalPages(signupsData.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error loading abandoned data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/abandoned-signups/export', '_blank');
  };

  const handleConvertClick = (signup) => {
    setSelectedSignup(signup);
    setShowModal(true);
  };

  const handleConfirmConvert = async (data) => {
    try {
      const response = await fetch(`/api/abandoned-signups/${selectedSignup.id}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setShowModal(false);
        setSelectedSignup(null);
        loadAbandonedData();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao converter');
      }
    } catch (error) {
      throw error;
    }
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

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h2>Cadastros Abandonados</h2>
          <p className="page-description">Contatos que iniciaram mas não completaram o cadastro</p>
        </div>
        <button onClick={handleExportCSV} className="btn btn-primary btn-export">
          📥 Exportar CSV
        </button>
      </div>

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

      <div className="abandoned-info">
        <p>💡 Esses contatos começaram a preencher o formulário mas não completaram. Use essas informações para recuperá-los!</p>
      </div>

      <div className="leads-table-container">
        {loading ? (
          <div className="table-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Última Atualização</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>UTM Source</th>
                <th>Ações</th>
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
                  <td>
                    <button 
                      onClick={() => handleConvertClick(signup)}
                      className="btn btn-primary btn-sm"
                    >
                      Entrei em contato
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

      {showModal && selectedSignup && (
        <ConvertAbandonedModal
          signup={selectedSignup}
          onClose={() => {
            setShowModal(false);
            setSelectedSignup(null);
          }}
          onConfirm={handleConfirmConvert}
        />
      )}
    </div>
  );
};

export default AdminAbandoned;
