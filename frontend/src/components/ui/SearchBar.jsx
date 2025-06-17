import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ 
  placeholder = 'Buscar...', 
  onSearch 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="search-container">
      <input
        type="text"
        className="input search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        type="submit"
        className="search-icon"
        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <Search style={{ width: '1rem', height: '1rem' }} />
      </button>
    </form>
  );
};

export default SearchBar;