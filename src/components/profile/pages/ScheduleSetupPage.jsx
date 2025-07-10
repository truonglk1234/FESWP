import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScheduleSetupPage.css";

const ScheduleCard = ({ schedule }) => (
    <div className="schedule-card">
        <div className="schedule-card-header">
            <span className="badge">
                📅 {schedule.type} - {schedule.dayOfWeek}
            </span>
        </div>
        <div className="schedule-card-body">
            <p>⏰ {schedule.startTime} - {schedule.endTime}</p>
            <p>💵 {schedule.price?.toLocaleString()} đ / {schedule.durationMinutes} phút</p>
            {schedule.note && <p className="note">📝 {schedule.note}</p>}
            <span className={`status ${schedule.isAvailable ? "available" : "not-available"}`}>
                {schedule.isAvailable ? "Có thể đặt lịch" : "Đã kín"}
            </span>
        </div>
    </div>
);

const ScheduleSetupPage = () => {
    const consultantId = 1;

    const [schedules, setSchedules] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        type: "HANG_TUAN",
        dayOfWeek: "THU_HAI",
        startTime: "09:00",
        endTime: "17:00",
        price: 0,
        durationMinutes: 60,
        note: "",
        isAvailable: true,
        consultantId,
    });

    // 🟢 API trực tiếp trong file:
    const createSchedule = async (scheduleData) => {
        const res = await axios.post(
            "http://localhost:8080/api/auth/schedules",
            scheduleData
        );
        return res.data;
    };

    const getSchedulesByConsultant = async (consultantId) => {
        const res = await axios.get(
            `http://localhost:8080/api/auth/schedules/consultant/${consultantId}`
        );
        return res.data;
    };

    const loadSchedules = async () => {
        const data = await getSchedulesByConsultant(consultantId);
        setSchedules(data);
    };

    const handleSave = async () => {
        await createSchedule(form);
        setShowModal(false);
        loadSchedules();
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    return (
        <div className="schedule-wrapper">
            <div className="header">
                <h2>📅 Sắp xếp lịch làm việc</h2>
                <button className="add-btn" onClick={() => setShowModal(true)}>+ Thêm lịch mới</button>
            </div>

            <div className="schedule-grid">
                {schedules.length > 0 ? (
                    schedules.map((s) => <ScheduleCard key={s.id} schedule={s} />)
                ) : (
                    <p>⚠️ Chưa có lịch nào.</p>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Thêm lịch mới</h3>

                        <label>Loại lịch</label>
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                        >
                            <option value="HANG_TUAN">Hàng tuần</option>
                            <option value="HANG_NGAY">Hàng ngày</option>
                        </select>

                        <label>Thứ trong tuần</label>
                        <select
                            value={form.dayOfWeek}
                            onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
                        >
                            <option value="THU_HAI">Thứ 2</option>
                            <option value="THU_BA">Thứ 3</option>
                            <option value="THU_TU">Thứ 4</option>
                            <option value="THU_NAM">Thứ 5</option>
                            <option value="THU_SAU">Thứ 6</option>
                            <option value="THU_BAY">Thứ 7</option>
                            <option value="CHU_NHAT">Chủ nhật</option>
                        </select>

                        <label>Giờ bắt đầu</label>
                        <input
                            type="time"
                            value={form.startTime}
                            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                        />

                        <label>Giờ kết thúc</label>
                        <input
                            type="time"
                            value={form.endTime}
                            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                        />

                        <label>Giá mỗi buổi (VND)</label>
                        <input
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                        />

                        <label>Thời gian mỗi buổi (phút)</label>
                        <input
                            type="number"
                            value={form.durationMinutes}
                            onChange={(e) => setForm({ ...form, durationMinutes: parseInt(e.target.value) })}
                        />

                        <label>Ghi chú</label>
                        <textarea
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                        />

                        <label>
                            <input
                                type="checkbox"
                                checked={form.isAvailable}
                                onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                            />
                            Cho phép đặt lịch
                        </label>

                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>❌ Hủy</button>
                            <button onClick={handleSave}>✅ Lưu lịch</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleSetupPage;
