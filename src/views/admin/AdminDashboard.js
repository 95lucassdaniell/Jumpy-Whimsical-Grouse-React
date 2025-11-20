import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const response = await fetch('/api/analytics/summary', { 
        credentials: 'include' 
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p className="page-description">Visão geral das métricas e estatísticas</p>
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
    </div>
  );
};

export default AdminDashboard;
