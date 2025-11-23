import React, { useState, useEffect } from 'react';

const AdminTrackingCodes = () => {
  const [trackingLeadFlow, setTrackingLeadFlow] = useState('');
  const [trackingGTM, setTrackingGTM] = useState('');
  const [trackingFacebookPixel, setTrackingFacebookPixel] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setTrackingLeadFlow(data.settings.trackingLeadFlow || '');
        setTrackingGTM(data.settings.trackingGTM || '');
        setTrackingFacebookPixel(data.settings.trackingFacebookPixel || '');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaved(false);
    setSettingsError('');

    try {
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          trackingLeadFlow,
          trackingGTM,
          trackingFacebookPixel
        })
      });

      if (response.ok) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      } else {
        setSettingsError('Erro ao salvar configurações');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSettingsError('Erro ao salvar configurações');
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
        <div>
          <h2>Códigos de Rastreamento</h2>
          <p className="page-description">Configure os scripts de rastreamento e analytics</p>
        </div>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSaveSettings} className="settings-form">
          {settingsSaved && (
            <div className="settings-success">
              ✓ Códigos de rastreamento salvos com sucesso!
            </div>
          )}
          {settingsError && (
            <div className="settings-error">
              ✗ {settingsError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="trackingLeadFlow">
              🔵 LeadFlow Project ID
              <span className="label-hint">ID do projeto LeadFlow (ex: lf_vqnn7fd5y_1763669073290)</span>
            </label>
            <input
              id="trackingLeadFlow"
              type="text"
              value={trackingLeadFlow}
              onChange={(e) => setTrackingLeadFlow(e.target.value)}
              placeholder="lf_vqnn7fd5y_1763669073290"
              className="settings-input"
            />
            <p className="field-note">
              Deixe em branco para desativar o rastreamento LeadFlow
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="trackingGTM">
              📊 Google Tag Manager (GTM)
              <span className="label-hint">ID do container GTM (ex: GTM-XXXXXXX)</span>
            </label>
            <input
              id="trackingGTM"
              type="text"
              value={trackingGTM}
              onChange={(e) => setTrackingGTM(e.target.value)}
              placeholder="GTM-XXXXXXX"
              className="settings-input"
            />
            <p className="field-note">
              Deixe em branco para desativar o Google Tag Manager
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="trackingFacebookPixel">
              📘 Facebook Pixel ID
              <span className="label-hint">ID do pixel do Facebook (ex: 123456789012345)</span>
            </label>
            <input
              id="trackingFacebookPixel"
              type="text"
              value={trackingFacebookPixel}
              onChange={(e) => setTrackingFacebookPixel(e.target.value)}
              placeholder="123456789012345"
              className="settings-input"
            />
            <p className="field-note">
              Deixe em branco para desativar o Facebook Pixel
            </p>
          </div>

          <div className="settings-actions">
            <button type="submit" className="btn btn-primary btn-save-settings">
              💾 Salvar Códigos de Rastreamento
            </button>
          </div>

          <div className="settings-info">
            <h3>📝 Sobre os Códigos de Rastreamento:</h3>
            
            <div className="info-section">
              <h4>🔵 LeadFlow</h4>
              <p>
                Sistema de captura de leads que envia dados automaticamente para o Supabase.
                Configure o Project ID fornecido pela plataforma LeadFlow.
              </p>
            </div>

            <div className="info-section">
              <h4>📊 Google Tag Manager (GTM)</h4>
              <p>
                Gerenciador de tags do Google que permite adicionar e atualizar tags de 
                marketing sem precisar modificar o código. Encontre seu ID no painel do GTM.
              </p>
            </div>

            <div className="info-section">
              <h4>📘 Facebook Pixel</h4>
              <p>
                Código de rastreamento do Facebook que permite medir campanhas, otimizar anúncios
                e criar públicos personalizados. Encontre seu Pixel ID no Gerenciador de Eventos do Facebook.
              </p>
            </div>

            <p className="info-note">
              <strong>Nota:</strong> As alterações entrarão em vigor imediatamente após salvar.
              Os códigos vazios não serão injetados no site.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminTrackingCodes;
