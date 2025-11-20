import React, { useState, useEffect } from 'react';
import DateRangeFilter from '../../components/admin/DateRangeFilter';
import DeleteLeadModal from '../../components/admin/DeleteLeadModal';
import LeadDetailsModal from '../../components/admin/LeadDetailsModal';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [leadToView, setLeadToView] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadLeads();
  }, [currentPage, startDate, endDate]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      let url = `/api/leads?page=${currentPage}&limit=20`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const response = await fetch(url, { 
        credentials: 'include' 
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    let url = '/api/leads?format=csv';
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    window.open(url, '_blank');
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

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/leads/${leadToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
        setLeadToDelete(null);
        alert('Lead excluído com sucesso!');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao excluir lead');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Erro ao excluir lead');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h2>Leads Completos</h2>
          <p className="page-description">Lista de todos os leads que completaram o cadastro</p>
        </div>
        <button onClick={handleExportCSV} className="btn btn-primary btn-export">
          📥 Exportar CSV
        </button>
      </div>

      <DateRangeFilter onChange={handleDateRangeChange} />

      <div className="leads-table-container">
        {loading ? (
          <div className="table-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Nome</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Origem</th>
                <th>Ações</th>
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
                    {lead.utmSource || lead.utmCampaign ? (
                      <div className="lead-origin">
                        {lead.utmSource && (
                          <span className="origin-badge origin-source">
                            {lead.utmSource}
                          </span>
                        )}
                        {lead.utmCampaign && (
                          <span className="origin-badge origin-campaign" title={`Campanha: ${lead.utmCampaign}`}>
                            📢 {lead.utmCampaign}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td className="lead-actions">
                    <button 
                      className="btn-details-small"
                      onClick={() => setLeadToView(lead)}
                      title="Ver detalhes completos"
                    >
                      🔍
                    </button>
                    <button 
                      className="btn-delete-small"
                      onClick={() => setLeadToDelete(lead)}
                      title="Excluir lead"
                    >
                      🗑️
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

      {leadToDelete && (
        <DeleteLeadModal
          lead={leadToDelete}
          onClose={() => setLeadToDelete(null)}
          onConfirm={handleDeleteLead}
          isDeleting={isDeleting}
        />
      )}

      {leadToView && (
        <LeadDetailsModal
          lead={leadToView}
          onClose={() => setLeadToView(null)}
        />
      )}
    </div>
  );
};

export default AdminLeads;
