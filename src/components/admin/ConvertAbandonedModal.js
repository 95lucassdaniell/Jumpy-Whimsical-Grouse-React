import React, { useState } from 'react';

const ConvertAbandonedModal = ({ signup, onClose, onConfirm }) => {
  const [name, setName] = useState(signup.name || '');
  const [email, setEmail] = useState(signup.email || '');
  const [phone, setPhone] = useState(signup.phone || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone) {
      setError('Todos os campos são obrigatórios para converter em lead');
      return;
    }

    setLoading(true);
    try {
      await onConfirm({ name, email, phone });
    } catch (err) {
      setError(err.message || 'Erro ao converter em lead');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Converter em Lead</h3>
          <button onClick={onClose} className="modal-close">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Confirme ou edite os dados abaixo para converter este cadastro abandonado em um lead completo.
          </p>

          {error && (
            <div className="modal-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                required
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                required
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone *</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
                className="modal-input"
              />
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="btn btn-outline"
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Convertendo...' : 'Confirmar Conversão'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConvertAbandonedModal;
