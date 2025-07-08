import React, { useEffect, useState } from 'react';
import ConsultantCard from './ConsultantCard';
import Pagination from './Pagination';
import './ConsultantContent.css';
import axios from 'axios';

const ConsultantContent = () => {
  const [consultants, setConsultants] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/prices/advice')
      .then((res) => {
        console.log('📦 Dữ liệu tư vấn viên:', res.data);
        setConsultants(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải danh sách tư vấn viên:", err);
      });
  }, []);

  const totalPages = Math.ceil(consultants.length / perPage);
  const paginated = consultants.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="cc-section">
      <div className="cc-grid">
        {paginated.map((consultant) => (
          <ConsultantCard key={consultant.id} data={consultant} />
        ))}
      </div>

      <div className="cc-pagination">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </section>
  );
};

export default ConsultantContent;
