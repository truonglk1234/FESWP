import './BMHeader.css';

const BMHeader = ({
  onStatusChange,
  onTopicChange,
  searchKeyword,
  setSearchKeyword,
  topics = [],
}) => {
  return (
    <div className="bm-header">
      <div className="bm-header-top">
        <div>
          <h1>Quản lý blog</h1>
          <p className="subtitle">Tạo và quản lý nội dung blog y tế</p>
        </div>
      </div>

      <div className="bm-header-filters">
        {/* Ô tìm kiếm */}
        <div className="search-wrapper">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="search-input"
          />
        </div>

        {/* Dropdown chủ đề */}
        <select className="filter-select" onChange={(e) => onTopicChange(e.target.value)}>
          <option value="">Tất cả chủ đề</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.name}>{topic.name}</option>
          ))}
        </select>

        {/* Dropdown trạng thái */}
        <select className="filter-select" onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="Published">Đã xác nhận</option>
          <option value="Pending">Chờ xác nhận</option>
          <option value="Rejected">Đã từ chối</option>
        </select>
      </div>
    </div>
  );
};

export default BMHeader;
