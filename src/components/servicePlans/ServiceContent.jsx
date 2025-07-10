import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import Pagination from './Pagination';
import './ServiceContent.css';
import axios from 'axios';

const ServiceContent = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/prices/test') 
      .then((res) => {
        setServices(res.data || []);
      })
      .catch(() => {
        setServices([]); 
      });
  }, []);

  const totalPages = Math.ceil(services.length / perPage);
  const paginated = services.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="service-section">
      <div className="service-grid">
        {paginated.map((service) => (
          <ServiceCard key={service.id} data={service} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default ServiceContent;