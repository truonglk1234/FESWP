import React, { useEffect, useState } from 'react';
import ConsultantCard from './ConsultantCard';
import Pagination from './Pagination';
import './ConsultantContent.css';
import axios from 'axios';

const ConsultantContent = () => {
  const [page, setPage] = useState(1);
  const [consultants, setConsultants] = useState([]);
  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/consultants')
      .then(res => {
        setConsultants(res.data || []);
      })
      .catch(err => console.error("❌ Lỗi lấy danh sách:", err));
  }, []);

  const totalPages = Math.ceil(consultants.length / perPage);
  const paginated = consultants.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="csc-section">
      <div className="csc-grid">
        {paginated.map((doc, idx) => (
          <ConsultantCard key={idx} doc={doc} />
        ))}
      </div>

      <div className="csc-pagination">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </section>
  );
};

export default ConsultantContent;
