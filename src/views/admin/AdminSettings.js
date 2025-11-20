import React, { useState, useEffect } from 'react';

const AdminSettings = () => {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [redirectEnabled, setRedirectEnabled] = useState(true);
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
        setRedirectUrl(data.settings.redirectUrl || '');
        setRedirectEnabled(data.settings.redirectEnabled === 'true');
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
          redirectUrl,
          redirectEnabled
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
          <h2>Configurações</h2>
          <p className="page-description">Configure o link de redirecionamento após cadastro</p>
        </div>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSaveSettings} className="settings-form">
          {settingsSaved && (
            <div className="settings-success">
              ✓ Configurações salvas com sucesso!
            </div>
          )}
          {settingsError && (
            <div className="settings-error">
              ✗ {settingsError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="redirectUrl">
              URL de Redirecionamento
              <span className="label-hint">Link completo para onde o lead será enviado</span>
            </label>
            <input
              id="redirectUrl"
              type="url"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="https://exemplo.com/link"
              className="settings-input"
              required
            />
          </div>

          <div className="form-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={redirectEnabled}
                onChange={(e) => setRedirectEnabled(e.target.checked)}
              />
              <span>Ativar redirecionamento automático</span>
            </label>
            <p className="checkbox-hint">
              Quando ativado, o lead será redirecionado automaticamente em 3 segundos após preencher o formulário.
            </p>
          </div>

          <div className="settings-actions">
            <button type="submit" className="btn btn-primary btn-save-settings">
              💾 Salvar Configurações
            </button>
          </div>

          <div className="settings-info">
            <h3>📝 Como funciona:</h3>
            <ol>
              <li>Lead preenche o formulário de contato</li>
              <li>Sistema exibe mensagem de sucesso</li>
              <li>Contador de 3 segundos é iniciado (se o redirecionamento estiver ativo)</li>
              <li>Lead é redirecionado automaticamente para o link configurado</li>
            </ol>
            <p className="info-note">
              <strong>Nota:</strong> O redirecionamento pode ser desativado a qualquer momento desmarcando a opção acima.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
