import React, { useState } from 'react';
import ConsultantFilters from './ConsultantFilters';
import ConsultantCard from './ConsultantCard';
import Pagination from './Pagination';
import { Search } from 'lucide-react';
import './ConsultantContent.css';
import consultantsData from './consultantsData';

const ConsultantContent = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('Tất cả');
  const [location, setLocation] = useState('Tất cả');
  const [gender, setGender] = useState('Tất cả');
  const [price, setPrice] = useState('Tất cả');

  const perPage = 6;

  const filtered = consultantsData.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialties.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      doc.hospital.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialty = specialty === 'Tất cả' || doc.specialties.includes(specialty);
    const matchesLocation = location === 'Tất cả' || doc.location === location;
    const matchesGender = gender === 'Tất cả' || (gender === 'Nam' ? !doc.name.includes('Thị') : doc.name.includes('Thị'));
    const matchesPrice = price === 'Tất cả' ||
      (price === '<400' && doc.price < 400000) ||
      (price === '400-500' && doc.price >= 400000 && doc.price <= 500000) ||
      (price === '>500' && doc.price > 500000);

    return matchesSearch && matchesSpecialty && matchesLocation && matchesGender && matchesPrice;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="consultant-section">
      <div className="search-box">
        <Search size={18} className="consultant-search-icon" />
        <input
          type="text"
          placeholder="Tìm kiếm bác sĩ theo tên, chuyên khoa, bệnh viện…"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ConsultantFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        total={filtered.length}
        specialty={specialty}
        setSpecialty={setSpecialty}
        location={location}
        setLocation={setLocation}
        gender={gender}
        setGender={setGender}
        price={price}
        setPrice={setPrice}
      />

      <div className={viewMode === 'grid' ? 'consultant-grid' : 'consultant-list'}>
        {paginated.map((doc, idx) => (
          <ConsultantCard key={idx} doc={doc} viewMode={viewMode} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default ConsultantContent;