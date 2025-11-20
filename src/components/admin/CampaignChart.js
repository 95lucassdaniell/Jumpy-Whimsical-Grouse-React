import React from 'react';
import './CampaignChart.css';

function CampaignChart({ campaigns }) {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="campaign-chart-empty">
        <p>📊 Nenhuma campanha com dados ainda.</p>
        <p className="empty-hint">Leads começarão a aparecer aqui assim que forem capturados com parâmetros UTM.</p>
      </div>
    );
  }

  const maxLeads = Math.max(...campaigns.map(c => c.leads));

  return (
    <div className="campaign-chart">
      <div className="chart-header">
        <h3>📈 Top Campanhas (por Leads)</h3>
        <p className="chart-subtitle">Últimos 30 dias</p>
      </div>

      <div className="chart-bars">
        {campaigns.map((campaign, index) => {
          const barWidth = (campaign.leads / maxLeads) * 100;
          
          return (
            <div key={index} className="chart-bar-row">
              <div className="bar-label">
                <div className="campaign-name">{campaign.campaign}</div>
                <div className="campaign-source">{campaign.source || 'Origem não identificada'}</div>
              </div>
              
              <div className="bar-container">
                <div 
                  className="bar-fill"
                  style={{ width: `${barWidth}%` }}
                >
                  <span className="bar-value">{campaign.leads}</span>
                </div>
              </div>

              <div className="bar-stats">
                <span className="stat-item">
                  <span className="stat-icon">💬</span>
                  {campaign.whatsappClicks}
                </span>
                <span className="stat-item">
                  <span className="stat-icon">📊</span>
                  {campaign.conversionRate}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-icon">💬</span>
          <span>Cliques WhatsApp</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">📊</span>
          <span>Taxa de Conversão</span>
        </div>
      </div>
    </div>
  );
}

export default CampaignChart;
