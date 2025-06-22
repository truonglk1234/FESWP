import React, { useEffect, useState } from 'react';
import ConsultantFilters from './ConsultantFilters';
import ConsultantCard from './ConsultantCard';
import Pagination from './Pagination';
import { Search } from 'lucide-react';
import './ConsultantContent.css';
import axios from 'axios';

const ConsultantContent = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    specialty: 'Tất cả',
    gender: 'Tất cả',
  });

  const [consultants, setConsultants] = useState([]);
  const perPage = 6;

  // ✅ Fetch data từ API mỗi khi filter hoặc search thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          specialty: filters.specialty !== 'Tất cả' ? filters.specialty : undefined,
          gender: filters.gender !== 'Tất cả' ? filters.gender : undefined,
        };

        const response = await axios.get('http://localhost:8080/api/public/consultants', { params });
        const data = response.data;

        // ✅ Lọc client-side nếu có tìm kiếm
        const filtered = data.filter(doc => {
          const matchesSearch =
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.hospital.toLowerCase().includes(search.toLowerCase()) ||
            doc.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));

          return matchesSearch;
        });

        setConsultants(filtered);
        setPage(1); // Reset trang đầu
      } catch (err) {
        console.error('❌ Lỗi lấy danh sách tư vấn viên:', err);
      }
    };

    fetchData();
  }, [filters, search]);

  const totalPages = Math.ceil(consultants.length / perPage);
  const paginated = consultants.slice((page - 1) * perPage, page * perPage);

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
        total={consultants.length}
        filters={filters}
        setFilters={setFilters}
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
