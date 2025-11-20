import React from 'react';
import './DeleteLeadModal.css';

function DeleteLeadModal({ lead, onClose, onConfirm, isDeleting }) {
  return (
    <div className="modal-overlay" onClick={isDeleting ? null : onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir este lead?</p>
        
        <div className="delete-lead-info">
          <p><strong>Nome:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Telefone:</strong> {lead.phone}</p>
        </div>
        
        <p className="delete-warning">
          ⚠️ Esta ação não pode ser desfeita.
        </p>
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </button>
          <button className="btn-delete" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Excluindo...' : 'Excluir Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteLeadModal;
