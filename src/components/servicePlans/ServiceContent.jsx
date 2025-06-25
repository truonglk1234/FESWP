import React, { useState } from 'react';
import ServiceFilters from './ServiceFilters';
import ServiceCard from './ServiceCard';
import Pagination from './Pagination';
import './ServiceContent.css';
import { servicesData } from './servicesData';

const ServiceContent = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [price, setPrice] = useState('Tất cả mức giá');
  const [sortBy, setSortBy] = useState('Phổ biến nhất');

  const perPage = 6;

  const filtered = servicesData
    .filter(service => {
      const matchesSearch =
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'Tất cả' ||
        (category === 'Tư vấn' && service.title.includes('Tư vấn')) ||
        (category === 'Xét nghiệm' && service.title.includes('Xét nghiệm'));

      const priceValue = service.price === 'Miễn phí' ? 0 : typeof service.price === 'string'
        ? parseInt(service.price.replace(/\D/g, '')) : service.price;
      const matchesPrice =
        price === 'Tất cả mức giá' ||
        (price === 'Dưới 500k' && priceValue < 500000) ||
        (price === '500k - 1 triệu' && priceValue >= 500000 && priceValue <= 1000000) ||
        (price === 'Trên 1 triệu' && priceValue > 1000000);

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'Giá tăng dần') {
        const aPrice = a.price === 'Miễn phí' ? 0 : parseInt(a.price.replace(/\D/g, ''));
        const bPrice = b.price === 'Miễn phí' ? 0 : parseInt(b.price.replace(/\D/g, ''));
        return aPrice - bPrice;
      }
      if (sortBy === 'Giá giảm dần') {
        const aPrice = a.price === 'Miễn phí' ? 0 : parseInt(a.price.replace(/\D/g, ''));
        const bPrice = b.price === 'Miễn phí' ? 0 : parseInt(b.price.replace(/\D/g, ''));
        return bPrice - aPrice;
      }
      return b.reviews - a.reviews; // Phổ biến nhất
    });

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
      />

      <div className={viewMode === 'grid' ? 'service-grid' : 'service-list'}>
        {paginated.map((service, idx) => (
          <ServiceCard key={idx} data={service} viewMode={viewMode} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default ServiceContent;
