import React from 'react';
import './LeadDetailsModal.css';

function LeadDetailsModal({ lead, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-details" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes do Lead</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="lead-details-content">
          <section className="details-section">
            <h3>📋 Informações Básicas</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Nome:</label>
                <span>{lead.name}</span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span>{lead.email}</span>
              </div>
              <div className="detail-item">
                <label>Telefone:</label>
                <span>{lead.phone}</span>
              </div>
              <div className="detail-item">
                <label>Data de Cadastro:</label>
                <span>{formatDate(lead.createdAt)}</span>
              </div>
              <div className="detail-item">
                <label>Clicou WhatsApp:</label>
                <span>
                  {lead.whatsappClickedAt ? (
                    <span className="badge badge-success">✓ Sim ({formatDate(lead.whatsappClickedAt)})</span>
                  ) : (
                    <span className="badge badge-pending">Não</span>
                  )}
                </span>
              </div>
            </div>
          </section>

          {(lead.utmSource || lead.utmMedium || lead.utmCampaign || lead.utmContent || lead.utmTerm) && (
            <section className="details-section">
              <h3>🎯 Parâmetros UTM</h3>
              <div className="details-grid">
                {lead.utmSource && (
                  <div className="detail-item">
                    <label>Source (Origem):</label>
                    <span className="highlight">{lead.utmSource}</span>
                  </div>
                )}
                {lead.utmMedium && (
                  <div className="detail-item">
                    <label>Medium (Mídia):</label>
                    <span className="highlight">{lead.utmMedium}</span>
                  </div>
                )}
                {lead.utmCampaign && (
                  <div className="detail-item">
                    <label>Campaign (Campanha):</label>
                    <span className="highlight">{lead.utmCampaign}</span>
                  </div>
                )}
                {lead.utmContent && (
                  <div className="detail-item">
                    <label>Content (Conteúdo):</label>
                    <span>{lead.utmContent}</span>
                  </div>
                )}
                {lead.utmTerm && (
                  <div className="detail-item">
                    <label>Term (Termo):</label>
                    <span>{lead.utmTerm}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {(lead.fbclid || lead.campaignId || lead.adId || lead.adsetId) && (
            <section className="details-section">
              <h3>📱 Rastreamento Facebook Ads</h3>
              <div className="details-grid">
                {lead.fbclid && (
                  <div className="detail-item">
                    <label>Facebook Click ID:</label>
                    <span className="monospace">{lead.fbclid}</span>
                  </div>
                )}
                {lead.campaignId && (
                  <div className="detail-item">
                    <label>Campaign ID:</label>
                    <span className="monospace">{lead.campaignId}</span>
                  </div>
                )}
                {lead.adId && (
                  <div className="detail-item">
                    <label>Ad ID:</label>
                    <span className="monospace">{lead.adId}</span>
                  </div>
                )}
                {lead.adsetId && (
                  <div className="detail-item">
                    <label>Adset ID:</label>
                    <span className="monospace">{lead.adsetId}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {!lead.utmSource && !lead.fbclid && !lead.campaignId && (
            <section className="details-section">
              <p className="text-muted text-center">
                ℹ️ Nenhuma informação de rastreamento disponível para este lead.
              </p>
            </section>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsModal;
