import React, { useState } from 'react';

const DateRangeFilter = ({ onChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  const handlePresetFilter = (preset) => {
    const today = getToday();
    let start, end;

    switch (preset) {
      case 'today':
        start = today;
        end = today;
        break;
      case 'last7days':
        start = getDaysAgo(7);
        end = today;
        break;
      case 'last30days':
        start = getDaysAgo(30);
        end = today;
        break;
      case 'all':
        start = '';
        end = '';
        break;
      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
    onChange(start, end);
  };

  const handleCustomFilter = () => {
    onChange(startDate, endDate);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    onChange('', '');
  };

  return (
    <div className="date-range-filter">
      <div className="filter-presets">
        <button 
          onClick={() => handlePresetFilter('today')} 
          className="btn btn-outline btn-sm"
        >
          Hoje
        </button>
        <button 
          onClick={() => handlePresetFilter('last7days')} 
          className="btn btn-outline btn-sm"
        >
          Últimos 7 dias
        </button>
        <button 
          onClick={() => handlePresetFilter('last30days')} 
          className="btn btn-outline btn-sm"
        >
          Último mês
        </button>
        <button 
          onClick={() => handlePresetFilter('all')} 
          className="btn btn-outline btn-sm"
        >
          Todos
        </button>
      </div>

      <div className="filter-custom">
        <div className="filter-input-group">
          <label htmlFor="startDate">De:</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="filter-date-input"
          />
        </div>

        <div className="filter-input-group">
          <label htmlFor="endDate">Até:</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="filter-date-input"
          />
        </div>

        <button 
          onClick={handleCustomFilter} 
          className="btn btn-primary btn-sm"
          disabled={!startDate && !endDate}
        >
          Filtrar
        </button>

        {(startDate || endDate) && (
          <button 
            onClick={handleClear} 
            className="btn btn-outline btn-sm"
          >
            Limpar
          </button>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;
