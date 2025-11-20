import React, { useState, useEffect } from 'react';
import CampaignChart from '../../components/admin/CampaignChart';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [campaignStats, setCampaignStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
    loadCampaignStats();
  }, []);

  const loadSummary = async () => {
    try {
      const response = await fetch('/api/analytics/summary', { 
        credentials: 'include' 
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCampaignStats = async () => {
    try {
      const response = await fetch('/api/analytics/campaigns?period=30', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCampaignStats(data);
      }
    } catch (error) {
      console.error('Error loading campaign stats:', error);
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

      {summary && summary.current && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-content">
              <div className="stat-value">{summary.current.totalVisits}</div>
              <div className="stat-label">Visitas (30 dias)</div>
              {summary.growth && (
                <div className={`stat-growth ${summary.growth.visits >= 0 ? 'positive' : 'negative'}`}>
                  {summary.growth.visits >= 0 ? '↑' : '↓'} {Math.abs(summary.growth.visits)}%
                  <span className="stat-comparison"> vs. período anterior</span>
                </div>
              )}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{summary.current.uniqueVisitors}</div>
              <div className="stat-label">Visitantes Únicos (30 dias)</div>
              {summary.growth && (
                <div className={`stat-growth ${summary.growth.uniqueVisitors >= 0 ? 'positive' : 'negative'}`}>
                  {summary.growth.uniqueVisitors >= 0 ? '↑' : '↓'} {Math.abs(summary.growth.uniqueVisitors)}%
                  <span className="stat-comparison"> vs. período anterior</span>
                </div>
              )}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-value">{summary.current.totalLeads}</div>
              <div className="stat-label">Leads (30 dias)</div>
              {summary.growth && (
                <div className={`stat-growth ${summary.growth.leads >= 0 ? 'positive' : 'negative'}`}>
                  {summary.growth.leads >= 0 ? '↑' : '↓'} {Math.abs(summary.growth.leads)}%
                  <span className="stat-comparison"> vs. período anterior</span>
                </div>
              )}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <div className="stat-value">{summary.current.leadsWithWhatsApp}</div>
              <div className="stat-label">Cliques WhatsApp (30 dias)</div>
              {summary.growth && (
                <div className={`stat-growth ${summary.growth.whatsapp >= 0 ? 'positive' : 'negative'}`}>
                  {summary.growth.whatsapp >= 0 ? '↑' : '↓'} {Math.abs(summary.growth.whatsapp)}%
                  <span className="stat-comparison"> vs. período anterior</span>
                </div>
              )}
            </div>
          </div>

          <div className="stat-card stat-card-highlight">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{summary.current.conversionRate}%</div>
              <div className="stat-label">Taxa de Conversão</div>
              <div className="stat-subtitle">Leads / Visitantes Únicos</div>
              {summary.growth && (
                <div className={`stat-growth ${summary.growth.conversion >= 0 ? 'positive' : 'negative'}`}>
                  {summary.growth.conversion >= 0 ? '↑' : '↓'} {Math.abs(summary.growth.conversion)}%
                  <span className="stat-comparison"> vs. período anterior</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {campaignStats && (
        <div className="dashboard-section">
          <CampaignChart campaigns={campaignStats.campaigns} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
