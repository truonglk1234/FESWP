import React, { useEffect, useState } from 'react';
import ServiceFilters from './ServiceFilters';
import ServiceCard from './ServiceCard';
import Pagination from './Pagination';
import './ServiceContent.css';
import axios from 'axios';

const ServiceContent = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [price, setPrice] = useState('Tất cả mức giá');
  const [sortBy, setSortBy] = useState('Phổ biến nhất');

  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/prices/test') // hoặc đổi sang /advice nếu cần
      .then((res) => {
        console.log('📦 Dữ liệu dịch vụ:', res.data);
        setServices(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải danh sách dịch vụ:", err);
      });
  }, []);

  const filtered = Array.isArray(services)
    ? services.filter(service => {
        const title = (service.title || service.name || '').toLowerCase();
        const description = (service.description || '').toLowerCase();
        const searchLower = search.toLowerCase();

        const matchesSearch =
          title.includes(searchLower) || description.includes(searchLower);

        const matchesCategory =
          category === 'Tất cả' ||
          (category === 'Tư vấn' && title.includes('tư vấn')) ||
          (category === 'Xét nghiệm' && title.includes('xét nghiệm'));

        const priceValue = service.price || 0;
        const matchesPrice =
          price === 'Tất cả mức giá' ||
          (price === 'Dưới 500k' && priceValue < 500000) ||
          (price === '500k - 1 triệu' && priceValue >= 500000 && priceValue <= 1000000) ||
          (price === 'Trên 1 triệu' && priceValue > 1000000);

        return matchesSearch && matchesCategory && matchesPrice;
      })
    : [];

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="service-section">
      <ServiceFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        total={filtered.length}
        category={category}
        setCategory={setCategory}
        price={price}
        setPrice={setPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      />

      <div className={viewMode === 'grid' ? 'service-grid' : 'service-list'}>
        {paginated.map((service) => (
          <ServiceCard key={service.id} data={service} viewMode={viewMode} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default ServiceContent;