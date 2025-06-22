import './SBHeader.css';
import { useNavigate } from 'react-router-dom';

const SBHeader = ({
  searchKeyword,
  setSearchKeyword,
  statusFilter,
  onStatusChange,
  topicFilter,
  onTopicChange,
  topics = [],
}) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/staff/blogs/create');
  };

  return (
    <div className="sb-header">
      <div className="sb-header-top">
        <div>
          <h1 className="sb-title">Blog Y Tế</h1>
          <p className="sb-subtitle">Cập nhật kiến thức y tế và xu hướng xét nghiệm mới nhất</p>
        </div>

        <button className="add-post-btn" onClick={handleCreatePost}>
          + Tạo bài viết mới
        </button>
      </div>

      <div className="sb-header-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm bài viết..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <select
          className="filter-select"
          value={topicFilter}
          onChange={(e) => onTopicChange(e.target.value)}
        >
          <option value="">Tất cả chủ đề</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.name}>{topic.name}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Published">Đã xác nhận</option>
          <option value="Pending">Chờ xác nhận</option>
          <option value="Rejected">Đã từ chối</option>
        </select>
      </div>
    </div>
  );
};

export default SBHeader;
